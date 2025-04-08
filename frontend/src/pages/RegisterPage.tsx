import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
// @ts-ignore
import robotIcon from '../assets/icons/robot.svg';
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleSuccess = () => {
        navigate("/login", { state: { message: "Registration successful! Please log in." } });
    };

    return (
        <div className="w-full h-full flex justify-center items-center bg-background">
            <div className="flex flex-row items-center gap-20">
                <RegisterForm
                    onSuccess={handleSuccess}
                    initialMessage={location.state?.message}
                />

                <div className="w-[300px] h-[300px]">
                    <img src={robotIcon} alt="Robot" className="h-full w-full"/>
                </div>
            </div>
        </div>
    );
};