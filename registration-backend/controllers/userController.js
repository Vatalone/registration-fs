import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import {User} from '../models/index.js';

export const register = async(req, res) => {
	try {
		const { name, email, password } = req.body;
		if(!name || !password || !email){
			return res.json({success: false, message:'Missing details'})
		}

		if(!validator.isEmail(email)){
			return res.json({success: false, message:'Enter a Valid Email'})
		}

		if(password.length < 8){
			return res.json({success: false, message:'Enter a strong password'})
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		
		const userData = {
			name,
			email,
			password: hashedPassword
		}

		const user = await User.create(userData)
		await user.save();

		const token = jwt.sign({id: user.id}, 'decksteries')

		res.json({success: true, token, message:"Logged in"})
	} catch (error) {
		console.log(error)
		res.json({success: false, message: error.message})
	}
}

export const login = async(req, res) => {
	try {
		const { email, password } = req.body;

		if(!email || !password){
			return res.json({success: false, message:'Missing details'})
		}

		const user = await User.findOne({
			where: {email}
		})

		if (!user){
			return res.json({success: false, message: 'User not found'})
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if(isMatch){
			const token = jwt.sign({id: user.id}, 'decksteries')
			res.json({success: true, token, message: 'Logged in'})
		} else {
			res.json({success: false, message: 'Wrong password'})
		}
	} catch (error) {
		console.log(error)
		res.json({success: false, message: error.message})
	}
}

export const getUsers = async(req, res) => {
	try{
		const users = await User.findAll({
			limit: 10,
			attributes:{
				exclude: ['password'],
			}
		})
		res.json({success: true, users})
	} catch(error){
		console.log(error);
		res.json({success: false, message: error.message})
	}
}