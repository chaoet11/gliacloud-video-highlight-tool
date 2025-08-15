import React from 'react';
import type { TranscriptSentence } from '../types';
import { formatTime } from '../utils/formatTime';

interface SentenceProps {
    sentence: TranscriptSentence;
    sectionId: string;
    currentSentenceId: string;
    onToggleSelection: (sectionId: string, sentenceId: string) => void;
    onTimestampClick: (time: number) => void;
}

const Sentence: React.FC<SentenceProps> = ({
                                               sentence,
                                               sectionId,
                                               currentSentenceId,
                                               onToggleSelection,
                                               onTimestampClick
                                           }) => (
    <div
        id={`sentence-${sentence.id}`}
        className={`flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-colors cursor-pointer ${
            sentence.isSelected
                ? 'bg-blue-50 border-2 border-blue-200'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
        } ${
            currentSentenceId === sentence.id
                ? 'ring-2 ring-blue-400'
                : ''
        }`}
        onClick={() => onToggleSelection(sectionId, sentence.id)}
    >
        <input
            type="checkbox"
            checked={sentence.isSelected}
            onChange={() => onToggleSelection(sectionId, sentence.id)}
            className="mt-0.5 sm:mt-1 w-3 h-3 sm:w-4 sm:h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm md:text-base text-gray-900 break-words leading-relaxed">
                {sentence.text}
            </p>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onTimestampClick(sentence.startTime);
                }}
                className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm mt-1 font-mono block"
            >
                {formatTime(sentence.startTime)} - {formatTime(sentence.endTime)}
            </button>
        </div>
    </div>
);

export default Sentence;