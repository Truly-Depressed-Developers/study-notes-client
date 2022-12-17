import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss"
import config from "../../config";

type Props = {
    onLogin: (userId: number) => void
}

const Login = (props: Props): JSX.Element => {
    const navigate = useNavigate();
    const [username, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [logError, setLogError] = useState(false);
    const [miscError, setMiscError] = useState(false);
    const [noDataError, setNoDataError] = useState(false);

    const resetErrors = () => {
        setLogError(false);
        setMiscError(false);
        setNoDataError(false);
    }

    const submitForm = () => {
        resetErrors();

        if (username !== "" && password !== "") {
            fetch(`http://${config.ip}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    "username": username,
                    "password": password
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.description === "Logowanie powiodło się") {
                        props.onLogin(data.id);
                        navigate("/");
                    } else {
                        setLogin("");
                        setPassword("");
                        setLogError(true);
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
        <div id="login">
            <div id="smol-login">
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
                {logError ? <Alert
                    severity="error"
                    className="error-message"
                >Incorrect login or password!</Alert> : ""}
                {miscError ? <Alert
                    severity="error"
                    className="error-message"
                >Unexpected error occured</Alert> : ""}
                {noDataError ? <Alert
                    severity="warning"
                    className="error-message"
                >Please provide input data!</Alert> : ""}
                <Button
                    variant="contained"
                    onClick={() => submitForm()}
                >Login</Button>
            </div>
        </div>
    );
}

export { Login };