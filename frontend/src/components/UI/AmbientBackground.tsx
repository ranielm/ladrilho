import React from 'react';
import { motion } from 'framer-motion';

export function AmbientBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Primary Inset Glow */}
            <motion.div
                animate={{
                    opacity: [0.4, 0.6, 0.4],
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 shadow-[inset_0_0_150px_rgba(30,58,138,0.5)]"
            />

            {/* Subtle Corner Accents */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-900/20 via-transparent to-blue-900/20 opacity-50" />

            {/* Optional: Radial Center Mask to keep center clear */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.4)_100%)]" />
        </div>
    );
}
