import React from 'react';
import { useLanguageStore } from '../../i18n/useLanguage';
import { Language } from '../../i18n/translations';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="flex gap-1 bg-slate-700 rounded-lg p-1">
      <button
        onClick={() => setLanguage('pt-BR')}
        className={`
          px-3 py-1 rounded text-sm font-medium transition-colors
          ${language === 'pt-BR'
            ? 'bg-blue-600 text-white'
            : 'text-slate-400 hover:text-white'}
        `}
      >
        PT
      </button>
      <button
        onClick={() => setLanguage('en-US')}
        className={`
          px-3 py-1 rounded text-sm font-medium transition-colors
          ${language === 'en-US'
            ? 'bg-blue-600 text-white'
            : 'text-slate-400 hover:text-white'}
        `}
      >
        EN
      </button>
    </div>
  );
}
