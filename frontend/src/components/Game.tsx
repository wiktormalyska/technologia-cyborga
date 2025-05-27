import { Unity, useUnityContext } from "react-unity-webgl";
import {useEffect, useState} from "react";

function GameComponent() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "/unity/HiLoBuild.loader.js",
        dataUrl: "/unity/HiLoBuild.data",
        frameworkUrl: "/unity/HiLoBuild.framework.js",
        codeUrl: "/unity/HiLoBuild.wasm",
    });

    const [score, setScore] = useState(0);

    useEffect(() => {
        const handleSetScore = (newScore) => {
            setScore(newScore);
        };

        addEventListener("SetScore", handleSetScore);
        return () => {
            removeEventListener("SetScore", handleSetScore);
        };
    }, [addEventListener, removeEventListener]);

    return (
        <div style={{ width: "100%", height: "750px" }}>
            <p>Aktualny wynik: {score}</p>
            <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100%" }} />
        </div>
    );
}

export default GameComponent;
