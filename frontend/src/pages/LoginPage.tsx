import {BasePage} from "../components/BasePage";
import styled from "styled-components";
import {useAuth} from "../auth/AuthContext";
import {useEffect, useState} from "react";
import {loginUser} from "../hooks/useLogin";
import {useCookies} from "react-cookie";
import robotIcon from '../assets/icons/robot.svg'
import colorPalette from "../values/colorPalette";

export const LoginPage = () => {
    const { login } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const {mutate: getToken} = loginUser()
    const [cookies] = useCookies(["token"])

    useEffect(() => {
        cookies.token? login(cookies.token) : null
    }, []);

    const handleLogin = () => {
        const body = {
            username: username,
            password: password
        }
        interface response {
            accessToken: string
        }

        getToken({body}, {
            onSuccess: (data:response) => {
                login(data.accessToken)
            },
            onError: (error) => {
                setError(error.message)
            }
        })
    }

    return (
        <LoginContainer>
            <LoginComponent>
                <LoginHeader>
                    <Text>Login</Text>
                </LoginHeader>
                <LoginSection>
                    <Input placeholder="Login" value={username} onChange={(e) => setUsername(e.target.value)}></Input>
                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                    <LoginButton type="button" value="Login" onClick={handleLogin}/>
                </LoginSection>
                <ErrorSection>
                    {error && <ErrorText>{error}</ErrorText>}
                </ErrorSection>
            </LoginComponent>
            <LogoSection>
                <img src={robotIcon} alt="Robot" />
            </LogoSection>
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    padding: 5rem;
    box-sizing: border-box;
    align-content: center;
    align-items: center;
    overflow: hidden;
    background-color: ${colorPalette.pageBackground.hex};
`

const LoginComponent = styled(BasePage)`
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    background-color: #1d1b20;
    width: 600px;
    height: 360px;
    padding: 1rem;
    border-radius: 0.5rem;
    color: white;
`

const LoginHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 2rem;
    width: 100%;
`

const LoginSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
`

const ErrorSection = styled(LoginSection)`
    height: 20px;
`

const LogoSection = styled(LoginComponent)`
    width: 420px;
    height: 420px;
    background-color: rgba(255,255,255,0);

    img {
        height: 100%;
        width: 100%;
        padding: 12px;
    }
`

const Text = styled.span`
    padding-left: 2rem;
    text-align: left;
    font-weight: 700;
    font-size: 2rem;
    width: 100%;
`

const Input = styled.input`
    width: 80%;
    height: 42px;
    padding: 5px 5px 5px 1rem;
    border-radius: 0.5rem;
    border: none;
    gap: 1rem;
    font-size: 1rem;
`

const LoginButton = styled(Input)`
    background-color: #6200ea;
    padding: 0;
    border: none;
    color: white;

    &:hover {
        background-color: #5200c6;
        cursor: pointer;
    }
`

const ErrorText = styled.span`
    color: red;
    font-size: 0.9rem;
    margin-top: 10px;
    
    animation: slideIn 0.3s ease;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;