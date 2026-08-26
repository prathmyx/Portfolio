import React from 'react';
import { motion } from 'framer-motion';

export function ThemeToggleIcon({ isDark }) {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: isDark ? 0 : 180 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <mask id="moon-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <motion.circle
                    cx="12"
                    cy="4"
                    r="9"
                    fill="black"
                    animate={{
                        cx: isDark ? 12 : 25,
                        cy: isDark ? 4 : -2,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
            </mask>

            {/* Sun Center / Moon Body */}
            <motion.circle
                cx="12"
                cy="12"
                r={isDark ? 9 : 5}
                fill="currentColor"
                mask="url(#moon-mask)"
                transition={{ duration: 0.4 }}
            />

            {/* Sun Rays (Fade out in Dark Mode) */}
            <motion.g
                stroke="currentColor"
                animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.5 : 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'center' }}
            >
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.g>
        </motion.svg>
    );
}