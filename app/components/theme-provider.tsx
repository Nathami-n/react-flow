import { createContext, useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    onThemeChange: (theme: Theme) => void;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "system",
    onThemeChange,
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState(defaultTheme);
    const [queryClient] = useState(() => new QueryClient());

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            let selectedTheme = theme;
            if (theme === "system" && typeof window !== "undefined") {
                selectedTheme = window.matchMedia("(prefers-color-scheme: dark)")
                    .matches
                    ? "dark"
                    : "light";
            }
            onThemeChange(selectedTheme);
            setTheme(selectedTheme);
        },
    };

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProviderContext.Provider {...props} value={value}>
                {children}
            </ThemeProviderContext.Provider>
        </QueryClientProvider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};