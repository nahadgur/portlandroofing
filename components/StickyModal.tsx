'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import LeadForm from './LeadForm';

function capitalize(str: string): string {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getLabel(pathname: string): string {
  if (pathname === '/or-cost-index') return 'Calculate My Cost';
  const cityMatch = pathname.match(/^\/oregon\/([^/]+)$/);
  if (cityMatch) return `Find ${capitalize(cityMatch[1])} Roofers`;
  const serviceCityMatch = pathname.match(/^\/([^/]+)\/([^/]+)$/);
  if (serviceCityMatch && serviceCityMatch[1] !== 'oregon')
    return `Get ${capitalize(serviceCityMatch[1])} Quotes`;
  return 'Get Free Quote';
}

function getSource(pathname: string): string {
  if (pathname === '/') return 'homepage';
  return pathname.replace(/^\//, '').replace(/\//g, '_') || 'website';
}

export default function StickyModal() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const isHomepage = pathname === '/';

  const label = getLabel(pathname);
  const source = getSource(pathname);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollPercent >= 0.25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = useCallback(() => {
    setOpen(true);
    (document.activeElement as HTMLElement)?.blur();
    requestAnimationFrame(() => modalContentRef.current?.scrollTo(0, 0));
  }, []);

  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeModal]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!visible) return null;

  return (
    <>
      {/* ── Sticky Trigger ── */}
      <div
        className={`fixed bottom-0 z-40 ${isHomepage ? 'md:hidden' : ''}`}
        style={{ left: 0, right: 0, animation: 'slideUp 0.35s cubic-bezier(0.4,0,0.2,1) both' }}
      >
        {/* Mobile — full-width bar */}
        <button
          type="button"
          onClick={openModal}
          className="w-full md:hidden text-white font-semibold text-sm"
          style={{
            background: '#0066CC',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.02em',
          }}
        >
          <span
            style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#4ADE80', display: 'inline-block',
              boxShadow: '0 0 0 3px rgba(74,222,128,0.3)',
              flexShrink: 0,
            }}
          />
          {label}
          <span style={{ marginLeft: 4, opacity: 0.7 }}>→</span>
        </button>

        {/* Desktop — floating button bottom-right */}
        {!isHomepage && (
          <button
            type="button"
            onClick={openModal}
            className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2 text-white font-semibold text-sm"
            style={{
              background: '#0066CC',
              borderRadius: 10,
              padding: '12px 20px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(0,102,204,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 8px 32px rgba(0,102,204,0.45)';
              el.style.background = '#0052a3';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = '';
              el.style.boxShadow = '0 4px 24px rgba(0,102,204,0.35)';
              el.style.background = '#0066CC';
            }}
          >
            <span
              style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#4ADE80',
                boxShadow: '0 0 0 3px rgba(74,222,128,0.3)',
                flexShrink: 0,
              }}
            />
            {label}
          </button>
        )}
      </div>

      {/* ── Modal ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Request a roofing quote"
          style={{ animation: 'fadeIn 0.25s both' }}
        >
          {/* Backdrop */}
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(15,23,42,0.7)',
              backdropFilter: 'blur(4px)',
            }}
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal card */}
          <div
            ref={modalContentRef}
            style={{
              position: 'relative', zIndex: 10,
              width: '100%', maxWidth: 420,
              maxHeight: '90vh', overflowY: 'auto',
              borderRadius: 16,
              background: '#fff',
              boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
              animation: 'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              style={{
                position: 'absolute', top: 12, right: 12, zIndex: 20,
                width: 32, height: 32, borderRadius: '50%',
                border: '1.5px solid #E2E8F0',
                background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: '#94A3B8',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#F8FAFC';
                el.style.borderColor = '#CBD5E1';
                el.style.color = '#0F172A';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#fff';
                el.style.borderColor = '#E2E8F0';
                el.style.color = '#94A3B8';
              }}
            >
              <X size={16} />
            </button>

            <div style={{ padding: 4 }}>
              <LeadForm source={source} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
