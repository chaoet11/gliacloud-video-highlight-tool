import React from 'react';
import { FileVideo } from 'lucide-react';

const Header: React.FC = () => (
    <header className="bg-white shadow-sm border-b">
        <div className="max-w-full px-3 sm:px-4 md:px-6 xl:px-8 py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
                <FileVideo className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
                <h1 className="text-base sm:text-lg md:text-xl xl:text-2xl font-bold text-gray-900">
                    Video Highlight Tool
                </h1>
            </div>
        </div>
    </header>
);

export default Header;