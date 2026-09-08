import React from 'react';
import { Target, User, ArrowRight, ArrowLeft, Compass } from 'lucide-react';

interface GoalViewProps {
  name: string;
  goal: string;
  onNameChange: (val: string) => void;
  onGoalChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const GoalView: React.FC<GoalViewProps> = ({
  name,
  goal,
  onNameChange,
  onGoalChange,
  onNext,
  onBack,
}) => {
  const isEnabled = goal.trim().length > 0;

  return (
    <div className="text-center" id="goal-view">
      <div
        className="phase-badge bg-[rgba(229,154,70,0.1)] text-[var(--monk-amber)] border border-[rgba(229,154,70,0.25)]"
        id="goal-phase-badge"
      >
        <Compass className="w-3.5 h-3.5" />
        <span>Stage 0 · Grounding</span>
      </div>

      <h2 className="phase-title" id="goal-phase-title">
        Anchor Your Sacred Goal
      </h2>

      <p className="phase-sub" id="goal-phase-sub">
        Every limiting belief only exists in opposition to a meaningful goal. Define the objective you are ready to manifest.
      </p>

      <div className="zen-card text-left">
        <div className="field-group" id="group-name">
          <label className="field-label flex items-center gap-1.5" htmlFor="input-name">
            <User className="w-3.5 h-3.5 text-[var(--monk-amber)]" />
            <span>PRACTITIONER NAME</span>
          </label>
          <input
            id="input-name"
            className="field-input"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter your name..."
          />
        </div>

        <div className="field-group mb-2" id="group-goal">
          <label className="field-label flex items-center gap-1.5" htmlFor="input-goal">
            <Target className="w-3.5 h-3.5 text-[var(--monk-amber)]" />
            <span>THE TARGET GOAL</span>
          </label>
          <textarea
            id="input-goal"
            className="field-textarea"
            value={goal}
            onChange={(e) => onGoalChange(e.target.value)}
            placeholder="e.g. Build my conscious enterprise to $100k/month, speak on global stages, find deep emotional harmony..."
            rows={3}
          />
        </div>

        <div className="p-3.5 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--border-subtle)] text-[12px] text-[var(--text-secondary)] leading-relaxed">
          <span className="font-semibold text-[var(--monk-amber)]">Monkhood Guideline:</span> Be specific and ambitious. The deeper the goal matters to you, the clearer the subconscious resistance will reveal itself in Step 1.
        </div>
      </div>

      <button
        id="btn-step-detect"
        className="btn-primary"
        disabled={!isEnabled}
        onClick={onNext}
        style={{
          background: isEnabled
            ? 'linear-gradient(135deg, var(--detect) 0%, #C0392B 100%)'
            : undefined,
        }}
      >
        <span>STEP INTO D1: DETECT BELIEF</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="mt-4">
        <button
          id="btn-back-to-welcome"
          className="btn-ghost"
          onClick={onBack}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Overview</span>
        </button>
      </div>
    </div>
  );
};
