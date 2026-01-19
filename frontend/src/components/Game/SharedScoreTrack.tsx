import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@shared/types';
import { UserAvatar } from '../UI/UserAvatar';

interface SharedScoreTrackProps {
    players: Player[];
    currentPlayerId?: string;
}

// Player colors for legend/highlight
const PLAYER_COLORS = [
    { bg: 'bg-blue-500', border: 'border-blue-300', gradient: 'from-blue-500 to-blue-600' },
    { bg: 'bg-red-500', border: 'border-red-300', gradient: 'from-red-500 to-red-600' },
    { bg: 'bg-emerald-500', border: 'border-emerald-300', gradient: 'from-emerald-500 to-emerald-600' },
    { bg: 'bg-amber-500', border: 'border-amber-300', gradient: 'from-amber-500 to-amber-600' },
];

export function SharedScoreTrack({ players, currentPlayerId }: SharedScoreTrackProps) {
    // Generate 0-100 array
    const gridCells = useMemo(() => Array.from({ length: 101 }, (_, i) => i), []);

    // Get color for specific player
    const getPlayerColor = (playerId: string) => {
        const index = players.findIndex(p => p.id === playerId);
        return PLAYER_COLORS[index % PLAYER_COLORS.length];
    };

    return (
        <div className="w-full mb-6">
            {/* Player Legend */}
            <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
                {players.map((player, idx) => {
                    const color = PLAYER_COLORS[idx % PLAYER_COLORS.length];
                    const isLeading = players.length > 0 && players.every(p => p.board.score <= player.board.score);

                    return (
                        <motion.div
                            key={player.id}
                            className={`
                                flex items-center gap-2 px-3 py-1.5 rounded-full
                                bg-gradient-to-r ${color.gradient} bg-opacity-20
                                border border-white/10
                                ${player.id === currentPlayerId ? 'ring-2 ring-white/50' : ''}
                            `}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="w-6 h-6 rounded-full border-2 border-white/50 shadow-md flex items-center justify-center overflow-hidden">
                                <UserAvatar src={player.image} name={player.name} size="sm" className="w-full h-full" />
                            </div>
                            <span className="text-sm font-medium text-white">
                                {player.name}
                            </span>
                            <span className={`text-lg font-bold ${isLeading && players.length > 1 ? 'text-yellow-300' : 'text-white'}`}>
                                {player.board.score}
                            </span>
                            {isLeading && players.length > 1 && (
                                <span className="text-yellow-300 text-xs">👑</span>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Score Grid (0-100) */}
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 shadow-inner">
                <div className="flex flex-wrap gap-1 justify-center">
                    {gridCells.map((score) => {
                        const playersOnTile = players.filter(p => Math.min(100, Math.max(0, p.board.score)) === score);
                        const isMilestone = score % 10 === 0 || score === 0;

                        return (
                            <div
                                key={score}
                                className={`
                                    relative w-8 h-8 rounded-md flex items-center justify-center
                                    text-[10px] font-mono
                                    transition-colors duration-200
                                    ${isMilestone
                                        ? 'bg-slate-700 text-slate-300 font-bold border border-slate-600/50'
                                        : 'bg-slate-800/40 text-slate-500'
                                    }
                                `}
                            >
                                {/* Number */}
                                <span className={playersOnTile.length > 0 ? 'opacity-20' : ''}>
                                    {score}
                                </span>

                                {/* Player Pins */}
                                {playersOnTile.length > 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {/* Overlap avatars if multiple players */}
                                        <div className="flex items-center justify-center -space-x-1.5">
                                            {playersOnTile.map((player) => {
                                                const color = getPlayerColor(player.id);
                                                const isCurrent = player.id === currentPlayerId;
                                                return (
                                                    <motion.div
                                                        key={player.id}
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className={`
                                                            relative w-6 h-6 rounded-full
                                                            border border-white/80 shadow-sm
                                                            z-10 bg-slate-800
                                                            ${isCurrent ? 'ring-1 ring-yellow-400 z-20' : ''}
                                                        `}
                                                        title={`${player.name} (${score})`}
                                                    >
                                                        <div className="w-full h-full rounded-full overflow-hidden">
                                                            <UserAvatar
                                                                src={player.image}
                                                                name={player.name}
                                                                size="sm"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
