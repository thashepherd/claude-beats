// src/types/index.ts

export interface Instrument {
    name: string;
    filePath: string;
}

export interface AudioSettings {
    bpm: number;
    beats: number[];
}

export interface Instrument {
    name: string;
    sound: string;
}

export interface Step {
    id: number;
    active: boolean;
}

export interface Track {
    instrument: Instrument;
    steps: Step[];
}
