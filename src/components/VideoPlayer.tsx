import React from 'react';
import type { HighlightSegment } from '../types';
import VideoControls from './VideoControls';

interface VideoPlayerProps {
    videoUrl: string;
    currentTime: number;
    isPlaying: boolean;
    highlightSegments: HighlightSegment[];
    getCurrentOverlayText: () => string;
    onTimeUpdate: () => void;
    onPlay: () => void;
    onPause: () => void;
    onPlayPause: () => void;
    onSeek: (time: number) => void;
    videoRef: React.RefObject<HTMLVideoElement | null>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
                                                     videoUrl,
                                                     currentTime,
                                                     isPlaying,
                                                     highlightSegments,
                                                     getCurrentOverlayText,
                                                     onTimeUpdate,
                                                     onPlay,
                                                     onPause,
                                                     onPlayPause,
                                                     onSeek,
                                                     videoRef
                                                 }) => (
    <div className="relative w-full h-full bg-gray-100 rounded">
        <video
            ref={videoRef}
            className="object-contain mx-auto w-full h-full max-w-full max-h-full"
            src={videoUrl}
            onTimeUpdate={onTimeUpdate}
            onPlay={onPlay}
            onPause={onPause}
        />

        {/* Text Overlay */}
        {getCurrentOverlayText() && (
            <div className="absolute bottom-16 left-2 right-2 bg-black bg-opacity-75 text-white p-2 rounded">
                <p className="text-center text-sm break-words">
                    {getCurrentOverlayText()}
                </p>
            </div>
        )}

        {/* Controls */}
        <VideoControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={videoRef.current?.duration || 0}
            onPlayPause={onPlayPause}
            onSeek={onSeek}
            highlightSegments={highlightSegments}
        />
    </div>
);

export default VideoPlayer;
