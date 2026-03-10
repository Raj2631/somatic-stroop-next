"use client";

import { useState } from "react";
import { Patient, TrialResult, SessionStats } from "@/lib/types";
import { RegistrationForm } from "@/components/stroop/RegistrationForm";
import { Instructions } from "@/components/stroop/Instructions";
import { StroopTest } from "@/components/stroop/StroopTest";
import { ResultsView } from "@/components/stroop/ResultsView";
import { AdminDashboard } from "@/components/stroop/AdminDashboard";
import { toast } from "sonner";

type AppState =
  | "welcome"
  | "instructions"
  | "practice"
  | "test"
  | "results"
  | "admin";

export default function Home() {
  const [state, setState] = useState<AppState>("welcome");
  const [patient, setPatient] = useState<Patient | null>(null);
  const [results, setResults] = useState<TrialResult[]>([]);
  const [stats, setStats] = useState<SessionStats | null>(null);

  const handleStartRegistration = (p: Patient) => {
    setPatient(p);
    setState("instructions");
  };

  const handleStartPractice = () => {
    setState("practice");
  };

  const handlePracticeComplete = (res: TrialResult[], s: SessionStats) => {
    setState("test");
    toast.success("Practice complete. Starting real test.");
  };

  const handleTestComplete = async (res: TrialResult[], s: SessionStats) => {
    setResults(res);
    setStats(s);
    setState("results");

    // Save to backend
    try {
      const resp = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient,
          stats: s,
          trials: res,
        }),
      });
      if (resp.ok) {
        toast.success("Assessment results saved successfully.");
      } else {
        toast.error("Failed to save results to server.");
      }
    } catch (err) {
      toast.error("Network error while saving results.");
    }
  };

  const handleDownload = () => {
    // Current session CSV download
    // Since we just saved it and we have the results in state, we could trigger a client-side CSV generation
    // or fetch it from the backend if we had an ID.
    // For simplicity, we'll suggest using the admin panel or a dedicated export route if we had the ID.
    // Let's assume the backend returned the session ID.
    setState("admin");
  };

  const handleReset = () => {
    setPatient(null);
    setResults([]);
    setStats(null);
    setState("welcome");
  };

  return (
    <div className="w-full h-full max-w-5xl mx-auto py-2">
      {state === "welcome" && (
        <RegistrationForm
          onStart={handleStartRegistration}
          onAdmin={() => setState("admin")}
        />
      )}

      {state === "instructions" && patient && (
        <Instructions language={patient.lang} onStart={handleStartPractice} />
      )}

      {state === "practice" && patient && (
        <StroopTest
          language={patient.lang}
          phase="practice"
          count={5}
          onComplete={handlePracticeComplete}
        />
      )}

      {state === "test" && patient && (
        <StroopTest
          language={patient.lang}
          phase="test"
          count={40}
          onComplete={handleTestComplete}
        />
      )}

      {state === "results" && patient && stats && (
        <ResultsView
          patient={patient}
          stats={stats}
          results={results}
          onReset={handleReset}
          onDownload={handleDownload}
        />
      )}

      {state === "admin" && (
        <AdminDashboard onBack={() => setState("welcome")} />
      )}
    </div>
  );
}
