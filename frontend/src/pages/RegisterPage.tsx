import { RegisterForm } from "../components/RegisterForm";
// @ts-ignore
import robotIcon from '../assets/icons/robot.svg';

export const RegisterPage = () => {
    return (
        <div className="w-full h-full flex justify-center items-center bg-pageBackground">
            <div className="flex flex-row items-center gap-20">
                <RegisterForm/>

                <div className="w-[300px] h-[300px]">
                    <img src={robotIcon} alt="Robot" className="h-full w-full"/>
                </div>
            </div>
        </div>
    );
};