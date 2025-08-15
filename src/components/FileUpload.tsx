import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => (
    <div className="text-center flex items-center justify-center flex-col">
        <div className="relative mb-6">
            <input
                type="file"
                accept="video/*"
                onChange={onFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="video-upload-main"
            />
            <label
                htmlFor="video-upload-main"
                className="flex flex-col items-center justify-center w-48 h-32 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
            >
                <Upload className="w-8 h-8 text-blue-600 mb-3" />
                <span className="text-blue-600 font-medium text-sm mb-1">
                    點擊選擇影片檔案
                </span>
                <span className="text-gray-500 text-xs">
                    支援 MP4, MOV, AVI
                </span>
            </label>
        </div>
        <p className="text-gray-500 text-sm">
            上傳影片後，預覽畫面將顯示在這裡
        </p>
        <p className="text-gray-400 text-xs mt-2">
            檔案將在本地處理，不會上傳到伺服器
        </p>
    </div>
);

export default FileUpload;