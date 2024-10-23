'use client';

import { useState } from 'react';
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
      alert('파일을 업로드하고 플랫폼을 선택해주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-purple-500 to-pink-500">
      <h1 className="text-4xl font-bold text-white mb-8 animate-pulse">앱 아이콘 생성기</h1>
      <IconUploader onFileUpload={handleFileUpload} />
      <PlatformSelector selectedPlatforms={selectedPlatforms} onSelectPlatform={handlePlatformSelect} />
      <button
        onClick={handleGenerate}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        아이콘 생성 및 다운로드
      </button>
    </div>
  );
}
