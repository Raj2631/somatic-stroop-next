'use client';

import { Language } from '@/lib/types';
import { TRANSLATIONS, COLOR_HEX, COLOR_BG_HEX } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InstructionsProps {
  language: Language;
  onStart: () => void;
}

export function Instructions({ language, onStart }: InstructionsProps) {
  const t = TRANSLATIONS[language];

  return (
    <Card className="w-full max-w-lg mx-auto border shadow-lg bg-white/80 backdrop-blur-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardContent className="p-8 space-y-6">
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">
            {t['instr-tag']}
          </p>
          <h2 className="text-3xl font-serif">
            {t['instr-title']}
          </h2>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p dangerouslySetInnerHTML={{ __html: t['instr-body'] }} />
          
          <div className="flex flex-wrap justify-center gap-3 py-6 border-y bg-muted/5">
            <span 
              className="px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase border shadow-sm"
              style={{ backgroundColor: COLOR_BG_HEX.red, color: COLOR_HEX.red, borderColor: `${COLOR_HEX.red}33` }}
            >
              RED
            </span>
            <span 
              className="px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase border shadow-sm"
              style={{ backgroundColor: COLOR_BG_HEX.blue, color: COLOR_HEX.blue, borderColor: `${COLOR_HEX.blue}33` }}
            >
              BLUE
            </span>
            <span 
              className="px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase border shadow-sm"
              style={{ backgroundColor: COLOR_BG_HEX.green, color: COLOR_HEX.green, borderColor: `${COLOR_HEX.green}33` }}
            >
              GREEN
            </span>
            <span 
              className="px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase border shadow-sm"
              style={{ backgroundColor: COLOR_BG_HEX.yellow, color: COLOR_HEX.yellow, borderColor: `${COLOR_HEX.yellow}33` }}
            >
              YELLOW
            </span>
          </div>

          <p className="text-center italic text-xs" dangerouslySetInnerHTML={{ __html: t['instr-example'] }} />

          <ul className="space-y-4 pt-4">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex gap-4 items-start group">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-mono flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                  {i}
                </span>
                <span className="text-xs pt-1" dangerouslySetInnerHTML={{ __html: t[`s${i}`] }} />
              </li>
            ))}
          </ul>
        </div>

        <Button onClick={onStart} className="w-full h-12 text-sm font-semibold tracking-wide mt-6 bg-[#1A1814] hover:bg-black">
          {t['btn-practice-start']}
        </Button>
      </CardContent>
    </Card>
  );
}
