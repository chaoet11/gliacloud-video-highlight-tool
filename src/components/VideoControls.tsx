import React from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import type { HighlightSegment } from '../types';
import { formatTime } from '../utils/formatTime';

interface VideoControlsProps {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    onPlayPause: () => void;
    onSeek: (time: number) => void;
    highlightSegments: HighlightSegment[];
}

const VideoControls: React.FC<VideoControlsProps> = ({
                                                         isPlaying,
                                                         currentTime,
                                                         duration,
                                                         onPlayPause,
                                                         onSeek,
                                                         highlightSegments
                                                     }) => (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
        <div className="flex items-center justify-between text-white mb-2">
            <div className="flex items-center space-x-2">
                <button
                    onClick={onPlayPause}
                    className="flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <span className="text-sm font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
            </div>
            <Volume2 className="w-4 h-4" />
        </div>

        <div className="w-full bg-gray-600 rounded-full h-2 relative cursor-pointer" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newTime = (clickX / rect.width) * duration;
            onSeek(newTime);
        }}>
            <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-100"
                style={{
                    width: `${(currentTime / (duration || 1)) * 100}%`
                }}
            />
            {highlightSegments.map((segment, index) => (
                <div
                    key={index}
                    className="absolute top-0 h-2 bg-yellow-400 opacity-75 rounded-full"
                    style={{
                        left: `${(segment.start / (duration || 1)) * 100}%`,
                        width: `${((segment.end - segment.start) / (duration || 1)) * 100}%`
                    }}
                />
            ))}
        </div>
    </div>
);

export default VideoControls;
