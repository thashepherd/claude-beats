import { useCallback, useRef } from 'react';
import YouTube from 'react-youtube';

export const useAudio = () => {
    const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());
    const youtubePlayer = useRef<any>(null);

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

    const playYoutubeVideo = useCallback((videoId: string) => {
        if (youtubePlayer.current) {
            youtubePlayer.current.loadVideoById(videoId);
            youtubePlayer.current.playVideo();
        }
    }, []);

    const pauseYoutubeVideo = useCallback(() => {
        if (youtubePlayer.current) {
            youtubePlayer.current.pauseVideo();
        }
    }, []);

    const onYoutubeReady = useCallback((event: any) => {
        youtubePlayer.current = event.target;
    }, []);

    return { playSound, playYoutubeVideo, pauseYoutubeVideo, onYoutubeReady };
};
