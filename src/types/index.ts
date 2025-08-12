export interface Sentence {
    id: string;
    text: string;
    startTime: number;
    endTime: number;
    isHighlight: boolean;
    isSelected: boolean;
}

export interface Section {
    id: string;
    title: string;
    sentences: Sentence[];
}

export interface TranscriptData {
    fullTranscript: string;
    sections: Section[];
}

export interface VideoState {
    file: File | null;
    duration: number;
    currentTime: number;
    isPlaying: boolean;
    isLoading: boolean;
}