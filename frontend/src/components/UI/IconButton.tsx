import React from 'react';
import { motion } from 'framer-motion';

interface IconButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
    title: string;
    className?: string;
    variant?: 'default' | 'primary' | 'danger';
    isActive?: boolean;
}

export function IconButton({
    onClick,
    icon,
    title,
    className = '',
    variant = 'default',
    isActive = false,
}: IconButtonProps) {
    const baseStyles = "w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 backdrop-blur-md border";

    const variants = {
        default: `bg-white/10 border-white/10 text-white hover:bg-white/20 hover:border-white/30`,
        primary: `bg-blue-600/80 border-blue-500/50 text-white hover:bg-blue-600 hover:border-blue-400`,
        danger: `bg-red-600/20 border-red-500/30 text-red-200 hover:bg-red-600/40 hover:border-red-400 hover:text-white`,
    };

    const activeStyles = isActive ? "ring-2 ring-yellow-400 border-yellow-400/50 bg-yellow-400/10" : "";

    return (
        <motion.button
            whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${activeStyles} ${className}`}
            title={title}
        >
            {icon}
        </motion.button>
    );
}
