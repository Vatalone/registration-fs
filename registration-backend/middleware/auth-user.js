import jwt from 'jsonwebtoken';

export const authUser = async(req, res, next) => {
	try {
		const {token} = req.headers;
		if(!token){
			res.json({success: false, message: "No token provided"});
		}
		const tokenDecoded = jwt.verify(token, 'decksteries');

		req.body.userId = tokenDecoded.id;

		next()
	}
	catch(error) {
		if(error.name === 'TokenExpiredError'){
			res.json({success: false, message: "Token expired"});
		}
		else if(error.name === 'JsonWebTokenError'){
			res.json({success: false, message: "Invalid token"});
		}
	}
}