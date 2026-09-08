import React from 'react';
import { PROMPTS } from '../data/constants';
import { Target, ShieldAlert, ArrowRight, ArrowLeft, Zap } from 'lucide-react';

interface DetectPromptsViewProps {
  goal: string;
  answers: Record<string, string>;
  onAnswerChange: (key: string, val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DetectPromptsView: React.FC<DetectPromptsViewProps> = ({
  goal,
  answers,
  onAnswerChange,
  onNext,
  onBack,
}) => {
  const filledCount = Object.values(answers).filter(
    (val) => typeof val === 'string' && val.trim().length > 0
  ).length;
  const canProceed = filledCount >= 3;

  return (
    <div id="detect-prompts-view">
      <div className="text-center">
        <div
          className="phase-badge bg-[var(--detect-glow)] text-[var(--detect)] border border-[rgba(226,109,92,0.3)]"
          id="detect-badge"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Stage D1 · Detect</span>
        </div>

        <h2 className="phase-title" id="detect-title">
          Unearth the Hidden Block
        </h2>

        <p className="phase-sub" id="detect-sub">
          Complete each sentence instantaneously. Do not pause to filter or intellectualize. Your first instinctive impulse is the subconscious truth.
        </p>
      </div>

      {/* Goal Anchor Callout */}
      <div
        className="p-3.5 px-4 rounded-xl bg-[rgba(229,154,70,0.06)] border border-[rgba(229,154,70,0.2)] mb-6 text-left flex items-start gap-3"
        id="goal-reminder-box"
      >
        <Target className="w-4 h-4 text-[var(--monk-amber)] flex-shrink-0 mt-0.5" />
        <div className="text-[13px]">
          <span className="font-bold text-[var(--monk-amber)] block text-[11px] uppercase tracking-wider mb-0.5">
            Active Target Goal
          </span>
          <span className="text-[var(--text-primary)]">{goal}</span>
        </div>
      </div>

      {/* Prompt Groups */}
      {PROMPTS.map((group, gi) => (
        <div key={group.cat} className="mb-6 zen-card" id={`prompt-group-${gi}`}>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[var(--detect)]" />
              <span className="text-[11px] font-bold tracking-[2px] text-[var(--detect)] uppercase">
                {group.cat}
              </span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] font-mono">
              Inquiry Group 0{gi + 1}
            </span>
          </div>

          <div className="space-y-3">
            {group.prompts.map((p, pi) => {
              const key = `${gi}-${pi}`;
              const hasValue = Boolean(answers[key]?.trim());

              return (
                <div
                  key={key}
                  className={`prompt-card ${hasValue ? 'border-[rgba(226,109,92,0.3)] bg-[rgba(226,109,92,0.02)]' : ''}`}
                  id={`card-prompt-${key}`}
                >
                  <div className="prompt-text font-medium text-[var(--text-primary)]">
                    "{p}"
                  </div>
                  <input
                    id={`input-prompt-${key}`}
                    className="prompt-input"
                    value={answers[key] || ''}
                    onChange={(e) => onAnswerChange(key, e.target.value)}
                    placeholder="Complete immediately without editing..."
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Action and Feedback */}
      <div className="zen-card p-4 text-center mt-6">
        <div className="flex items-center justify-between text-[12px] mb-3 font-mono">
          <span className="text-[var(--text-secondary)]">Excavation Progress</span>
          <span className={filledCount >= 3 ? 'text-[var(--design)] font-bold' : 'text-[var(--monk-amber)]'}>
            {filledCount} of 12 Prompts Completed ({Math.max(0, 3 - filledCount)} more needed to unlock)
          </span>
        </div>
        <div className="w-full h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-[var(--detect)] transition-all duration-300"
            style={{ width: `${Math.min(100, (filledCount / 12) * 100)}%` }}
          />
        </div>

        <button
          id="btn-select-core-belief"
          className="btn-primary"
          style={{
            background: canProceed
              ? 'linear-gradient(135deg, var(--detect) 0%, #C0392B 100%)'
              : undefined,
          }}
          disabled={!canProceed}
          onClick={onNext}
        >
          <span>SELECT MY CORE LIMITING BELIEF</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="text-center mt-4">
        <button id="btn-back-to-goal" className="btn-ghost" onClick={onBack}>
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Goal</span>
        </button>
      </div>
    </div>
  );
};
