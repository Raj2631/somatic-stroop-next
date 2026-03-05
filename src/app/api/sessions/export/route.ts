import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createObjectCsvStringifier } from 'csv-writer';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      orderBy: { timestamp: 'desc' },
    });

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'id', title: 'session_id' },
        { id: 'timestamp', title: 'timestamp' },
        { id: 'patientId', title: 'patient_id' },
        { id: 'age', title: 'age' },
        { id: 'gender', title: 'gender' },
        { id: 'education', title: 'education' },
        { id: 'diagnosis', title: 'diagnosis' },
        { id: 'language', title: 'language' },
        { id: 'interference', title: 'interference_ms' },
        { id: 'rt_somatic', title: 'rt_somatic_ms' },
        { id: 'rt_neutral', title: 'rt_neutral_ms' },
        { id: 'rt_color', title: 'rt_color_ms' },
        { id: 'accuracy', title: 'accuracy_pct' },
        { id: 'totalTrials', title: 'total_trials' },
      ],
    });

    const header = csvStringifier.getHeaderString();
    const records = csvStringifier.stringifyRecords(sessions.map((s: any) => ({
      ...s,
      timestamp: s.timestamp.toISOString(),
      diagnosis: s.diagnosis || ''
    })));
    
    const content = header + records;

    const date = new Date().toISOString().slice(0, 10);
    const filename = `stroop_master_export_${date}.csv`;

    return new Response(content, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Access-Control-Expose-Headers': 'Content-Disposition',
      },
    });
  } catch (err) {
    console.error('API Error [GET /api/sessions/export]:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
