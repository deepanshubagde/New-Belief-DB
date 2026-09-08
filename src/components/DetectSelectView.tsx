import React from 'react';
import { ShieldAlert, CheckCircle2, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';

interface DetectSelectViewProps {
  filledPrompts: string[];
  selectedBelief: string;
  customBelief: string;
  onSelectBelief: (val: string) => void;
  onCustomBeliefChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DetectSelectView: React.FC<DetectSelectViewProps> = ({
  filledPrompts,
  selectedBelief,
  customBelief,
  onSelectBelief,
  onCustomBeliefChange,
  onNext,
  onBack,
}) => {
  const activeBelief = selectedBelief || customBelief;
  const canProceed = Boolean(activeBelief.trim());

  return (
    <div id="detect-select-view">
      <div className="text-center">
        <div
          className="phase-badge bg-[var(--detect-glow)] text-[var(--detect)] border border-[rgba(226,109,92,0.3)]"
          id="select-badge"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Stage D1 · Selection</span>
        </div>

        <h2 className="phase-title" id="select-title">
          Identify The Master Lock
        </h2>

        <p className="phase-sub" id="select-sub">
          Which of your responses created the highest inner discomfort, heaviness, or vulnerability? That is the core subconscious belief running your life.
        </p>
      </div>

      <div className="zen-card" id="belief-options-list">
        <div className="section-label text-[var(--detect)] mb-3">
          <span>Candidate Beliefs Excavated</span>
        </div>

        <div className="space-y-2.5">
          {filledPrompts.map((ans, i) => {
            const isSelected = selectedBelief === ans;
            return (
              <div
                key={i}
                id={`belief-option-${i}`}
                className={`belief-option p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-[var(--detect)] bg-[rgba(226,109,92,0.12)] text-[var(--text-primary)]'
                    : 'border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)] hover:border-[var(--border-hover)] text-[var(--text-secondary)]'
                }`}
                onClick={() => onSelectBelief(ans)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectBelief(ans);
                  }
                }}
              >
                <span className="text-[14px] italic">"{ans}"</span>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all flex-shrink-0 ml-3 ${
                    isSelected
                      ? 'border-[var(--detect)] bg-[var(--detect)] text-white'
                      : 'border-[var(--border-subtle)] bg-transparent'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Input */}
        <div className="mt-6 pt-5 border-t border-[var(--border-subtle)]" id="group-custom-belief">
          <label className="field-label text-[var(--text-secondary)]" htmlFor="custom-belief-input">
            OR REFINE / WRITE YOUR SPECIFIC CORE BELIEF
          </label>
          <textarea
            id="custom-belief-input"
            className="field-textarea"
            value={customBelief}
            onChange={(e) => onCustomBeliefChange(e.target.value)}
            placeholder="e.g. If I fully succeed, I will be rejected and abandoned by those I love..."
            rows={2}
          />
        </div>
      </div>

      {/* Detection Rule Box */}
      <div
        className="p-4 rounded-xl bg-[rgba(226,109,92,0.06)] border border-[rgba(226,109,92,0.2)] mb-6 text-left flex items-start gap-3"
        id="detection-rule-card"
      >
        <AlertTriangle className="w-4 h-4 text-[var(--detect)] flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-[11px] font-bold text-[var(--detect)] uppercase tracking-wider mb-0.5">
            The Monkhood Detection Law
          </div>
          <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
            The belief that makes you most uncomfortable to acknowledge is the exact emotional anchor keeping the pattern locked in place. Face it with calm objectivity.
          </div>
        </div>
      </div>

      <button
        id="btn-step-decode"
        className="btn-primary"
        style={{
          background: canProceed
            ? 'linear-gradient(135deg, var(--decode) 0%, #D35400 100%)'
            : undefined,
        }}
        disabled={!canProceed}
        onClick={onNext}
      >
        <span>STEP INTO D2: DECODE ORIGIN</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="text-center mt-4">
        <button id="btn-back-to-prompts" className="btn-ghost" onClick={onBack}>
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Inquiries</span>
        </button>
      </div>
    </div>
  );
};
