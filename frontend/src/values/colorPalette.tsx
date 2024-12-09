interface Color {
    hex: string;
}

const colorPalette: { [key in 'primary' | 'secondary' | 'accent' | 'text' | 'secondaryText' | 'inputBackground' | 'buttonBackground' | 'border' | 'highlight']: Color } = {
    primary: { hex: "#2C2333" }, // Dominujący fioletowy
    secondary: { hex: "#383040" }, // Tło dla elementów
    accent: { hex: "#FFFFFF" }, // Kolor tekstu i ikon
    text: { hex: "#D0D0D0" }, // Jasnoszary tekst
    secondaryText: { hex: "#D0D0D0" },
    inputBackground: { hex: "#31293A" }, // Pole wyszukiwania
    buttonBackground: { hex: "#453651" }, // Tło przycisków
    border: { hex: "#5C4D6A" }, // Obwódki
    highlight: { hex: "#100F10" }, // Dolny pasek i cienie
};

export default colorPalette;