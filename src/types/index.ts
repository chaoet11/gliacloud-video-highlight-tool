export interface TranscriptSentence {
    id: string;
    text: string;
    startTime: number;
    endTime: number;
    isSelected: boolean;
}

export interface TranscriptSection {
    id: string;
    title: string;
    sentences: TranscriptSentence[];
}

export interface MockAPIResponse {
    fullTranscript: string;
    sections: TranscriptSection[];
    suggestedHighlights: string[];
}

export interface HighlightSegment {
    start: number;
    end: number;
    text: string;
}