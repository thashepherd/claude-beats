import React from 'react';

interface ControlsProps {
    bpm: number;
    isPlaying: boolean;
    onBpmChange: (bpm: number) => void;
    onPlayPause: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
    bpm,
    isPlaying,
    onBpmChange,
    onPlayPause,
}) => {
    return (
        <div className="controls">
            <button onClick={onPlayPause}>
                {isPlaying ? 'Stop' : 'Play'}
            </button>
            <div className="bpm-control">
                <label>BPM:</label>
                <input
                    type="number"
                    min="60"
                    max="180"
                    value={bpm}
                    onChange={(e) => onBpmChange(Number(e.target.value))}
                />
            </div>
        </div>
    );
};
