import { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('colour');
    const toggleTheme = () => { setTheme((prevTheme) => (prevTheme === 'colour' ? 'monochrome' : 'colour'))};
    return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
    );
};