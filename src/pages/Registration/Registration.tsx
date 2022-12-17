import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.scss"

type Props = {}

const Registration = (props: Props): JSX.Element => {
	const navigate = useNavigate();
	const [username, setLogin] = useState("");
	const [password, setPassword] = useState("");

	const submitForm = () => {
		if (username !== "" && password !== "") {
			fetch('http://10.200.2.96/register', {
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
					if (!data.username_taken) {
						navigate("/login");
					} else {
						setLogin("");
						setPassword("");
						alert("Username is taken!");
					}
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