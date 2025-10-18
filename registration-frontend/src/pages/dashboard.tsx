import axios from "axios";
import type React from "react";
import { useEffect, useState } from "react";

interface Props {
	className?: string;
}
type UserInfo = {
	id: number;
	name: string;
	email: string;
}
export const Dashboard: React.FC<Props> = ({className}) => {

	const [usersInfo, setUsersInfo] = useState<UserInfo[]>([])

	useEffect(() => {
		const showUsers = async() => {
		try {
			const {data} = await axios.get('http://localhost:3000' + '/api/user/all-users')

			if (data.success){
				setUsersInfo(data.users);
				console.log(data.users);
			}
			else{
				console.log(data.message)
			}
		} catch (error) {
			console.log(error)
		}
	}

		showUsers();
	}, [])

	return (
	<div className={`min-h-screen flex justify-center items-center ${className}`}>
		<div className="bg-white rounded-md text-zinc-950 p-4 flex flex-col items-center min-w-80 gap-8">
			<h1>Dashboard</h1>
			<div className="w-full flex justify-between items-center py-1 font-bold">
				<p>ID</p>
				<p>Name</p>
				<p>Email</p>
			</div>
			<div className="w-full flex flex-col gap-5">
				{usersInfo.map((el, idx) => (
					<div key={idx} className="w-full flex justify-between items-center">
						<p>{el.id}</p>
						<p>{el.name}</p>
						<p>{el.email}</p>
					</div>
				))}
				
			</div>
		</div>
	</div>
	)
}