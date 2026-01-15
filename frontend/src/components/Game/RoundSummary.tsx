import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameState, Player } from '@shared/types';
import { FLOOR_PENALTIES } from '@shared/constants';
import { Button } from '../UI/Button';
import { useTranslation } from '../../i18n/useLanguage';

interface PlayerRoundScore {
  playerId: string;
  playerName: string;
  tilesPlaced: number;
  wallBonus: number;
  floorPenalty: number;
  roundTotal: number;
  previousScore: number;
  newScore: number;
}

interface RoundSummaryProps {
  gameState: GameState;
  playerId: string;
}

export function RoundSummary({ gameState, playerId }: RoundSummaryProps) {
  const [showSummary, setShowSummary] = useState(false);
  const [roundScores, setRoundScores] = useState<PlayerRoundScore[]>([]);
  const [completedRound, setCompletedRound] = useState(0);
  const prevRoundRef = useRef<number>(0);
  const prevScoresRef = useRef<Map<string, number>>(new Map());
  const prevWallsRef = useRef<Map<string, number>>(new Map());
  const { t } = useTranslation();

  // Calculate round scores when round changes
  useEffect(() => {
    const currentRound = gameState.round;
    const prevRound = prevRoundRef.current;

    // Detect round change (round increased = wall-tiling completed)
    if (prevRound > 0 && currentRound > prevRound && gameState.phase === 'playing') {
      const scores: PlayerRoundScore[] = [];

      for (const player of gameState.players) {
        const prevScore = prevScoresRef.current.get(player.id) || 0;
        const prevWallTiles = prevWallsRef.current.get(player.id) || 0;
        const newScore = player.board.score;

        // Count current wall tiles
        const currentWallTiles = player.board.wall.reduce(
          (acc, row) => acc + row.filter((cell) => cell.filled).length,
          0
        );

        const tilesPlaced = currentWallTiles - prevWallTiles;
        const roundTotal = newScore - prevScore;

        // Estimate wall bonus and floor penalty from the round total
        // Since floor is now empty, we can estimate based on the score change
        // Minimum wall bonus is 1 per tile placed
        const minWallBonus = tilesPlaced;
        const estimatedWallBonus = Math.max(minWallBonus, roundTotal > 0 ? roundTotal : minWallBonus);
        const estimatedFloorPenalty = roundTotal - estimatedWallBonus;

        scores.push({
          playerId: player.id,
          playerName: player.name,
          tilesPlaced,
          wallBonus: estimatedWallBonus,
          floorPenalty: estimatedFloorPenalty,
          roundTotal,
          previousScore: prevScore,
          newScore,
        });
      }

      setRoundScores(scores);
      setCompletedRound(prevRound);
      setShowSummary(true);
    }

    // Update refs for next comparison
    prevRoundRef.current = currentRound;
    for (const player of gameState.players) {
      prevScoresRef.current.set(player.id, player.board.score);
      const wallTiles = player.board.wall.reduce(
        (acc, row) => acc + row.filter((cell) => cell.filled).length,
        0
      );
      prevWallsRef.current.set(player.id, wallTiles);
    }
  }, [gameState.round, gameState.phase, gameState.players]);

  // Auto-close after 8 seconds
  useEffect(() => {
    if (showSummary) {
      const timer = setTimeout(() => {
        setShowSummary(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showSummary]);

  const handleClose = useCallback(() => {
    setShowSummary(false);
  }, []);

  // Sort by new score descending
  const sortedScores = [...roundScores].sort((a, b) => b.newScore - a.newScore);

  return (
    <AnimatePresence>
      {showSummary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="bg-slate-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-4xl mb-2"
              >
                {completedRound}
              </motion.div>
              <h2 className="text-2xl font-bold mb-1">
                {t.roundComplete(completedRound)}
              </h2>
              <p className="text-slate-400 text-sm">
                {t.nextRound(gameState.round)}
              </p>
            </div>

            {/* Player Scores */}
            <div className="space-y-4 mb-6">
              {sortedScores.map((score, index) => (
                <motion.div
                  key={score.playerId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className={`
                    p-4 rounded-lg
                    ${score.playerId === playerId ? 'bg-blue-600/20 border border-blue-500' : 'bg-slate-700'}
                  `}
                >
                  {/* Player name and total */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">
                        {score.playerName}
                        {score.playerId === playerId && (
                          <span className="text-blue-400 text-sm ml-2">({t.you})</span>
                        )}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-yellow-400">
                        {score.newScore}
                      </span>
                      <span className="text-slate-400 text-sm ml-2">
                        {t.pts}
                      </span>
                    </div>
                  </div>

                  {/* Score breakdown */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between text-slate-300">
                      <span>{t.tilesPlaced}:</span>
                      <span className="font-medium">{score.tilesPlaced}</span>
                    </div>
                    <div className="flex justify-between text-green-400">
                      <span>{t.wallBonus}:</span>
                      <span className="font-medium">+{score.wallBonus}</span>
                    </div>
                    <div className="flex justify-between text-red-400">
                      <span>{t.floorPenalty}:</span>
                      <span className="font-medium">{score.floorPenalty}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold">
                      <span>{t.roundPoints}:</span>
                      <span className={score.roundTotal >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {score.roundTotal >= 0 ? '+' : ''}{score.roundTotal}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Continue button */}
            <Button
              variant="primary"
              onClick={handleClose}
              className="w-full"
            >
              {t.continueGame}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
