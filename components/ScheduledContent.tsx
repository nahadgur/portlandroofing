'use client';

interface ScheduledContentProps {
  children: React.ReactNode;
  showFrom?: string; // ISO date string e.g. "2026-04-08"
  showUntil?: string; // ISO date string e.g. "2026-04-15"
}

export default function ScheduledContent({
  children,
  showFrom,
  showUntil,
}: ScheduledContentProps) {
  const now = new Date();

  if (showFrom && now < new Date(showFrom)) return null;
  if (showUntil && now >= new Date(showUntil)) return null;

  return <>{children}</>;
}
