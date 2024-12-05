import {BasePage} from "../components/BasePage";
import styled from "styled-components";

export const LoginPage = () => {
    return (
        <LoginComponent>
            <Text>Login</Text>
            <Input></Input>
            <Input></Input>
        </LoginComponent>
    )
}

const LoginComponent = styled(BasePage)`
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center
`

const Text = styled.span`
    
`
const Input = styled.input`
    width: 200px;
`