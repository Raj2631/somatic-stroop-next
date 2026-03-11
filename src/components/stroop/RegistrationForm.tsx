"use client";

import { useMemo, useState } from "react";
import { Patient, Language } from "@/lib/types";
import { LANGUAGES, TRANSLATIONS, COLOR_HEX } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegistrationFormProps {
  onStart: (patient: Patient) => void;
  onAdmin: () => void;
}

const registrationSchema = z.object({
  id: z.string().trim().min(1, "Patient name is required"),
  age: z
    .string()
    .min(1, "Age is required")
    .refine((v) => Number.isFinite(Number(v)), "Age must be a number")
    .refine((v) => Number.isInteger(Number(v)), "Age must be an integer")
    .refine(
      (v) => Number(v) >= 5 && Number(v) <= 100,
      "Age must be between 5 and 100",
    ),
  gender: z.enum(["M", "F", "O"]).or(z.literal("")).refine((v) => v !== "", {
    message: "Gender is required",
  }),
  education: z.string().min(1, "Education is required"),
  diagnosis: z.string().optional(),
  socioEconomicStatus: z
    .enum(["upper", "middle", "lower"])
    .or(z.literal(""))
    .refine((v) => v !== "", { message: "Socio-economic status is required" }),
  phqScore: z
    .string()
    .min(1, "PHQ score is required")
    .refine((v) => Number.isFinite(Number(v)), "PHQ score must be a number")
    .refine((v) => Number.isInteger(Number(v)), "PHQ score must be an integer")
    .refine(
      (v) => Number(v) >= 0 && Number(v) <= 27,
      "PHQ score must be between 0 and 27",
    ),
  group: z.enum(["A", "B"]).or(z.literal("")).refine((v) => v !== "", {
    message: "Group is required",
  }),
});

type RegistrationValues = z.input<typeof registrationSchema>;

export function RegistrationForm({ onStart, onAdmin }: RegistrationFormProps) {
  const [lang, setLang] = useState<Language>("en");
  const t = useMemo(() => TRANSLATIONS[lang], [lang]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      id: "",
      age: "",
      gender: "",
      education: "",
      diagnosis: "",
      socioEconomicStatus: "",
      phqScore: "",
      group: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (values: RegistrationValues) => {
    const parsed = registrationSchema.parse(values);
    onStart({
      id: parsed.id.trim(),
      age: Number(parsed.age),
      gender: parsed.gender as "M" | "F" | "O",
      education: parsed.education,
      diagnosis: parsed.diagnosis?.trim() || undefined,
      socioEconomicStatus: parsed.socioEconomicStatus as "upper" | "middle" | "lower",
      phqScore: Number(parsed.phqScore),
      group: parsed.group as "A" | "B",
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
          Somatic{" "}
          <em
            className="text-3xl md:text-4xl"
            style={{ color: COLOR_HEX.blue }}
          >
            Stroop Test
          </em>
        </h1>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          A tablet-based attentional bias assessment for outpatient clinical
          settings.
        </p>
      </div>

      <Card className="w-full border shadow-lg bg-white/80 backdrop-blur-md overflow-hidden">
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-wrap justify-center gap-2 pb-4 border-b">
            {LANGUAGES.map((l) => (
              <Button
                key={l.value}
                variant={lang === l.value ? "default" : "outline"}
                size="sm"
                className={`rounded-full h-8 px-4 text-xs transition-all ${
                  lang === l.value
                    ? "bg-[#1A1814] text-white shadow-md scale-105"
                    : "hover:border-[#1A1814]"
                }`}
                onClick={() => setLang(l.value)}
              >
                {l.label}
              </Button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                {t["lbl-pid"]}
              </Label>
              <Input
                placeholder={t["lbl-pid"]}
                {...register("id")}
                className="hover:border-[#1A1814] focus:ring-[#1A1814]"
              />
              {errors.id && (
                <p className="text-[10px] text-destructive">{errors.id.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                  {t["lbl-age"]}
                </Label>
                <Input
                  type="number"
                  min="5"
                  max="100"
                  placeholder="e.g. 42"
                  {...register("age")}
                  className="hover:border-[#1A1814]"
                />
                {errors.age && (
                  <p className="text-[10px] text-destructive">{errors.age.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                  {t["lbl-gender"]}
                </Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="hover:border-[#1A1814]">
                        <SelectValue placeholder="— Select —" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                        <SelectItem value="O">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <p className="text-[10px] text-destructive">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                {t["lbl-edu"]}
              </Label>
              <Controller
                control={control}
                name="education"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="hover:border-[#1A1814]">
                      <SelectValue placeholder="— Select —" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="illiterate">Illiterate</SelectItem>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="higher_secondary">
                        Higher Secondary
                      </SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.education && (
                <p className="text-[10px] text-destructive">
                  {errors.education.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                {t["lbl-ses"]}
              </Label>
              <Controller
                control={control}
                name="socioEconomicStatus"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="hover:border-[#1A1814]">
                      <SelectValue placeholder="— Select —" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upper">Upper</SelectItem>
                      <SelectItem value="middle">Middle</SelectItem>
                      <SelectItem value="lower">Lower</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.socioEconomicStatus && (
                <p className="text-[10px] text-destructive">
                  {errors.socioEconomicStatus.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                  {t["lbl-phq"]}
                </Label>
                <Input
                  type="number"
                  min="0"
                  max="27"
                  placeholder="e.g. 12"
                  {...register("phqScore")}
                  className="hover:border-[#1A1814]"
                />
                {errors.phqScore && (
                  <p className="text-[10px] text-destructive">
                    {errors.phqScore.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                  {t["lbl-group"]}
                </Label>
                <Controller
                  control={control}
                  name="group"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="hover:border-[#1A1814]">
                        <SelectValue placeholder="— Select —" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.group && (
                  <p className="text-[10px] text-destructive">
                    {errors.group.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                {t["lbl-diag"]}
              </Label>
              <Input
                placeholder="e.g. Functional somatic symptoms"
                {...register("diagnosis")}
                className="hover:border-[#1A1814]"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-sm font-semibold tracking-wide bg-[#1A1814] hover:bg-black shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
            >
              {t["btn-start"]}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Button
        variant="ghost"
        className="text-xs text-muted-foreground hover:bg-transparent hover:text-[#1A1814] transition-colors"
        onClick={onAdmin}
      >
        🔒 Admin / View Data
      </Button>
    </div>
  );
}
