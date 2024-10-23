'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateIcons } from './libs/iconGenerator';
import IconUploader from './components/IconUploader';
import PlatformSelector from './components/PlatformSelector';


export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['iOS', 'Android', 'Favicon', 'Web', 'watchOS', 'macOS', 'iPad']);

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleGenerate = async () => {
    if (selectedFile && selectedPlatforms.length > 0) {
      await generateIcons(selectedFile, selectedPlatforms);
    } else {
      alert('Please upload a file and select at least one platform.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-indigo-600 to-pink-500"
    >
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        className="text-4xl font-bold text-white mb-8"
      >
        App Icon Generator
      </motion.h1>
      <IconUploader onFileUpload={handleFileUpload} />
      <PlatformSelector selectedPlatforms={selectedPlatforms} onSelectPlatform={handlePlatformSelect} />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGenerate}
        className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg transition-all duration-300"
      >
        Generate and Download Icons
      </motion.button>
    </motion.div>
  );
}
