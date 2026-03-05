'use client';

import { useState } from 'react';
import { Patient, Language } from '@/lib/types';
import { LANGUAGES, TRANSLATIONS, COLOR_HEX } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface RegistrationFormProps {
  onStart: (patient: Patient) => void;
  onAdmin: () => void;
}

export function RegistrationForm({ onStart, onAdmin }: RegistrationFormProps) {
  const [lang, setLang] = useState<Language>('en');
  const [pid, setPid] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [edu, setEdu] = useState('');
  const [diag, setDiag] = useState('');

  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pid || !age || !gender || !edu) return;

    onStart({
      id: pid,
      age: parseInt(age),
      gender,
      education: edu,
      diagnosis: diag,
      lang,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">
          Clinical Neuropsychology
        </p>
        <h1 className="text-4xl md:text-5xl font-serif leading-tight">
          Somatic<br />
          <em className="text-3xl md:text-4xl" style={{ color: COLOR_HEX.blue }}>Stroop Test</em>
        </h1>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          A tablet-based attentional bias assessment for outpatient clinical settings.
        </p>
      </div>

      <Card className="w-full border shadow-lg bg-white/80 backdrop-blur-md overflow-hidden">
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-wrap justify-center gap-2 pb-4 border-b">
            {LANGUAGES.map((l) => (
              <Button
                key={l.value}
                variant={lang === l.value ? 'default' : 'outline'}
                size="sm"
                className={`rounded-full h-8 px-4 text-xs transition-all ${
                  lang === l.value ? 'bg-[#1A1814] text-white shadow-md scale-105' : 'hover:border-[#1A1814]'
                }`}
                onClick={() => setLang(l.value)}
              >
                {l.label}
              </Button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                {t['lbl-pid']}
              </Label>
              <Input 
                placeholder="e.g. OPD-2024-001" 
                value={pid} 
                onChange={(e) => setPid(e.target.value)}
                required
                className="hover:border-[#1A1814] focus:ring-[#1A1814]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                  {t['lbl-age']}
                </Label>
                <Input 
                  type="number" 
                  min="5" 
                  max="100" 
                  placeholder="e.g. 42" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)}
                  required
                  className="hover:border-[#1A1814]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                   {t['lbl-gender']}
                </Label>
                <Select value={gender} onValueChange={setGender} required>
                  <SelectTrigger className="hover:border-[#1A1814]">
                    <SelectValue placeholder="— Select —" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                    <SelectItem value="O">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                {t['lbl-edu']}
              </Label>
              <Select value={edu} onValueChange={setEdu} required>
                <SelectTrigger className="hover:border-[#1A1814]">
                  <SelectValue placeholder="— Select —" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="illiterate">Illiterate</SelectItem>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="higher_secondary">Higher Secondary</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                  <SelectItem value="postgraduate">Postgraduate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                {t['lbl-diag']}
              </Label>
              <Input 
                placeholder="e.g. Functional somatic symptoms" 
                value={diag} 
                onChange={(e) => setDiag(e.target.value)}
                className="hover:border-[#1A1814]"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-sm font-semibold tracking-wide bg-[#1A1814] hover:bg-black shadow-lg hover:shadow-xl transition-all active:scale-[0.98]">
              {t['btn-start']}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Button variant="ghost" className="text-xs text-muted-foreground hover:bg-transparent hover:text-[#1A1814] transition-colors" onClick={onAdmin}>
        🔒 Admin / View Data
      </Button>
    </div>
  );
}
