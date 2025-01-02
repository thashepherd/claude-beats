import { useCallback, useRef } from 'react';

export const useAudio = () => {
    const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

    const playSound = useCallback((soundUrl: string) => {
        // Get absolute path from public folder
        const fullPath = process.env.PUBLIC_URL + soundUrl;
        
        // Check if audio is already cached
        if (!audioCache.current.has(soundUrl)) {
            const audio = new Audio(fullPath);
            audioCache.current.set(soundUrl, audio);
        }

        // Play from cache
        const audio = audioCache.current.get(soundUrl);
        if (audio) {
            audio.currentTime = 0; // Reset to start
            audio.play().catch(console.error);
        }
    }, []);

    return { playSound };
};
