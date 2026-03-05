'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Language, Trial, TrialResult, ColorType, TrialType, SessionStats } from './types';
import { WORDS, COLORS } from './constants';

interface UseStroopTestProps {
  language: Language;
  onComplete: (results: TrialResult[], stats: SessionStats) => void;
  phase: 'practice' | 'test';
  count: number;
}

export function useStroopTest({ language, onComplete, phase, count }: UseStroopTestProps) {
  const [trials, setTrials] = useState<Trial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [results, setResults] = useState<TrialResult[]>([]);
  const [showFixation, setShowFixation] = useState(false);
  const [showStimulus, setShowStimulus] = useState(false);
  const [canRespond, setCanRespond] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generateTrials = useCallback(() => {
    const ws = WORDS[language];
    const seq: Trial[] = [];
    const nSomatic = Math.round(count * 0.4);
    const nNeutral = Math.round(count * 0.4);
    const nColor = count - nSomatic - nNeutral;

    const pushType = (type: TrialType, words: string[], n: number) => {
      for (let i = 0; i < n; i++) {
        const word = words[Math.floor(Math.random() * words.length)];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        seq.push({ word, color, type });
      }
    };

    pushType('somatic', ws.somatic, nSomatic);
    pushType('neutral', ws.neutral, nNeutral);
    pushType('color', ws.color, nColor);

    // Shuffle
    for (let i = seq.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [seq[i], seq[j]] = [seq[j], seq[i]];
    }
    setTrials(seq);
    setCurrentIndex(0);
    setResults([]);
  }, [language, count]);

  useEffect(() => {
    generateTrials();
  }, [generateTrials]);

  const calculateStats = (allResults: TrialResult[]): SessionStats => {
    // Filter for correct responses only for RT calculation
    const correctResults = allResults.filter(r => r.correct);
    
    const getAvgRT = (type: TrialType) => {
      const rs = correctResults.filter(r => r.type === type);
      if (rs.length === 0) return 0;
      const sum = rs.reduce((acc, r) => acc + r.rt_ms, 0);
      return sum / rs.length;
    };

    const rt_somatic = getAvgRT('somatic');
    const rt_neutral = getAvgRT('neutral');
    const rt_color = getAvgRT('color');
    
    // Interference is typically somatic RT - neutral RT
    const interference = (rt_somatic > 0 && rt_neutral > 0) ? rt_somatic - rt_neutral : 0;
    const accuracy = allResults.length > 0 
      ? (allResults.filter(r => r.correct).length / allResults.length) * 100 
      : 0;

    return {
      interference: Math.round(interference),
      rt_somatic: Math.round(rt_somatic),
      rt_neutral: Math.round(rt_neutral),
      rt_color: Math.round(rt_color),
      accuracy: Math.round(accuracy * 10) / 10,
      total: allResults.length
    };
  };

  const startTrial = useCallback(() => {
    if (currentIndex < 0 || currentIndex >= trials.length) return;

    setShowStimulus(false);
    setCanRespond(false);
    setShowFixation(true);
    setStartTime(null);

    // End of fixation -> show stimulus; no auto-advance, user responds at their own pace
    timeoutRef.current = setTimeout(() => {
      setShowFixation(false);
      setShowStimulus(true);
      setCanRespond(true);
      setStartTime(performance.now());
    }, 800); // 800ms fixation
  }, [currentIndex, trials.length]);

  // Start trial when index changes
  useEffect(() => {
    if (trials.length > 0 && currentIndex >= 0 && currentIndex < trials.length) {
      startTrial();
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, trials.length, startTrial]);

  const handleResponse = (response: ColorType) => {
    if (!canRespond) return;

    const now = performance.now();
    const rt = startTime === null ? 0 : now - startTime;
    
    const current = trials[currentIndex];
    if (!current) return;

    const newResult: TrialResult = {
      ...current,
      trial: currentIndex + 1,
      phase,
      response,
      correct: response === current.color,
      rt_ms: Math.round(rt)
    };

    const newResults = [...results, newResult];
    setResults(newResults);
    
    setCanRespond(false);
    setShowStimulus(false);

    if (currentIndex + 1 >= trials.length) {
      onComplete(newResults, calculateStats(newResults));
    } else {
      // Short delay before next trial fixation
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 300);
    }
  };

  return {
    currentTrial: currentIndex >= 0 ? trials[currentIndex] : null,
    currentIndex,
    totalCount: trials.length,
    showFixation,
    showStimulus,
    canRespond,
    handleResponse
  };
}
