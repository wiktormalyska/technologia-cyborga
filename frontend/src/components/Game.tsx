import { Unity, useUnityContext } from "react-unity-webgl";
import {useEffect, useState} from "react";
import {useAuth} from "../auth/AuthContext";
import {useCurrentUser} from "../hooks/useAuth";

declare global {
    interface Window {
        dispatchReactUnityEvent?: (eventName: string, data: any) => void;
    }
}
function GameComponent() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "/unity/HiLoBuild.loader.js",
        dataUrl: "/unity/HiLoBuild.data",
        frameworkUrl: "/unity/HiLoBuild.framework.js",
        codeUrl: "/unity/HiLoBuild.wasm",
    });

    const [score, setScore] = useState(0);


    const { user, isAuthenticated } = useCurrentUser();

    useEffect(() => {
        window.dispatchReactUnityEvent = function (eventName, data) {
            if (eventName === "SetScore") {
                setScore(data);
            }
        };

        return () => {
            delete window.dispatchReactUnityEvent;
        };
    }, []);

    useEffect(() => {
        if (score != null && user?.id != null) {
            fetch(`http://localhost:8080/api/users/${user.id}/points?points=${score}`, {
                method: "POST",
                headers: {
                    //"Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to update user points");
                    console.log("User points updated successfully");
                })
                .catch(console.error);
        }
    }, [score, user]);

    return (
        <div style={{ width: "100%", height: "750px" }}>
            <p>Aktualny wynik: {score}</p>
            <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100%" }} />
        </div>
    );
}

export default GameComponent;
