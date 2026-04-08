'use client';

import { useState } from 'react';

interface Question {
  id: string;
  label: string;
  type: 'select' | 'yesno';
  options?: { value: string; label: string; points: number }[];
  yesPoints?: number;
  noPoints?: number;
}

const QUESTIONS: Question[] = [
  {
    id: 'age',
    label: 'How old is your roof?',
    type: 'select',
    options: [
      { value: 'under10', label: 'Under 10 years', points: 0 },
      { value: '10to20', label: '10–20 years', points: 1 },
      { value: '20to30', label: '20–30 years', points: 3 },
      { value: 'over30', label: 'Over 30 years', points: 5 },
      { value: 'unknown', label: 'Not sure', points: 2 },
    ],
  },
  {
    id: 'granules',
    label: 'Are you finding gritty granules in your gutters or at the base of downspouts?',
    type: 'yesno',
    yesPoints: 3,
    noPoints: 0,
  },
  {
    id: 'curling',
    label: 'Are shingles curling, cracking, or missing in multiple areas?',
    type: 'yesno',
    yesPoints: 4,
    noPoints: 0,
  },
  {
    id: 'sagging',
    label: 'Is there any sagging or unevenness along the roofline or ridge?',
    type: 'yesno',
    yesPoints: 5,
    noPoints: 0,
  },
  {
    id: 'leaks',
    label: 'Have you noticed interior water stains, ceiling discolouration, or active leaks?',
    type: 'yesno',
    yesPoints: 4,
    noPoints: 0,
  },
  {
    id: 'energy',
    label: 'Have your heating or cooling bills increased noticeably in recent years?',
    type: 'yesno',
    yesPoints: 2,
    noPoints: 0,
  },
  {
    id: 'moss',
    label: 'Is there heavy moss or algae that keeps returning despite treatment?',
    type: 'yesno',
    yesPoints: 2,
    noPoints: 0,
  },
];

type Answers = Record<string, string>;

function getResult(score: number): {
  verdict: string;
  recommendation: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  color: string;
  bg: string;
  border: string;
  cta: string;
} {
  if (score <= 2) {
    return {
      verdict: 'Your roof looks healthy',
      recommendation:
        'Based on your answers, your roof does not show signs of immediate concern. Schedule a professional inspection every 2–3 years to catch early deterioration, and keep gutters clear to prevent moisture buildup at the eaves.',
      urgency: 'low',
      color: '#166534',
      bg: '#F0FDF4',
      border: '#86EFAC',
      cta: 'Book a Free Inspection',
    };
  } else if (score <= 6) {
    return {
      verdict: 'Your roof needs attention',
      recommendation:
        'Your roof is showing early warning signs. While replacement may not be immediate, a professional inspection is strongly recommended. Catching deterioration now prevents minor issues from becoming structural problems that significantly raise replacement costs.',
      urgency: 'medium',
      color: '#92400E',
      bg: '#FFFBEB',
      border: '#FDE68A',
      cta: 'Get a Free Roof Assessment',
    };
  } else if (score <= 11) {
    return {
      verdict: 'Replacement is likely needed soon',
      recommendation:
        'Your roof is showing multiple signs of significant deterioration. At this stage, ongoing repairs are likely to cost more than a planned replacement over the next 1–2 years. With major manufacturer price increases now in effect, getting quotes sooner rather than later is in your financial interest.',
      urgency: 'high',
      color: '#9A1C1C',
      bg: '#FFF1F2',
      border: '#FECDD3',
      cta: 'Get Replacement Quotes Now',
    };
  } else {
    return {
      verdict: 'Urgent: your roof needs immediate assessment',
      recommendation:
        'Your roof is showing serious warning signs that warrant immediate professional evaluation. Multiple indicators of structural or waterproofing failure are present. Delaying increases the risk of interior water damage, mould, and escalating repair costs. Please contact a CCB-licensed contractor this week.',
      urgency: 'critical',
      color: '#7F1D1D',
      bg: '#FEF2F2',
      border: '#FCA5A5',
      cta: 'Request Urgent Assessment',
    };
  }
}

