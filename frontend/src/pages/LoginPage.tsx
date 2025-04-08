import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useLogin } from "../hooks/useAuth";
// @ts-ignore
import robotIcon from '../assets/icons/robot.svg';

export const LoginPage = () => {
    const { isAuthenticated } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);

    const { mutate: login, isPending } = useLogin();

    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
        }

        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate, location]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Username and password are required");
            return;
        }

        login(
            { username, password },
            {
                onSuccess: () => {
                    navigate("/");
                },
                onError: (err) => {
                    setError(err.message || "Login failed, please check your credentials");
                },
            }
        );
    };

    return (
        <div className="w-full h-full flex justify-center items-center bg-background">
            <div className="flex flex-row items-center gap-20">
                <div className="flex flex-col w-[420px] gap-4 items-center bg-primary/10 text-text rounded-2xl p-10">
                    <div className="text-2xl">Login</div>

                    {successMessage && (
                        <div className="bg-green-800 text-text p-3 rounded-xl w-full text-center">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
                        <input
                            placeholder="Username"
                            value={username}
                            className="bg-primary/25 text-text p-2 pl-4 w-full rounded-xl"
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            placeholder="Password"
                            type="password"
                            value={password}
                            className="bg-primary/25 text-text p-2 pl-4 w-full rounded-xl"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-primary/75 text-text p-2 w-full rounded-xl hover:bg-purple-600 duration-300 "
                        >
                            {isPending ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {error && (
                        <div className="text-text text-sm mt-2">{error}</div>
                    )}

                    <div className="mt-4 text-sm">
                        Don't have an account? <Link
                        to="/register"
                        style={{
                            color: isHovered ? "#a855f7" : "#9333ea", // jaśniejszy fiolet na hover
                            transition: "color 0.2s ease-in-out"
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >Register</Link>
                    </div>
                </div>

                <div className="w-[300px] h-[300px]">
                    <img src={robotIcon} alt="Robot" className="h-full w-full"/>
                </div>
            </div>
        </div>
    );
};