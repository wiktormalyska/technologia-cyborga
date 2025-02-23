import {BasePage} from "../components/BasePage";
import styled from "styled-components";
import {useAuth} from "../auth/AuthContext";
import {useEffect, useState} from "react";
import {loginUser} from "../hooks/useLogin";
import {useCookies} from "react-cookie";
// @ts-ignore
import robotIcon from '../assets/icons/robot.svg'

export const LoginPage = () => {
    const {login} = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const {mutate: getToken} = loginUser()
    const [cookies] = useCookies(["token"])

    useEffect(() => {
        cookies.token ? login(cookies.token) : null
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
            onSuccess: (data: response) => {
                login(data.accessToken)
            },
            onError: (error) => {
                setError(error.message)
            }
        })
    }

    return (
        <div className={"w-full h-full flex justify-center items-center bg-pageBackground"}>
            <div className={"flex flex-row items-center gap-20"}>
                <div className={"flex flex-col w-full gap-4 items-center " +
                    "bg-neutral-800 rounded-2xl p-10"}>
                    <div className={"text-2xl"}>Login</div>
                    <input placeholder="Login" value={username}
                           className={"bg-neutral-950 p-2 pl-4 w-full rounded-xl"}
                           onChange={(e) => setUsername(e.target.value)}></input>
                    <input placeholder="Password" type="password" value={password}
                           className={"bg-neutral-950 p-2 pl-4 w-full rounded-xl"}
                           onChange={(e) => setPassword(e.target.value)}></input>
                    <input type="button" value="Login"
                           className={"bg-border p-2 w-full rounded-xl"}
                           onClick={handleLogin}/>
                    <div className={(error || "hidden")+"flex flex-col justify-center items-center w-full gap-4 h-5 text-red-500"}>
                        {error && <div>{error}</div>}
                    </div>
                </div>
                <div className={"w-[420px] h-[420px]"}>
                    <img src={robotIcon} alt="Robot" className={"h-full w-full p-4"}/>
                </div>
            </div>
        </div>
    )
}