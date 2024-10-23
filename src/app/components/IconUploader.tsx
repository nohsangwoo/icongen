import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface IconUploaderProps {
    onFileUpload: (file: File) => void;
}

export default function IconUploader({ onFileUpload }: IconUploaderProps) {
    const [icon, setIcon] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setIcon(file);
        onFileUpload(file);
    }, [onFileUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] }
    });

    return (
        <div
            {...getRootProps()}
            className={`w-full max-w-md p-8 border-2 border-dashed rounded-lg transition-all duration-300 ease-in-out ${isDragActive ? 'border-white bg-purple-600' : 'border-gray-300 bg-white'
                }`}
        >
            <input {...getInputProps()} />
            {icon ? (
                <div className="flex items-center justify-center">
                    <img src={URL.createObjectURL(icon)} alt="업로드된 아이콘" className="w-32 h-32 object-contain" />
                </div>
            ) : (
                <p className="text-center text-gray-500">아이콘을 여기에 드래그하거나 클릭하여 업로드하세요</p>
            )}
        </div>
    );
}
