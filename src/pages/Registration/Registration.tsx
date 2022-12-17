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
			<p>Register:</p>
			<label htmlFor="login">Login field:</label>
			<input type="text" name="login" value={username} onChange={(l) => setLogin(l.target.value)} />
			<label htmlFor="password">Password field:</label>
			<input type="password" name="password" value={password} onChange={(p) => setPassword(p.target.value)} />

			<button id="register-button" onClick={() => submitForm()}>Register</button>
		</div>
	);
}

export { Registration };