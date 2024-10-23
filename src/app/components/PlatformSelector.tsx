import React from 'react';
import { motion } from 'framer-motion';

// const platforms = ['iOS', 'Android', 'Favicon', 'Web', 'watchOS', 'macOS', 'iPad'];
const platforms = ['iOS', 'Android', 'Favicon', 'watchOS', 'macOS', 'iPad'];

interface PlatformSelectorProps {
    selectedPlatforms: string[];
    onSelectPlatform: (platform: string) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ selectedPlatforms, onSelectPlatform }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
        >
            {platforms.map((platform, index) => (
                <motion.button
                    key={platform}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`px-4 py-2 rounded-full shadow-md ${selectedPlatforms.includes(platform)
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                        : 'bg-white/20 backdrop-blur-sm text-white'
                        }`}
                    onClick={() => onSelectPlatform(platform)}
                >
                    {platform}
                </motion.button>
            ))}
        </motion.div>
    );
};

export default PlatformSelector;
