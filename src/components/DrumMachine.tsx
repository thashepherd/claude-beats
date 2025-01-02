import React, { useState, useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';
import { instruments } from '../constants/instruments';

const DrumMachine: React.FC = () => {
    const [bpm, setBpm] = useState(120);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentBeat, setCurrentBeat] = useState(0);
    const [track, setTrack] = useState(Array(16).fill(null));

    const playSound = (instrument: string) => {
        const audio = new Audio(instrument);
        audio.play();
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentBeat((prev) => (prev + 1) % 16);
                track[currentBeat] && playSound(track[currentBeat]);
            }, (60 / bpm) * 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentBeat, bpm, track]);

    return (
        <div>
            <h1>Drum Machine</h1>
            <div>
                {instruments.map((instrument, index) => (
                    <button key={index} onClick={() => playSound(instrument.filePath)}>
                        {instrument.name}
                    </button>
                ))}
            </div>
            <div>
                <button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Play'}</button>
                <input
                    type="number"
                    value={bpm}
                    onChange={(e) => setBpm(Number(e.target.value))}
                    min="60"
                    max="240"
                />
            </div>
            <div>
                {/* Track representation will go here */}
            </div>
        </div>
    );
};

export default DrumMachine;