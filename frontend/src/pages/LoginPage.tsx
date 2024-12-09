import {BasePage} from "../components/BasePage";
import styled from "styled-components";
import {useAuth} from "../auth/AuthContext";
import {useState} from "react";

export const LoginPage = () => {
    const { login } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = () => {
        if (username === "admin" && password === "admin") {
            login()
        } else {
            setError("Invalid username or password.")
        }
    }

    return (
        <LoginComponent>
            <Text>Login</Text>
            <Input placeholder="Login" value={username} onChange={(e) => setUsername(e.target.value)}></Input>
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
            <Input type="button" value="Login" onClick={handleLogin}/>
            {error && <ErrorText>{error}</ErrorText>}
        </LoginComponent>
    )
}

const LoginComponent = styled(BasePage)`
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    background-color: #1d1b20;
    width: auto;
    padding: 1rem;
    border-radius: 0.5rem;
    color: white;
`

const Text = styled.span`
    padding-bottom: 5rem;
    font-weight: 700;
    font-size: 1.5rem;
`
const Input = styled.input`
    width: 200px;
    padding: 5px;
`

const ErrorText = styled.span`
    color: red;
    font-size: 0.9rem;
    margin-top: 10px;
`;