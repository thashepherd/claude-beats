import React from 'react';
import { Step, Instrument } from '../types';

interface TrackProps {
    instrument: Instrument;
    steps: Step[];
    onToggleStep: (stepId: number) => void;
}

export const Track: React.FC<TrackProps> = ({ instrument, steps, onToggleStep }) => {
    return (
        <div className="track">
            <div className="instrument-name">{instrument.name}</div>
            <div className="steps">
                {steps.map((step) => (
                    <button
                        key={step.id}
                        className={`step ${step.active ? 'active' : ''}`}
                        onClick={() => onToggleStep(step.id)}
                    />
                ))}
            </div>
        </div>
    );
};
