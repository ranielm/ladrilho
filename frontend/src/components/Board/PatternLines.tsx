import React from 'react';
import { PatternLine, TileColor, WallCell } from '@shared/types';
import { Tile } from '../Tile/Tile';
import { canPlaceTileInPatternLine } from '../../utils/gameHelpers';
import { useGameStore } from '../../store/gameStore';

interface PatternLinesProps {
  patternLines: PatternLine[];
  wall: WallCell[][];
  selectedColor: TileColor | null;
  onSelectLine: (lineIndex: number) => void;
  selectedLine: number | null;
  disabled?: boolean;
}

export function PatternLines({
  patternLines,
  wall,
  selectedColor,
  onSelectLine,
  selectedLine,
  disabled = false,
}: PatternLinesProps) {
  const { draggingColor } = useGameStore();

  const handleLineSelect = (rowIndex: number, canPlace: boolean) => {
    if (canPlace && !disabled) {
      onSelectLine(rowIndex);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {patternLines.map((line, rowIndex) => {
        // Check validity for BOTH selection (click) AND dragging (DnD)
        const effectiveColor = selectedColor || draggingColor;
        const canPlace =
          effectiveColor &&
          canPlaceTileInPatternLine(line, effectiveColor, wall, rowIndex);

        const isSelected = selectedLine === rowIndex;

        // Visual feedback for Dragging
        const isDragTarget = draggingColor && canPlace;

        return (
          <div
            key={rowIndex}
            className="pattern-line h-[28px] flex justify-end px-2"
          >
            <div
              data-drop-zone="pattern-line"
              data-row-index={rowIndex}
              onPointerUp={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLineSelect(rowIndex, !!canPlace);
              }}
              style={{ touchAction: 'manipulation' }}
              className={`
                flex items-center gap-1 p-1 -m-1 rounded transition-all duration-150
                ${canPlace && !disabled ? 'cursor-pointer hover:bg-slate-600 active:bg-slate-500' : ''}
                ${isSelected ? 'bg-slate-600 ring-2 ring-yellow-400' : ''}
                ${canPlace && !isSelected && !isDragTarget ? 'bg-slate-700/50' : ''}
                ${isDragTarget ? 'bg-slate-600 ring-2 ring-green-400 scale-[1.02]' : ''}
              `}
            >
              {/* Empty slots */}
              {Array.from({ length: line.capacity - line.count }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="w-6 h-6 rounded-sm"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: `2px dashed ${canPlace && !disabled ? 'rgba(232, 241, 242, 1)' : 'rgba(232, 241, 242, 0.5)'}`,
                    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)',
                  }}
                />
              ))}

              {/* Filled slots */}
              {Array.from({ length: line.count }).map((_, i) => (
                <Tile
                  key={`filled-${i}`}
                  color={line.color!}
                  size="sm"
                  disabled
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
