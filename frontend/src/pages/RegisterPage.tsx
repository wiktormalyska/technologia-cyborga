import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useRegister } from "../hooks/useAuth";
// @ts-ignore
import robotIcon from '../assets/icons/robot.svg';

export const RegisterPage = () => {
    const { isAuthenticated } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);

    const { mutate: register, isPending } = useRegister();

    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
        }

        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate, location]);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!username || !email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        register(
            { username, email, password }, // Teraz wysyłamy wszystkie wymagane pola
            {
                onSuccess: () => {
                    navigate("/login", { state: { message: "Registration successful! Please log in." } });
                },
                onError: (err) => {
                    setError(err.message || "Registration failed, please try again");
                },
            }
        );
    };

    return (
        <div className="w-full h-full flex justify-center items-center bg-background">
            <div className="flex flex-row items-center gap-20">
                <div className="flex flex-col w-[420px] gap-4 items-center bg-primary/10 text-text rounded-2xl p-10">
                    <div className="text-2xl">Register</div>

                    {successMessage && (
                        <div className="bg-green-800 text-text p-3 rounded-xl w-full text-center">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
                        <input
                            placeholder="Username"
                            value={username}
                            className="bg-primary/25 text-text p-2 pl-4 w-full rounded-xl"
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            placeholder="Email"
                            type="email"
                            value={email}
                            className="bg-primary/25 text-text p-2 pl-4 w-full rounded-xl"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            placeholder="Password"
                            type="password"
                            value={password}
                            className="bg-primary/25 text-text p-2 pl-4 w-full rounded-xl"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            placeholder="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            className="bg-primary/25 text-text p-2 pl-4 w-full rounded-xl"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-primary/75 text-text p-2 w-full rounded-xl hover:bg-purple-600 transition-colors duration-300"
                        >
                            {isPending ? "Registering..." : "Register"}
                        </button>
                    </form>

                    {error && (
                        <div className="text-red-500 text-sm mt-2">{error}</div>
                    )}

                    <div className="mt-4 text-sm">
                        Already have an account? <Link
                            to="/login"
                            style={{
                                color: isHovered ? "#a855f7" : "#9333ea", // jaśniejszy fiolet na hover
                                transition: "color 0.2s ease-in-out"
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >Login</Link>
                    </div>
                </div>

                <Link to="https://www.youtube.com/watch?v=xvFZjo5PgG0" className="w-[300px] h-[300px] block">
                    <img src={robotIcon} alt="Robot" className="h-full w-full object-cover" />
                </Link>
            </div>
        </div>
    );
};