import React from 'react';
import type { TranscriptSection } from '../types';
import Sentence from './Sentence';

interface TranscriptSectionProps {
    section: TranscriptSection;
    currentSentenceId: string;
    onToggleSelection: (sectionId: string, sentenceId: string) => void;
    onTimestampClick: (time: number) => void;
}

const TranscriptSectionComponent: React.FC<TranscriptSectionProps> = ({
                                                                          section,
                                                                          currentSentenceId,
                                                                          onToggleSelection,
                                                                          onTimestampClick
                                                                      }) => (
    <div className="space-y-2 sm:space-y-3">
        <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 border-b pb-1 sm:pb-2">
            {section.title}
        </h3>
        {section.sentences.map(sentence => (
            <Sentence
                key={sentence.id}
                sentence={sentence}
                sectionId={section.id}
                currentSentenceId={currentSentenceId}
                onToggleSelection={onToggleSelection}
                onTimestampClick={onTimestampClick}
            />
        ))}
    </div>
);

export default TranscriptSectionComponent;