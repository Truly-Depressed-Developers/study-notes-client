import Alert from "@mui/material/Alert";
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
	const [regError, setRegError] = useState(false);
	const [miscError, setMiscError] = useState(false);
	const [noDataError, setNoDataError] = useState(false);

	const resetErrors = () => {
		setRegError(false);
		setMiscError(false);
		setNoDataError(false);
	}

	const submitForm = () => {
		resetErrors();

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
						setRegError(true);
					}
				})
				.catch((error) => {
					setMiscError(true);
					console.error('Error:', error);
				});
		} else {
			setNoDataError(true);
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
			{regError ? <Alert
				className="error-message"
				severity="error"
			>Username is taken!</Alert> : ""}
			{miscError ? <Alert
				className="error-message"
				severity="error"
			>Unexpected error occured</Alert> : ""}
			{noDataError ? <Alert
				severity="warning"
				className="error-message"
			>Please provide input data!</Alert> : ""}
			<Button
				variant="contained"
				onClick={() => submitForm()}
			>Sign up!</Button>
		</div>
	);
}

export { Registration };