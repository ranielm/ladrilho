import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../UI/Button';

interface JoinRoomProps {
  onJoinRoom: (roomId: string, playerName: string) => void;
  onBack: () => void;
  initialRoomId?: string;
}

export function JoinRoom({ onJoinRoom, onBack, initialRoomId = '' }: JoinRoomProps) {
  const [roomId, setRoomId] = useState(initialRoomId);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    if (initialRoomId) {
      setRoomId(initialRoomId);
    }
  }, [initialRoomId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim() && playerName.trim()) {
      onJoinRoom(roomId.trim().toUpperCase(), playerName.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-xl p-8 w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Join Room</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Room Code
          </label>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value.toUpperCase())}
            placeholder="Enter room code"
            maxLength={6}
            className="w-full px-4 py-3 bg-slate-700 rounded-lg border border-slate-600
                     focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                     outline-none transition-colors uppercase tracking-widest text-center text-xl"
            autoFocus={!initialRoomId}
          />
        </div>

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
            autoFocus={!!initialRoomId}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!roomId.trim() || !playerName.trim()}
            className="flex-1"
          >
            Join Room
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
