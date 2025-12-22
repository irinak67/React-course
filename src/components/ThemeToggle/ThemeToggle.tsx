import { useEffect } from 'react';
import { useThemeStore } from '../../store/themeStore';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useThemeStore();

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center px-3 py-1.5 text-xl border-2 border-white/30 rounded-lg transition-all hover:bg-white/10 hover:border-white/50 hover:scale-105 text-white"
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
};
