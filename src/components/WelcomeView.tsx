import React from 'react';
import { BRAND } from '../data/constants';
import { Sparkles, Clock, ArrowRight, ShieldAlert, Cpu, Flame, CheckCircle2 } from 'lucide-react';

interface WelcomeViewProps {
  onStart: () => void;
}

const STEPS_SUMMARY = [
  {
    num: 'D1',
    title: 'DETECT',
    color: 'var(--detect)',
    bg: 'var(--detect-glow)',
    icon: ShieldAlert,
    desc: 'Unearth the hidden subconscious belief blocking your goal through 12 rapid completion inquiries.',
  },
  {
    num: 'D2',
    title: 'DECODE',
    color: 'var(--decode)',
    bg: 'var(--decode-glow)',
    icon: Cpu,
    desc: 'Trace the first origin memory, source voice, and neurological V.A.K structure keeping it alive.',
  },
  {
    num: 'D3',
    title: 'DISSOLVE',
    color: 'var(--dissolve)',
    bg: 'var(--dissolve-glow)',
    icon: Flame,
    desc: 'Collapse certainty via Socratic inquiry, somatic Pattern Break, and the Thumb Voice Technique.',
  },
  {
    num: 'D4',
    title: 'DESIGN',
    color: 'var(--design)',
    bg: 'var(--design-glow)',
    icon: CheckCircle2,
    desc: 'Craft an empowering "I AM" truth and install it into your subconscious using neurological anchors.',
  },
];

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onStart }) => {
  return (
    <div className="text-center" id="welcome-view">
      {/* Zen Emblem */}
      <div
        className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center bg-[var(--monk-amber-glow)] border border-[rgba(229,154,70,0.3)] shadow-[0_0_25px_rgba(229,154,70,0.15)]"
        id="welcome-icon"
      >
        <Sparkles className="w-8 h-8 text-[var(--monk-amber)]" />
      </div>

      <div
        id="curriculum-tag"
        className="text-[11px] uppercase tracking-[3px] font-semibold text-[var(--monk-amber)] mb-2 font-mono"
      >
        {BRAND.tagline}
      </div>

      <h2
        id="welcome-headline"
        className="phase-title text-3xl font-semibold mb-3 tracking-wide"
      >
        Clear Your Limiting Belief
      </h2>

      <p
        id="welcome-sub"
        className="text-[14px] text-[var(--text-secondary)] mb-7 max-w-md mx-auto"
      >
        A guided neuro-somatic journey designed for {BRAND.name} members to dissolve subconscious blocks and unlock unwavering certainty.
      </p>

      {/* 4 Pillars Card */}
      <div className="zen-card text-left" id="info-card-steps">
        <div className="section-label text-[var(--monk-amber)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The 4-Stage Protocol</span>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-4">
          {STEPS_SUMMARY.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-all"
                id={`step-row-${step.num.toLowerCase()}`}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-[12px] flex-shrink-0"
                  style={{
                    background: step.bg,
                    color: step.color,
                    border: `1px solid ${step.color}40`,
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <div className="text-[13px] font-bold tracking-wider mb-1 flex items-center gap-2">
                    <span style={{ color: step.color }}>{step.title}</span>
                  </div>
                  <div className="text-[12.5px] text-[var(--text-secondary)] leading-relaxed">
                    {step.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quote */}
      <div
        className="p-4 px-5 rounded-xl bg-[rgba(229,154,70,0.04)] border-l-2 border-[var(--monk-amber)] mb-6 text-left"
        id="welcome-quote"
      >
        <p className="text-[14px] text-[var(--text-primary)] italic font-medium leading-relaxed">
          "A belief is just a thought you kept thinking until it felt like truth. Today, in stillness and awareness, you choose your new truth."
        </p>
      </div>

      <div
        id="time-estimate"
        className="inline-flex items-center gap-1.5 text-[12px] text-[var(--text-muted)] mb-5"
      >
        <Clock className="w-3.5 h-3.5 text-[var(--monk-amber)]" />
        <span>Estimated duration: 15 to 20 focused minutes</span>
      </div>

      <button
        id="btn-begin-clearing"
        className="btn-primary"
        onClick={onStart}
      >
        <span>BEGIN MY CLEARING JOURNEY</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] text-[11px] tracking-[1.5px] text-[var(--text-muted)] uppercase">
        {BRAND.name} · {BRAND.author}
      </div>
    </div>
  );
};
