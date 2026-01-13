import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../UI/Button';

interface CreateRoomProps {
  onCreateRoom: (playerName: string, maxPlayers: 2 | 3 | 4) => void;
  onBack: () => void;
}

export function CreateRoom({ onCreateRoom, onBack }: CreateRoomProps) {
  const [playerName, setPlayerName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState<2 | 3 | 4>(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onCreateRoom(playerName.trim(), maxPlayers);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-xl p-8 w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Create Room</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            maxLength={20}
            className="w-full px-4 py-3 bg-slate-700 rounded-lg border border-slate-600
                     focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                     outline-none transition-colors"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Max Players
          </label>
          <div className="flex gap-3">
            {([2, 3, 4] as const).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setMaxPlayers(num)}
                className={`
                  flex-1 py-3 rounded-lg font-semibold transition-all
                  ${
                    maxPlayers === num
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }
                `}
              >
                {num} Players
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!playerName.trim()}
            className="flex-1"
          >
            Create Room
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