export default function RoofChecklistTool() {
  const [answers, setAnswers] = useState<Answers>({});

  const answered = Object.keys(answers).length;
  const total = QUESTIONS.length;
  const allAnswered = answered === total;

  function setAnswer(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function calcScore(): number {
    return QUESTIONS.reduce((sum, q) => {
      const ans = answers[q.id];
      if (!ans) return sum;
      if (q.type === 'select') {
        const opt = q.options?.find((o) => o.value === ans);
        return sum + (opt?.points ?? 0);
      } else {
        return sum + (ans === 'yes' ? (q.yesPoints ?? 0) : (q.noPoints ?? 0));
      }
    }, 0);
  }

  const score = calcScore();
  const result = getResult(score);

  return (
    <section
      className="section-pad"
      style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}
    >
      <div className="content-wrap">
        {/* Header */}
        <div className="mb-8">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              background: '#0066CC',
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              marginBottom: '0.75rem',
            }}
          >
            🏠 Free Tool
          </span>
          <h2
            className="text-2xl sm:text-3xl font-extrabold mb-2"
            style={{ color: '#0F172A' }}
          >
            Does Your Oregon Roof Need Replacing?
          </h2>
          <p className="text-sm" style={{ color: '#64748B' }}>
            Answer 7 quick questions to get an honest assessment — no email required.
          </p>
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-6 mb-8">
          {QUESTIONS.map((q, i) => (
            <div
              key={q.id}
              className="rounded-xl border bg-white p-5"
              style={{ borderColor: answers[q.id] ? '#0066CC' : '#E2E8F0' }}
            >
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: '#0F172A' }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '1.4rem',
                    height: '1.4rem',
                    borderRadius: '50%',
                    background: answers[q.id] ? '#0066CC' : '#E2E8F0',
                    color: answers[q.id] ? '#fff' : '#94A3B8',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    marginRight: '0.5rem',
                  }}
                >
                  {i + 1}
                </span>
                {q.label}
              </p>

              {q.type === 'select' && (
                <div className="flex flex-col gap-2">
                  {q.options?.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setAnswer(q.id, opt.value)}
                      style={{
                        textAlign: 'left',
                        padding: '0.5rem 0.875rem',
                        borderRadius: '0.5rem',
                        border: `1px solid ${
                          answers[q.id] === opt.value ? '#0066CC' : '#E2E8F0'
                        }`,
                        background:
                          answers[q.id] === opt.value ? '#EFF6FF' : '#fff',
                        color:
                          answers[q.id] === opt.value ? '#0066CC' : '#475569',
                        fontSize: '0.85rem',
                        fontWeight: answers[q.id] === opt.value ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {q.type === 'yesno' && (
                <div className="flex gap-3">
                  {['yes', 'no'].map((val) => (
                    <button
                      key={val}
                      onClick={() => setAnswer(q.id, val)}
                      style={{
                        padding: '0.5rem 1.5rem',
                        borderRadius: '0.5rem',
                        border: `1px solid ${
                          answers[q.id] === val ? '#0066CC' : '#E2E8F0'
                        }`,
                        background:
                          answers[q.id] === val ? '#EFF6FF' : '#fff',
                        color:
                          answers[q.id] === val ? '#0066CC' : '#475569',
                        fontSize: '0.85rem',
                        fontWeight: answers[q.id] === val ? 600 : 400,
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        transition: 'all 0.15s',
                      }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1" style={{ color: '#94A3B8' }}>
            <span>{answered} of {total} answered</span>
            {!allAnswered && (
              <span>Answer all questions to see your result</span>
            )}
          </div>
          <div
            style={{
              height: '4px',
              background: '#E2E8F0',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${(answered / total) * 100}%`,
                background: '#0066CC',
                borderRadius: '999px',
                transition: 'width 0.3s',
              }}
            />
          </div>
        </div>

        {/* Result */}
        {allAnswered && (
          <div
            className="rounded-xl border p-6"
            style={{
              background: result.bg,
              borderColor: result.border,
            }}
          >
            <p
              className="text-lg font-extrabold mb-2"
              style={{ color: result.color }}
            >
              {result.verdict}
            </p>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: result.color, opacity: 0.85 }}
            >
              {result.recommendation}
            </p>
            <a
              href="/contact"
              style={{
                display: 'inline-block',
                background: result.urgency === 'low' ? '#166534' : '#DC2626',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 700,
                padding: '0.65rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
              }}
            >
              {result.cta} →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
