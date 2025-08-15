import React from 'react';
import type { MockAPIResponse } from '../types';
import TranscriptSection from './TranscriptSection';

interface TranscriptEditorProps {
    isProcessing: boolean;
    videoFile: File | null;
    transcriptData: MockAPIResponse | null;
    currentSentenceId: string;
    onToggleSelection: (sectionId: string, sentenceId: string) => void;
    onTimestampClick: (time: number) => void;
    editingAreaRef: React.RefObject<HTMLDivElement | null>;
}

const TranscriptEditor: React.FC<TranscriptEditorProps> = ({
                                                               isProcessing,
                                                               videoFile,
                                                               transcriptData,
                                                               currentSentenceId,
                                                               onToggleSelection,
                                                               onTimestampClick,
                                                               editingAreaRef
                                                           }) => (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border order-2 xl:order-1 h-[45vh] xl:h-auto">
        <div className="p-2 sm:p-3 md:p-4 border-b flex-shrink-0">
            <h2 className="text-sm sm:text-base md:text-lg xl:text-xl font-semibold text-gray-900">
                Transcript Editor
            </h2>
            {isProcessing && (
                <div className="flex items-center mt-1 sm:mt-2 text-blue-600">
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-blue-600 border-t-transparent mr-1 sm:mr-2"></div>
                    <span className="text-xs sm:text-sm">AI is analyzing your video...</span>
                </div>
            )}
        </div>

        <div className="flex items-center justify-center flex-1 overflow-y-auto p-2 sm:p-3 md:p-4" ref={editingAreaRef}>
            {!videoFile ? (
                <div className="text-center text-gray-500 mt-4 sm:mt-6 md:mt-8">
                    <p className="text-xs sm:text-sm md:text-base">
                        請先上傳影片，逐字稿將會在這裡顯示
                        <br/>
                        備註：Mock data 為 38 秒
                    </p>
                </div>
            ) : transcriptData ? (
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    {transcriptData.sections.map(section => (
                        <TranscriptSection
                            key={section.id}
                            section={section}
                            currentSentenceId={currentSentenceId}
                            onToggleSelection={onToggleSelection}
                            onTimestampClick={onTimestampClick}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 mt-4 sm:mt-6 md:mt-8">
                    <p className="text-xs sm:text-sm md:text-base">
                        Transcript will appear here after processing...
                    </p>
                </div>
            )}
        </div>
    </div>
);

export default TranscriptEditor;