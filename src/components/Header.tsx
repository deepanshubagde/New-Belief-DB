import React from 'react';
import { Phase } from '../types';
import { BRAND } from '../data/constants';
import { Sparkles, Check } from 'lucide-react';

interface HeaderProps {
  phase: Phase;
  currentStep: number;
  onSelectStep?: (phase: Phase) => void;
}

const STEPS = [
  { num: 1, label: 'Detect', phase: Phase.DETECT_PROMPTS },
  { num: 2, label: 'Decode', phase: Phase.DECODE },
  { num: 3, label: 'Dissolve', phase: Phase.DISSOLVE_LOGIC },
  { num: 4, label: 'Design', phase: Phase.DESIGN },
];

export const Header: React.FC<HeaderProps> = ({ phase, currentStep, onSelectStep }) => {
  const showProgress = phase >= Phase.GOAL && phase <= Phase.COMPLETE;

  return (
    <header className="app-header" id="app-header">
      <div className="header-container">
        <div className="brand-badge" id="brand-tagline">
          <Sparkles className="w-3.5 h-3.5 text-[var(--monk-amber)]" />
          <span>{BRAND.name}</span>
        </div>

        <div className="text-center">
          <h1 className="brand-title" id="main-heading">
            {BRAND.methodTitle}
          </h1>
          <p className="brand-sub" id="header-sub">
            {BRAND.methodSubtitle} · by {BRAND.author}
          </p>
        </div>

        {showProgress && (
          <nav className="stepper-nav" id="step-progress-bar" aria-label="Belief Clearing Progress">
            {STEPS.map((s) => {
              const isDone = currentStep > s.num;
              const isActive = currentStep === s.num;
              const isClickable = Boolean(onSelectStep && (isDone || isActive));

              let statusClass = '';
              if (isDone) statusClass = 'done';
              else if (isActive) statusClass = 'active';

              return (
                <button
                  type="button"
                  key={s.num}
                  id={`step-nav-btn-${s.num}`}
                  className={`step-item ${statusClass} ${isClickable ? 'clickable' : ''}`}
                  onClick={() => {
                    if (isClickable && onSelectStep) {
                      onSelectStep(s.phase);
                    }
                  }}
                  disabled={!isClickable}
                  title={`Step ${s.num}: ${s.label}`}
                >
                  <div className="step-indicator" id={`step-indicator-${s.num}`}>
                    {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : `0${s.num}`}
                  </div>
                  <span className="step-label">D{s.num}: {s.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};
