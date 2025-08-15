import React from 'react';

interface ProcessingOverlayProps {
    isVisible: boolean;
}

const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 text-center max-w-xs sm:max-w-sm w-full">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-3 sm:mb-4"></div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2">
                    Processing Video
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                    AI is analyzing your video and generating transcript...
                </p>
            </div>
        </div>
    );
};

export default ProcessingOverlay;