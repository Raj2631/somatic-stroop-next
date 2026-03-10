import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createObjectCsvStringifier } from 'csv-writer';

export const dynamic = 'force-dynamic';

export async function GET() {
  console.log('API DEBUG: DATABASE_URL is:', process.env.DATABASE_URL);
  try {
    const sessions = await prisma.session.findMany({
      orderBy: { timestamp: 'desc' },
    });
    return NextResponse.json(sessions);
  } catch (err) {
    console.error('API Error [GET /api/sessions]:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { patient, stats, trials } = body;

    const session = await prisma.session.create({
      data: {
        patientId: patient.id,
        age: patient.age,
        gender: patient.gender,
        education: patient.education,
        diagnosis: patient.diagnosis,
        language: patient.lang,
        socioEconomicStatus: patient.socioEconomicStatus,
        phqScore: patient.phqScore,
        groupName: patient.group,
        interference: stats.interference,
        rt_somatic: stats.rt_somatic,
        rt_neutral: stats.rt_neutral,
        rt_color: stats.rt_color,
        accuracy: stats.accuracy,
        totalTrials: stats.total,
        trials: {
          create: trials.map((t: any) => ({
            trialNum: t.trial,
            phase: t.phase,
            word: t.word,
            color: t.color,
            type: t.type,
            response: t.response,
            correct: t.correct,
            rt_ms: t.rt_ms,
          })),
        },
      },
      include: { trials: true },
    });

    return NextResponse.json(session);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await prisma.session.deleteMany();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API Error [DELETE /api/sessions]:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
