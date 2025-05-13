import {BasePage} from "../components/BasePage";
import {useEffect, useState} from "react";
// @ts-ignore
import lootboxIcon from "../assets/loot-box.png"
// https://www.flaticon.com/free-icon/loot-box_8193214

export const LootboxesPage = () => {
    const [active, setActive] = useState("Daily");
    const [hasOpened, setHasOpened] = useState(false);
    const [timeLeft, setTimeLeft] = useState("");
    const [dayOpened, setDayOpened] = useState(null);

    const emojiItems = [
        { emoji: "🥰", name: "3 Hearts Face", rarity: "Common" },
        { emoji: "😎", name: "Sunglasses Face", rarity: "Common" },
        { emoji: "🥳", name: "Partying Face", rarity: "Common" },
        { emoji: "🤓", name: "Nerd", rarity: "Uncommon" },
        { emoji: "😭", name: "Sobbing", rarity: "Rare" },
        { emoji: "🥀", name: "Wilted Rose", rarity: "Rare" }
    ]

    const rarityColorMap: Record<string, string> = {
        Common: "text-gray-400",
        Uncommon: "text-green-400",
        Rare: "text-blue-400"
    };

    const [rolledItem, setRolledItem] = useState<null | typeof emojiItems[0]>(null);

    const getMidnightTimeDiff = () => {
        const now = new Date();
        const midnight = new Date();

        midnight.setHours(24, 0, 0, 0);

        return midnight.getTime() - now.getTime()
    }

    const getTimeUntilMidnight = () => {
        const diff = getMidnightTimeDiff();

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const formatUnit = (unit: number) => (unit < 10 ? "0" + unit : unit.toString());

        return `${formatUnit(hours)}:${formatUnit(minutes)}:${formatUnit(seconds)}`;
    };

    useEffect(() => {
        if (!hasOpened) return;

        if (hasOpened) {
            const interval = setInterval(() => {
                const today = new Date();

                if (today.getDay() > dayOpened) {
                    clearInterval(interval);
                    setHasOpened(false);
                    setTimeLeft("");
                } else {
                    setTimeLeft(getTimeUntilMidnight());
                }
            }, 1000);

            setTimeLeft(getTimeUntilMidnight());

            return () => clearInterval(interval);
        }
    }, [hasOpened]);

    const handleOpenLootbox = () => {
        setHasOpened(true);
        setTimeLeft(getTimeUntilMidnight());

        const now = new Date();
        setDayOpened(now.getDay())

        const randomItem = emojiItems[Math.floor(Math.random() * emojiItems.length)];
        setRolledItem(randomItem)
    };

    return (
        <BasePage title={"Lootboxes"} justifyContent={"flex-start"} className={"pl-5 pr-5 pt-5"}>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-row gap-4 items-center">
                    <button
                        type="button"
                        className={`text-white px-4 py-2 h-full text-lg w-40 flex justify-center items-center rounded-xl transition-all duration-200
                            ${active === "Daily"
                            ? "bg-primary/20"
                            : "bg-primary/10 hover:bg-primary/30 hover:cursor-pointer"}`}
                        onClick={() => setActive("Daily")}
                    >
                        Daily
                    </button>

                    <div className="w-[2px] h-6 rounded-full bg-white" />

                    <button
                        type="button"
                        className={`text-white px-4 py-2 h-full text-lg w-40 flex justify-center items-center rounded-xl transition-all duration-200
                            ${active === "Marketplace"
                            ? "bg-primary/20"
                            : "bg-primary/10 hover:bg-primary/30 hover:cursor-pointer"}`}
                        onClick={() => setActive("Marketplace")}
                    >
                        Marketplace
                    </button>
                </div>

                <div className="mt-8 flex justify-center">
                    {active === "Daily" ? (
                        <div className="flex flex-col gap-4 items-center">
                            <div className="flex flex-col items-center space-y-2">
                                <div className={`w-60 h-60 bg-primary/20 rounded-xl flex items-center justify-center text-white text-xl
                                    ${hasOpened
                                    ? "grayscale"
                                    : ""}`}
                                >
                                    <img src={lootboxIcon} alt="Lootbox"/>
                                </div>
                                <p className="text-white text-lg">Daily Lootbox</p>
                            </div>

                            <div className="flex flex-col gap-4 items-center">
                                <button
                                    type="button"
                                    disabled={hasOpened}
                                    className={`px-4 py-2 h-full text-lg w-40 flex justify-center items-center rounded-full transition-all duration-200
                                        ${hasOpened
                                        ? "bg-white/50 text-black"
                                        : "bg-primary/20 hover:bg-primary/30 text-white hover:cursor-pointer"
                                    }`}
                                    onClick={handleOpenLootbox}
                                >
                                    Open
                                </button>

                                <div className={`ring-2 ring-purple-500 text-center bg-white/10 text-white p-4 rounded-xl w-60 transition-all duration-150 ease-in
                                    ${hasOpened
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-3'}`}
                                >
                                    {rolledItem && (
                                        <div>
                                            <div className="text-5xl">{rolledItem.emoji}</div>
                                            <div className="text-xl mt-2">{rolledItem.name}</div>
                                            <div className={`text-sm italic ${rarityColorMap[rolledItem.rarity]} opacity-80`}>{rolledItem.rarity}</div>
                                        </div>
                                    )}
                                </div>

                                <p className={`text-white text-center text-lg italic transition-all duration-300 ease-in
                                    ${hasOpened
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-3'}`}
                                >
                                    Next lootbox in:
                                    <p className="text-3xl font-bold font-mono">{timeLeft}</p>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-white text-lg italic opacity-70">
                            Ludzie, tu niczego nie ma!
                        </p>
                    )}
                </div>
            </div>
        </BasePage>
    )
};