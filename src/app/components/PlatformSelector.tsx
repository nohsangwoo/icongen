import React from 'react';

const platforms = ['iOS', 'Android', 'Favicon', 'Web', 'watchOS', 'macOS', 'iPad'];

interface PlatformSelectorProps {
    selectedPlatforms: string[];
    onSelectPlatform: (platform: string) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ selectedPlatforms, onSelectPlatform }) => {
    return (
        <div className="flex flex-wrap gap-4">
            {platforms.map((platform) => (
                <button
                    key={platform}
                    className={`px-4 py-2 rounded ${selectedPlatforms.includes(platform) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => onSelectPlatform(platform)}
                >
                    {platform}
                </button>
            ))}
        </div>
    );
};

export default PlatformSelector;