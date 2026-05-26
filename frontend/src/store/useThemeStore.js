import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem('ARC-Theme') || 'forest',
    setTheme: (theme) => {
        localStorage.setItem('ARC-Theme', theme);
        set({ theme });
    }
}))