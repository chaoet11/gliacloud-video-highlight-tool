import React, { useState, useRef, useEffect } from 'react';
import type { MockAPIResponse, HighlightSegment } from './types';
import { mockAIService } from './services/mockAIService';
import Header from './components/Header';
import TranscriptEditor from './components/TranscriptEditor';
import PreviewPanel from './components/PreviewPanel';
import ProcessingOverlay from './components/ProcessingOverlay';

const App: React.FC = () => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcriptData, setTranscriptData] = useState<MockAPIResponse | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSentenceId, setCurrentSentenceId] = useState<string>('');
    const [highlightSegments, setHighlightSegments] = useState<HighlightSegment[]>([]);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const editingAreaRef = useRef<HTMLDivElement | null>(null);

    // Handle video upload
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setVideoFile(file);
        setVideoUrl(URL.createObjectURL(file));
        setIsProcessing(true);

        try {
            const response = await mockAIService.processVideo(file);
            setTranscriptData(response);
            calculateHighlightSegments(response);
        } catch (error) {
            console.error('Processing failed:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    // Calculate highlight segments from selected sentences
    const calculateHighlightSegments = (data: MockAPIResponse) => {
        const segments: HighlightSegment[] = [];

        data.sections.forEach(section => {
            section.sentences
                .filter(sentence => sentence.isSelected)
                .forEach(sentence => {
                    segments.push({
                        start: sentence.startTime,
                        end: sentence.endTime,
                        text: sentence.text
                    });
                });
        });

        // Sort segments by start time
        segments.sort((a, b) => a.start - b.start);
        setHighlightSegments(segments);
    };

    // Toggle sentence selection
    const toggleSentenceSelection = (sectionId: string, sentenceId: string) => {
        if (!transcriptData) return;

        const updatedData = {
            ...transcriptData,
            sections: transcriptData.sections.map(section => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        sentences: section.sentences.map(sentence => {
                            if (sentence.id === sentenceId) {
                                return { ...sentence, isSelected: !sentence.isSelected };
                            }
                            return sentence;
                        })
                    };
                }
                return section;
            })
        };

        setTranscriptData(updatedData);
        calculateHighlightSegments(updatedData);
    };

    // Handle timestamp click
    const handleTimestampClick = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    // Handle video time update
    const handleVideoTimeUpdate = () => {
        if (videoRef.current) {
            const time = videoRef.current.currentTime;
            setCurrentTime(time);

            // Find current sentence and highlight it
            if (transcriptData) {
                transcriptData.sections.forEach(section => {
                    section.sentences.forEach(sentence => {
                        if (time >= sentence.startTime && time <= sentence.endTime) {
                            setCurrentSentenceId(sentence.id);
                        }
                    });
                });
            }
        }
    };

    // Handle play/pause
    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Handle video seek
    const handleSeek = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    // Get current overlay text
    const getCurrentOverlayText = () => {
        if (!transcriptData) return '';

        for (const section of transcriptData.sections) {
            for (const sentence of section.sentences) {
                if (sentence.isSelected && currentTime >= sentence.startTime && currentTime <= sentence.endTime) {
                    return sentence.text;
                }
            }
        }
        return '';
    };

    // Auto-scroll editing area to current sentence
    useEffect(() => {
        if (currentSentenceId && editingAreaRef.current) {
            const element = document.getElementById(`sentence-${currentSentenceId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [currentSentenceId]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-full px-2 sm:px-3 md:px-4 xl:px-6 py-3 sm:py-4 md:py-6 xl:py-8">
                <div className="flex flex-col xl:grid xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6 xl:gap-8 min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-140px)] xl:min-h-[calc(100vh-160px)]">

                    <TranscriptEditor
                        isProcessing={isProcessing}
                        videoFile={videoFile}
                        transcriptData={transcriptData}
                        currentSentenceId={currentSentenceId}
                        onToggleSelection={toggleSentenceSelection}
                        onTimestampClick={handleTimestampClick}
                        editingAreaRef={editingAreaRef}
                    />

                    <PreviewPanel
                        videoFile={videoFile}
                        videoUrl={videoUrl}
                        highlightSegments={highlightSegments}
                        currentTime={currentTime}
                        isPlaying={isPlaying}
                        getCurrentOverlayText={getCurrentOverlayText}
                        onFileUpload={handleFileUpload}
                        onTimeUpdate={handleVideoTimeUpdate}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onPlayPause={handlePlayPause}
                        onSeek={handleSeek}
                        videoRef={videoRef}
                    />
                </div>
            </main>

            <ProcessingOverlay isVisible={isProcessing} />
        </div>
    );
};

export default App;