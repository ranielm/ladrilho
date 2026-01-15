import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../i18n/useLanguage';

interface GameRulesProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GameRules({ isOpen, onClose }: GameRulesProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-600"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-800 border-b border-slate-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">📖</span>
                {t.rulesTitle}
              </h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors p-2"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Objective */}
              <section>
                <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <span>🎯</span> {t.rulesObjective}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {t.rulesObjectiveText}
                </p>
              </section>

              {/* Gameplay */}
              <section>
                <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                  <span>🎮</span> {t.rulesGameplay}
                </h3>
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-white">{t.rulesGameplayStep1.replace('1. ', '')}</p>
                        <p className="text-sm text-slate-400 mt-1">{t.rulesGameplayStep1Detail}</p>
                      </div>
                    </div>
                    {/* Mini tile illustration */}
                    <div className="mt-3 flex items-center gap-2 justify-center">
                      <div className="flex gap-1">
                        <div className="w-4 h-4 rounded-sm bg-blue-500"></div>
                        <div className="w-4 h-4 rounded-sm bg-blue-500"></div>
                        <div className="w-4 h-4 rounded-sm bg-yellow-500"></div>
                        <div className="w-4 h-4 rounded-sm bg-red-500"></div>
                      </div>
                      <span className="text-slate-500">→</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-4 rounded-sm bg-blue-500 ring-2 ring-blue-300"></div>
                        <div className="w-4 h-4 rounded-sm bg-blue-500 ring-2 ring-blue-300"></div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-white">{t.rulesGameplayStep2.replace('2. ', '')}</p>
                        <p className="text-sm text-slate-400 mt-1">{t.rulesGameplayStep2Detail}</p>
                      </div>
                    </div>
                    {/* Pattern lines illustration */}
                    <div className="mt-3 flex flex-col items-center gap-1">
                      <div className="flex gap-1 justify-end w-24">
                        <div className="w-4 h-4 rounded-sm bg-blue-500"></div>
                      </div>
                      <div className="flex gap-1 justify-end w-24">
                        <div className="w-4 h-4 rounded-sm bg-yellow-500"></div>
                        <div className="w-4 h-4 rounded-sm bg-yellow-500"></div>
                      </div>
                      <div className="flex gap-1 justify-end w-24">
                        <div className="w-4 h-4 rounded-sm border border-dashed border-slate-500"></div>
                        <div className="w-4 h-4 rounded-sm bg-red-500"></div>
                        <div className="w-4 h-4 rounded-sm bg-red-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-white">{t.rulesGameplayStep3.replace('3. ', '')}</p>
                        <p className="text-sm text-slate-400 mt-1">{t.rulesGameplayStep3Detail}</p>
                      </div>
                    </div>
                    {/* Floor line illustration */}
                    <div className="mt-3 flex items-center justify-center gap-1">
                      <div className="w-4 h-4 rounded-sm bg-blue-500"></div>
                      <div className="w-4 h-4 rounded-sm bg-blue-500"></div>
                      <div className="w-4 h-4 rounded-sm border border-dashed border-slate-500"></div>
                      <div className="w-4 h-4 rounded-sm border border-dashed border-slate-500"></div>
                      <div className="w-4 h-4 rounded-sm border border-dashed border-slate-500"></div>
                      <div className="w-4 h-4 rounded-sm border border-dashed border-slate-500"></div>
                      <div className="w-4 h-4 rounded-sm border border-dashed border-slate-500"></div>
                    </div>
                    <div className="flex justify-center gap-1 text-xs text-red-400 mt-1">
                      <span>-1</span>
                      <span>-1</span>
                      <span>-2</span>
                      <span>-2</span>
                      <span>-2</span>
                      <span>-3</span>
                      <span>-3</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Scoring */}
              <section>
                <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <span>⭐</span> {t.rulesScoring}
                </h3>
                <div className="bg-slate-700/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-300">{t.rulesScoringTile}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">→</span>
                    <span className="text-slate-300">{t.rulesScoringRow}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">↓</span>
                    <span className="text-slate-300">{t.rulesScoringColumn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">◆</span>
                    <span className="text-slate-300">{t.rulesScoringColor}</span>
                  </div>
                </div>
              </section>

              {/* First Player Marker */}
              <section>
                <h3 className="text-lg font-semibold text-purple-400 mb-2 flex items-center gap-2">
                  <span>👑</span> {t.rulesFirstPlayer}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {t.rulesFirstPlayerText}
                </p>
              </section>

              {/* End Game */}
              <section>
                <h3 className="text-lg font-semibold text-orange-400 mb-2 flex items-center gap-2">
                  <span>🏆</span> {t.rulesEndGame}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {t.rulesEndGameText}
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-slate-800 border-t border-slate-600 px-6 py-4">
              <button
                onClick={onClose}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {t.rulesClose}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
