'use client';

import { SessionStats, TrialResult, Patient } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TRANSLATIONS, COLOR_HEX } from '@/lib/constants';

interface ResultsViewProps {
  patient: Patient;
  stats: SessionStats;
  results: TrialResult[];
  onReset: () => void;
  onDownload: () => void;
}

export function ResultsView({ patient, stats, results, onReset, onDownload }: ResultsViewProps) {
  const t = TRANSLATIONS[patient.lang];

  return (
    <Card className="w-full max-w-2xl mx-auto border shadow-lg bg-white/80 backdrop-blur-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="text-center pb-2 bg-muted/30 border-b">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">Assessment Complete</p>
        <CardTitle className="text-3xl font-serif mt-2">Results Summary</CardTitle>
        <CardDescription className="text-xs font-mono tracking-wider">
          Patient: {patient.id} | {new Date(patient.timestamp).toLocaleString()}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 space-y-8">
        <div className="bg-[#FDFBF7] border rounded-xl p-8 text-center space-y-2 shadow-inner">
          <div 
            className="text-6xl font-mono font-bold"
            style={{ color: stats.interference > 0 ? COLOR_HEX.red : COLOR_HEX.green }}
          >
            {stats.interference > 0 ? `+${stats.interference}` : stats.interference}
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Somatic Interference Score (ms)
          </div>
          <p className="text-[10px] text-muted-foreground/80 italic mt-4 max-w-xs mx-auto leading-relaxed">
            RT<sub>somatic</sub> − RT<sub>neutral</sub>. A positive score suggests an attentional bias toward somatic/pain stimuli.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Somatic RT', value: `${stats.rt_somatic}ms` },
            { label: 'Neutral RT', value: `${stats.rt_neutral}ms` },
            { label: 'Accuracy', value: `${stats.accuracy}%` },
            { label: 'Total Trials', value: stats.total },
          ].map((item, i) => (
            <div key={i} className="bg-muted/10 border rounded-lg p-4 text-center group hover:bg-white transition-colors">
              <div className="text-xl font-mono font-medium">{item.value}</div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1 group-hover:text-primary transition-colors">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
          <Button onClick={onDownload} variant="default" className="flex-1 h-12 text-sm font-semibold tracking-wide bg-[#1A1814] hover:bg-black">
            ⬇ Download CSV Report
          </Button>
          <Button onClick={onReset} variant="outline" className="flex-1 h-12 text-sm font-semibold tracking-wide">
            New Patient Assessment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
