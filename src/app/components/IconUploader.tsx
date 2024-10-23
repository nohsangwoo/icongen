import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

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
            // whileHover={{ scale: 1.02 }}
            // whileTap={{ scale: 0.98 }}
            {...getRootProps()}
            className={`w-full max-w-md p-8 border-2 border-dashed rounded-lg transition-all duration-300 ease-in-out ${isDragActive ? 'border-white bg-indigo-600' : 'border-gray-300 bg-white/10 backdrop-blur-md'
                }`}
        >
            <input {...getInputProps()} />
            {icon ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="flex items-center justify-center"
                >
                    <img src={URL.createObjectURL(icon)} alt="Uploaded Icon" className="w-32 h-32 object-contain" />
                </motion.div>
            ) : (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-white"
                >
                    Drag and drop an icon here, or click to select a file
                </motion.p>
            )}
        </div>
    );
}
