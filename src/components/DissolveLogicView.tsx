import React from 'react';
import { LOGIC_QS } from '../data/constants';
import { Flame, ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react';

interface DissolveLogicViewProps {
  activeBelief: string;
  intensityBefore: number;
  logicAnswers: Record<number, string>;
  onUpdateLogic: (index: number, val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DissolveLogicView: React.FC<DissolveLogicViewProps> = ({
  activeBelief,
  intensityBefore,
  logicAnswers,
  onUpdateLogic,
  onNext,
  onBack,
}) => {
  return (
    <div id="dissolve-logic-view">
      <div className="text-center">
        <div
          className="phase-badge bg-[var(--dissolve-glow)] text-[var(--dissolve)] border border-[rgba(157,113,232,0.3)]"
          id="dissolve-badge"
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Stage D3 · Part 1: Cognitive Invalidation</span>
        </div>

        <h2 className="phase-title" id="dissolve-title">
          Dismantle The Illusion of Truth
        </h2>

        <p className="phase-sub" id="dissolve-sub">
          A limiting belief maintains power solely through unquestioned certainty. Use Socratic deconstruction to collapse its logical foundation.
        </p>
      </div>

      {/* Active Belief Reminder Banner */}
      <div
        className="p-3.5 px-4 rounded-xl bg-[rgba(157,113,232,0.08)] border border-[rgba(157,113,232,0.25)] mb-6 text-left flex items-start justify-between gap-3"
        id="dissolve-belief-banner"
      >
        <div>
          <span className="text-[var(--dissolve)] font-bold text-[11px] uppercase tracking-wider block mb-0.5">
            Active Target for Dissolution
          </span>
          <span className="text-[var(--text-primary)] italic font-medium text-[14px]">
            "{activeBelief}"
          </span>
        </div>
        <div className="px-2.5 py-1 rounded-md bg-[rgba(255,255,255,0.04)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)] whitespace-nowrap">
          Base: {intensityBefore}/10
        </div>
      </div>

      {/* 5 Inquiry Questions */}
      <div className="space-y-4" id="logic-questions-container">
        {LOGIC_QS.map((q, i) => (
          <div
            key={i}
            className="zen-card text-left p-5"
            id={`q-card-${i}`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[var(--dissolve-glow)] text-[var(--dissolve)] font-bold text-[12px] flex-shrink-0 mt-0.5 border border-[rgba(157,113,232,0.3)]">
                {i + 1}
              </div>
              <div className="text-[14px] font-semibold text-[var(--text-primary)] leading-snug">
                {q}
              </div>
            </div>
            <textarea
              id={`input-logic-${i}`}
              className="field-textarea text-[13.5px]"
              value={logicAnswers[i] || ''}
              onChange={(e) => onUpdateLogic(i, e.target.value)}
              placeholder="Reflect deeply and record your raw insight..."
              rows={2}
            />
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-subtle)] text-[12.5px] text-[var(--text-secondary)] mb-6 text-left flex items-center gap-2.5">
        <HelpCircle className="w-4 h-4 text-[var(--dissolve)] flex-shrink-0" />
        <span>Insight: Once the intellect accepts that the belief is neither 100% true nor serving your survival, your nervous system is ready for somatic release.</span>
      </div>

      <button
        id="btn-now-release-body"
        className="btn-primary"
        style={{
          background: 'linear-gradient(135deg, var(--dissolve) 0%, #6C3483 100%)',
        }}
        onClick={onNext}
      >
        <span>PROCEED TO SOMATIC & PATTERN RELEASE</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="text-center mt-4">
        <button id="btn-back-to-decode" className="btn-ghost" onClick={onBack}>
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to D2: Decode</span>
        </button>
      </div>
    </div>
  );
};
