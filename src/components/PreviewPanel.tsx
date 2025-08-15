import React from 'react';
import type { HighlightSegment } from '../types';
import FileUpload from './FileUpload';
import VideoPlayer from './VideoPlayer';

interface PreviewPanelProps {
    videoFile: File | null;
    videoUrl: string;
    highlightSegments: HighlightSegment[];
    currentTime: number;
    isPlaying: boolean;
    getCurrentOverlayText: () => string;
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onTimeUpdate: () => void;
    onPlay: () => void;
    onPause: () => void;
    onPlayPause: () => void;
    onSeek: (time: number) => void;
    videoRef: React.RefObject<HTMLVideoElement | null>;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
                                                       videoFile,
                                                       videoUrl,
                                                       highlightSegments,
                                                       currentTime,
                                                       isPlaying,
                                                       getCurrentOverlayText,
                                                       onFileUpload,
                                                       onTimeUpdate,
                                                       onPlay,
                                                       onPause,
                                                       onPlayPause,
                                                       onSeek,
                                                       videoRef
                                                   }) => (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border order-1 xl:order-2 h-[45vh] xl:h-auto">
        <div className="p-2 sm:p-3 md:p-4 border-b flex-shrink-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                <h2 className="text-sm sm:text-base md:text-lg xl:text-xl font-semibold text-gray-900">
                    Preview
                </h2>
                <div className="text-xs sm:text-sm text-gray-500">
                    {videoFile ? `${highlightSegments.length} highlights selected` : '尚未上傳影片'}
                </div>
            </div>
        </div>

        <div className="flex-1 relative rounded-b-lg flex items-center justify-center p-1 sm:p-2 md:p-3 xl:p-4 bg-gray-100">
            {!videoFile ? (
                <FileUpload onFileUpload={onFileUpload} />
            ) : (
                <VideoPlayer
                    videoUrl={videoUrl}
                    currentTime={currentTime}
                    isPlaying={isPlaying}
                    highlightSegments={highlightSegments}
                    getCurrentOverlayText={getCurrentOverlayText}
                    onTimeUpdate={onTimeUpdate}
                    onPlay={onPlay}
                    onPause={onPause}
                    onPlayPause={onPlayPause}
                    onSeek={onSeek}
                    videoRef={videoRef}
                />
            )}
        </div>
    </div>
);

export default PreviewPanel;