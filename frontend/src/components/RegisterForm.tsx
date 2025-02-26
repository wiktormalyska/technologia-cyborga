import { useState } from "react";
import { useRegister } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { mutate: register, isPending } = useRegister();

    const validateForm = () => {
        if (!username || !password || !email || !confirmPassword) {
            setError("All fields are required");
            return false;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return false;
        }

        return true;
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        register(
            { username, password, email },
            {
                onSuccess: () => {
                    navigate("/login", { state: { message: "Registration successful, please log in" } });
                },
                onError: (err) => {
                    setError(err.message || "Registration failed, please try again");
                },
            }
        );
    };


    return (
        <div className="w-[420px]">
            <form
                onSubmit={handleRegister}
                className="flex flex-col w-full gap-4 items-center bg-[#4b4b65] text-white rounded-2xl p-10"
            >
                <div className="text-2xl">Register</div>

                <input
                    placeholder="Username"
                    value={username}
                    className="bg-[#e4e4eb] text-black p-2 pl-4 w-full rounded-xl"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    placeholder="Email"
                    type="email"
                    value={email}
                    className="bg-[#e4e4eb] text-black p-2 pl-4 w-full rounded-xl"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    className="bg-[#e4e4eb] text-black p-2 pl-4 w-full rounded-xl"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    className="bg-[#e4e4eb] text-black p-2 pl-4 w-full rounded-xl"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-border text-white p-2 w-full rounded-xl hover:bg-opacity-80"
                >
                    {isPending ? "Registering..." : "Register"}
                </button>

                {error && (
                    <div className="text-white text-sm mt-2">{error}</div>
                )}

                <div className="mt-4 text-sm">
                    Already have an account? <Link to="/login" className="text-white hover:underline">Login</Link>
                </div>
            </form>
        </div>
    );
};