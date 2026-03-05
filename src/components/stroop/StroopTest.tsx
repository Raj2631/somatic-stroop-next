'use client';

import { useStroopTest } from '@/lib/useStroopTest';
import { Language, TrialResult, SessionStats } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { COLOR_HEX, COLOR_BG_HEX, TRANSLATIONS } from '@/lib/constants';

interface StroopTestProps {
  language: Language;
  phase: 'practice' | 'test';
  count: number;
  onComplete: (results: TrialResult[], stats: SessionStats) => void;
}

export function StroopTest({ language, phase, count, onComplete }: StroopTestProps) {
  const {
    currentTrial,
    currentIndex,
    totalCount,
    showFixation,
    showStimulus,
    canRespond,
    handleResponse
  } = useStroopTest({ language, phase, count, onComplete });

  const t = TRANSLATIONS[language];
  const progress = (currentIndex / totalCount) * 100;

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto bg-white/50 backdrop-blur-sm rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between bg-white">
        <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
          {phase === 'practice' ? 'PRACTICE' : 'TEST'}
        </span>
        <div className="flex-1 mx-6">
          <Progress value={progress} className="h-1.5" />
        </div>
        <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
          {currentIndex + 1} / {totalCount}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative p-6 min-h-[300px]">
        {phase === 'practice' && (
          <div className="absolute top-4 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-semibold animate-pulse">
            ✦ Practice Round — responses not recorded
          </div>
        )}

        {showFixation && (
          <div className="text-5xl font-mono text-muted-foreground/40 animate-in fade-in zoom-in duration-200">
            +
          </div>
        )}

        {showStimulus && currentTrial && (
          <div className="flex flex-col items-center gap-4 animate-in zoom-in duration-200">
            <h2 
              className="text-6xl md:text-8xl font-serif tracking-tight text-center"
              style={{ color: COLOR_HEX[currentTrial.color] }}
            >
              {currentTrial.word}
            </h2>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
              {t['hint-text']}
            </p>
          </div>
        )}
      </div>

      <div className="p-6 grid grid-cols-2 gap-4 bg-white border-t">
        <Button 
          variant="default"
          className="h-28 text-2xl font-black transition-all active:scale-95 shadow-lg border-b-4 active:border-b-0"
          style={{ 
            backgroundColor: COLOR_HEX.red, 
            color: 'white',
            borderColor: '#9B2C20' // Darker red for button depth
          }}
          onClick={() => handleResponse('red')}
          disabled={!canRespond}
        >
          {t['cbtn-red'].split(' ')[1].toUpperCase()}
        </Button>
        <Button 
          variant="default"
          className="h-28 text-2xl font-black transition-all active:scale-95 shadow-lg border-b-4 active:border-b-0"
          style={{ 
            backgroundColor: COLOR_HEX.blue, 
            color: 'white',
            borderColor: '#1F4263' // Darker blue
          }}
          onClick={() => handleResponse('blue')}
          disabled={!canRespond}
        >
          {t['cbtn-blue'].split(' ')[1].toUpperCase()}
        </Button>
        <Button 
          variant="default"
          className="h-28 text-2xl font-black transition-all active:scale-95 shadow-lg border-b-4 active:border-b-0"
          style={{ 
            backgroundColor: COLOR_HEX.green, 
            color: 'white',
            borderColor: '#124D29' // Darker green
          }}
          onClick={() => handleResponse('green')}
          disabled={!canRespond}
        >
          {t['cbtn-green'].split(' ')[1].toUpperCase()}
        </Button>
        <Button 
          variant="default"
          className="h-28 text-2xl font-black transition-all active:scale-95 shadow-lg border-b-4 active:border-b-0"
          style={{ 
            backgroundColor: COLOR_HEX.yellow, 
            color: 'white',
            borderColor: '#8E6908' // Darker yellow
          }}
          onClick={() => handleResponse('yellow')}
          disabled={!canRespond}
        >
          {t['cbtn-yellow'].split(' ')[1].toUpperCase()}
        </Button>
      </div>
    </div>
  );
}
