import React, { useState, useEffect } from "react";

const Component = () => {
	const [users, setUsers] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/users"
				);
				const data = await response.json();
				setUsers(data);
			} catch (error) {}
		};
		getUsers();
	}, []);

	const handleDeleteUsers = () => {
		setUsers([]);
	};

	const handleInputChange = (e) => {
		const value = e.target.value;
		setInputValue(value);
		console.log("Длина введенных данных:", value.length);
		localStorage.setItem("inputValue", value);
	};

	useEffect(() => {
		const storedValue = localStorage.getItem("inputValue");
		if (storedValue) {
			setInputValue(storedValue);
		}
	}, []);
	return (
		<div>
			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
			<button onClick={handleDeleteUsers}>Delete</button>
			<input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				placeholder="Length и Local Storage"
			/>
		</div>
	);
};

export default Component;
