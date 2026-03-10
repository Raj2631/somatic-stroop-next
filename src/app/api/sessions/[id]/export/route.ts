import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createObjectCsvStringifier } from 'csv-writer';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await prisma.session.findUnique({
      where: { id },
      include: { trials: true },
    });

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'trialNum', title: 'trial' },
        { id: 'phase', title: 'phase' },
        { id: 'word', title: 'word' },
        { id: 'color', title: 'word_color' },
        { id: 'type', title: 'word_type' },
        { id: 'response', title: 'response' },
        { id: 'correct', title: 'correct' },
        { id: 'rt_ms', title: 'rt_ms' },
      ],
    });

    const header = csvStringifier.getHeaderString();
    const records = csvStringifier.stringifyRecords(session.trials);
    
    const content = `=== SUMMARY ===
session_id,${session.id}
timestamp,${session.timestamp.toISOString()}
patient_name,${session.patientId}
age,${session.age}
gender,${session.gender}
education,${session.education}
diagnosis,${session.diagnosis || ''}
language,${session.language}
ses,${session.socioEconomicStatus}
phq_score,${session.phqScore}
group,${session.groupName}
interference_ms,${session.interference}
rt_somatic_ms,${session.rt_somatic}
rt_neutral_ms,${session.rt_neutral}
accuracy_pct,${session.accuracy}
total_trials,${session.totalTrials}

=== TRIAL DATA ===
${header}${records}`;

    const safePatientId = session.patientId.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `stroop_${session.id.slice(-6)}_${safePatientId}.csv`;

    return new Response(content, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Access-Control-Expose-Headers': 'Content-Disposition',
      },
    });
  } catch (err) {
    console.error(`API Error [GET /api/sessions/${(await params).id}/export]:`, err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
