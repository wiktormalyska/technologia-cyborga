import { Unity, useUnityContext } from "react-unity-webgl";
import {useEffect, useRef, useState} from "react";
import {useCurrentUser} from "../hooks/useAuth";
import {useAddUserPoints} from "../hooks/useUsers";

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
    const { mutate: addPoints } = useAddUserPoints();

    useEffect(() => {
        window.dispatchReactUnityEvent = function (eventName, data) {
            if (eventName === "SetScore") {
                console.log("Received score:", data);
                setScore(data);
            }
        };
        return () => {
            delete window.dispatchReactUnityEvent;
        };
    }, []);

    const lastSubmittedScore = useRef<number | null>(null);

    useEffect(() => {
        if (!score || !user?.id) return;

        // Nie rób nic, jeśli punktacja jest taka sama jak poprzednia przesłana
        if (lastSubmittedScore.current === score) return;

        lastSubmittedScore.current = score;

        // Wysyłka punktów tylko raz na unikalny score
        addPoints({
            param: `${user.id}/points?points=${score}`,
            body: undefined
        });

    }, [score, user, addPoints]);

    return (
        <div style={{ width: "560px", height: "760px", margin: "0 auto" }}>
            <Unity unityProvider={unityProvider}  style={{ width: "560px", height: "760px" }}  />
        </div>
    );
}

export default GameComponent;
