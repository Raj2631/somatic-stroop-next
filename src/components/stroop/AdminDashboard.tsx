"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { COLOR_HEX } from "@/lib/constants";

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/sessions");
      const data = await res.json();
      setSessions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDownloadAll = () => {
    triggerDownload("/api/sessions/export");
  };

  const handleClearAll = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete all session data? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await fetch("/api/sessions", { method: "DELETE" });
      setSessions([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto border shadow-lg bg-white/80 backdrop-blur-md overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b bg-muted/20">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">
            Admin Panel
          </p>
          <CardTitle className="text-2xl font-serif mt-1">
            All Session Data
          </CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-xs h-8 px-4 rounded-full border group"
        >
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">
            ←
          </span>{" "}
          Back to Main
        </Button>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            onClick={handleDownloadAll}
            className="h-10 text-xs font-semibold tracking-wide shadow-md bg-[#1A1814] hover:bg-black"
          >
            ⬇ Download Master CSV
          </Button>
          {/*  <Button onClick={handleClearAll} variant="destructive" size="sm" className="h-10 text-[10px] uppercase tracking-widest font-bold px-6">
            🗑 Clear All
          </Button>

          */}
        </div>

        <div className="rounded-xl border border-muted-foreground/10 overflow-hidden bg-white shadow-sm">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-[9px] uppercase tracking-wider font-bold">
                  Timestamp
                </TableHead>
                <TableHead className="text-[9px] uppercase tracking-wider font-bold">
                  Patient
                </TableHead>
                <TableHead className="text-[9px] uppercase tracking-wider font-bold">
                  Age
                </TableHead>
                <TableHead className="text-[9px] uppercase tracking-wider font-bold">
                  Gender
                </TableHead>
                <TableHead className="text-[9px] uppercase tracking-wider font-bold">
                  SES
                </TableHead>
                <TableHead className="text-[9px] uppercase tracking-wider font-bold">
                  PHQ
                </TableHead>
                <TableHead className="text-[9px] uppercase tracking-wider font-bold">
                  Group
                </TableHead>
                <TableHead className="text-[9px] uppercase tracking-wider font-bold text-center">
                  Interference (ms)
                </TableHead>
                <TableHead className="text-[9px] uppercase tracking-wider font-bold text-center">
                  Accuracy
                </TableHead>
                <TableHead className="text-[9px] uppercase tracking-wider font-bold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-muted-foreground text-xs animate-pulse"
                  >
                    Loading sessions...
                  </TableCell>
                </TableRow>
              ) : sessions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="h-32 text-center text-muted-foreground text-xs italic"
                  >
                    No sessions recorded yet.
                  </TableCell>
                </TableRow>
              ) : (
                sessions.map((s) => (
                  <TableRow
                    key={s.id}
                    className="hover:bg-primary/[0.02] transition-colors"
                  >
                    <TableCell className="text-[10px] font-mono whitespace-nowrap">
                      {new Date(s.timestamp).toLocaleString(undefined, {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </TableCell>
                    <TableCell className="text-[10px] font-bold font-mono text-primary">
                      {s.patientId}
                    </TableCell>
                    <TableCell className="text-[10px] font-mono">
                      {s.age}
                    </TableCell>
                    <TableCell className="text-[10px] font-mono">
                      {s.gender}
                    </TableCell>
                    <TableCell className="text-[10px] font-mono">
                      {s.socioEconomicStatus}
                    </TableCell>
                    <TableCell className="text-[10px] font-mono">
                      {s.phqScore}
                    </TableCell>
                    <TableCell className="text-[10px] font-mono">
                      {s.groupName}
                    </TableCell>
                    <TableCell className="text-[10px] font-mono font-bold text-center">
                      <span
                        style={{
                          color:
                            s.interference > 0
                              ? COLOR_HEX.red
                              : COLOR_HEX.green,
                        }}
                      >
                        {s.interference > 0
                          ? `+${s.interference}`
                          : s.interference}
                      </span>
                    </TableCell>
                    <TableCell className="text-[10px] font-mono text-center">
                      {s.accuracy}%
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-[9px] uppercase font-bold text-primary hover:bg-primary/5 px-3 rounded-full"
                        onClick={() =>
                          triggerDownload(`/api/sessions/${s.id}/export`)
                        }
                      >
                        Export CSV
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
