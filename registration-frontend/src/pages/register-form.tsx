import axios from "axios";
import type React from "react"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface Props {
	className?: string;
}
type formDataType = {
	emailfield: string,
	namefield?: string,
	passwordfield: string,
	confirmfield?: string
}

export const RegisterForm: React.FC<Props> = ({className}) => {

	const [formType, setFormType] = useState<"Sign" | "Log">("Log")

	const navigate = useNavigate()

	const handleChangeType = () => {
		setFormType(prev => {
			if (prev == "Log"){
				return "Sign"
			} else {
				return "Log"
			}
		})
	}

	const {register, handleSubmit} = useForm<formDataType>({})
	const onSubmit = async(formData:formDataType) => {
		try {
			if (formType == 'Sign'){
				if (formData.confirmfield == formData.passwordfield){
					const formInfo = {
						email: formData.emailfield,
						name: formData.namefield,
						password: formData.passwordfield
					}
					const {data} = await axios.post('http://localhost:3000' + '/api/user/register', formInfo)

					if(data.success){
						localStorage.setItem('token', data.token)
						toast.success(data.message);
						navigate('/dashboard')
					} else {
						toast.error(data.message)
					}
				} else{
					toast.error("Confirm password!")
				}
			}
			else {
				const formInfo = {
						email: formData.emailfield,
						password: formData.passwordfield
					}
				const {data} = await axios.post('http://localhost:3000' + '/api/user/login', formInfo)

				if(data.success){
					localStorage.setItem('token', data.token)
					toast.success(data.message);
					navigate('/dashboard')
				} else {
						toast.error(data.message)
				}
			}
		} catch(error){
			toast.error((error as Error).message)
		}
	}

	return (
		<div className={`min-h-screen flex justify-center items-center ${className}`}>
			<div className="bg-white rounded-md text-zinc-950 p-4 flex flex-col items-center min-w-80 gap-8">
				<h1>Registration</h1>
				{formType == "Sign" 
				?
				<form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
					<input type="email" {...register('emailfield')} placeholder="Email" className="px-2 py-1 rounded-sm border border-indigo-400 shadow-[0px_0px_15px_2px_rgba(0,0,0,.3)] shadow-indigo-400" />
					<input type="text" {...register('namefield')} placeholder="Name" className="px-2 py-1 rounded-sm border border-indigo-400 shadow-[0px_0px_15px_2px_rgba(0,0,0,.3)] shadow-indigo-400" />
					<input type="password" {...register('passwordfield')} placeholder="Password" className="px-2 py-1 rounded-sm border border-indigo-400 shadow-[0px_0px_15px_2px_rgba(0,0,0,.3)] shadow-indigo-400" />
					<input type="password" {...register('confirmfield')} placeholder="Confirm password" className="px-2 py-1 rounded-sm border border-indigo-400 shadow-[0px_0px_15px_2px_rgba(0,0,0,.3)] shadow-indigo-400" />
					<button type="submit" className="bg-indigo-400 text-white px-6 py-2 rounded-sm">Sign In</button>
				</form>
				:
				<form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
					<input type="email" {...register('emailfield')} placeholder="Email" className="px-2 py-1 rounded-sm border border-indigo-400 shadow-[0px_0px_15px_2px_rgba(0,0,0,.3)] shadow-indigo-400" />
					<input type="password" {...register('passwordfield')} placeholder="Password" className="px-2 py-1 rounded-sm border border-indigo-400 shadow-[0px_0px_15px_2px_rgba(0,0,0,.3)] shadow-indigo-400" />
					<button type="submit" className="bg-indigo-400 text-white px-6 py-2 rounded-sm">Log In</button>
				</form>
				}
				<button onClick={handleChangeType} className="text-indigo-400 bg-transparent text-sm cursor-pointer">{formType == "Sign" ? "I already have account" : "I have no account"}</button>
			</div>
		</div>
	)
}