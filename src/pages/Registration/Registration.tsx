import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "./Registration.scss"

type Props = {}

const Registration = (props: Props): JSX.Element => {
	const [username, setLogin] = useState("");
	const [password, setPassword] = useState("");

	const submitForm = () => {
		if (username !== "" && password !== "") {
			fetch('http://localhost:3000/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					login: username,
					password: password
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		} else {
			alert("Provide input data!");
		}
	};

	return (
		<div id="register">
			<TextField
				required
				id="standard-required"
				label="Username"
				value={username}
				onChange={(l) => setLogin(l.target.value)}
				variant="standard"
			/>
			<TextField
				required
				id="standard-password-input"
				label="Password"
				type="password"
				value={password}
				onChange={(p) => setPassword(p.target.value)}
				autoComplete="off"
				variant="standard"
			/>
			<Button
				variant="contained"
				onClick={() => submitForm()}
			>Sign up!</Button>
		</div>
	);
}

export { Registration };