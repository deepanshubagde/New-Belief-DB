import React from 'react';
import { DecodeData } from '../types';
import { Cpu, Eye, Volume2, Activity, ArrowRight, ArrowLeft, History, UserCheck } from 'lucide-react';

interface DecodeViewProps {
  activeBelief: string;
  decodeData: DecodeData;
  intensityBefore: number;
  onUpdateDecode: (key: keyof DecodeData, val: string) => void;
  onSetIntensityBefore: (val: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DecodeView: React.FC<DecodeViewProps> = ({
  activeBelief,
  decodeData,
  intensityBefore,
  onUpdateDecode,
  onSetIntensityBefore,
  onNext,
  onBack,
}) => {
  const getIntClass = (n: number, val: number) => {
    if (n !== val) return 'int-btn';
    if (val <= 3) return 'int-btn active-low';
    if (val <= 6) return 'int-btn active-mid';
    return 'int-btn active-high';
  };

  const canProceed = intensityBefore > 0;

  const getIntensityDescription = (n: number) => {
    if (n === 0) return 'Select the current emotional intensity of this belief:';
    if (n <= 3) return `Intensity ${n}/10: Mild subconscious doubt — easily dismantled.`;
    if (n <= 6) return `Intensity ${n}/10: Moderate emotional attachment — active subconscious script.`;
    if (n <= 8) return `Intensity ${n}/10: Heavy conviction — deeply embedded somatic pattern.`;
    return `Intensity ${n}/10: Maximum visceral grip — defining identity filter.`;
  };

  return (
    <div id="decode-view">
      <div className="text-center">
        <div
          className="phase-badge bg-[var(--decode-glow)] text-[var(--decode)] border border-[rgba(229,168,75,0.3)]"
          id="decode-badge"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Stage D2 · Decode</span>
        </div>

        <h2 className="phase-title" id="decode-title">
          Deconstruct the Neurological Code
        </h2>

        <p className="phase-sub" id="decode-sub">
          A subconscious belief is not truth; it is merely an encoded memory pattern made of pictures (V), sounds (A), and sensations (K).
        </p>
      </div>

      {/* Active Belief Reminder Banner */}
      <div
        className="p-3.5 px-4 rounded-xl bg-[rgba(226,109,92,0.08)] border border-[rgba(226,109,92,0.25)] mb-6 text-left flex items-start gap-3"
        id="active-belief-banner"
      >
        <span className="text-[var(--detect)] font-bold text-[11px] uppercase tracking-wider block mt-0.5">
          Belief:
        </span>
        <span className="text-[var(--text-primary)] italic font-medium text-[14px]">
          "{activeBelief}"
        </span>
      </div>

      {/* Origin Archeology */}
      <div className="zen-card text-left">
        <div className="section-label text-[var(--decode)] mb-4">
          <History className="w-3.5 h-3.5" />
          <span>1. Subconscious Archeology (Origin)</span>
        </div>

        <div className="field-group" id="group-decode-when">
          <label className="field-label" htmlFor="decode-when">
            When was the first time you believed this was true? (Earliest memory or formative event)
          </label>
          <textarea
            id="decode-when"
            className="field-textarea"
            value={decodeData.when}
            onChange={(e) => onUpdateDecode('when', e.target.value)}
            placeholder="e.g. Age 8 in school during exam failure, or overhearing parents arguing about money..."
            rows={2}
          />
        </div>

        <div className="field-group mb-0" id="group-decode-whose">
          <label className="field-label flex items-center gap-1.5" htmlFor="decode-whose">
            <UserCheck className="w-3.5 h-3.5 text-[var(--decode)]" />
            <span>Whose voice or authority first implanted this thought?</span>
          </label>
          <input
            id="decode-whose"
            className="field-input"
            value={decodeData.whose}
            onChange={(e) => onUpdateDecode('whose', e.target.value)}
            placeholder="e.g. Father, critical teacher, childhood peer, collective culture..."
          />
        </div>
      </div>

      {/* Neurological V.A.K Blueprint */}
      <div className="zen-card text-left">
        <div className="section-label text-[var(--decode)] mb-4">
          <Activity className="w-3.5 h-3.5" />
          <span>2. V.A.K Sensory Structure (How it survives)</span>
        </div>

        <div className="field-group" id="group-decode-v">
          <label className="field-label flex items-center gap-1.5" htmlFor="decode-v">
            <Eye className="w-3.5 h-3.5 text-[var(--decode)]" />
            <span>VISUAL (V): What mental picture or movie plays when this triggers?</span>
          </label>
          <textarea
            id="decode-v"
            className="field-textarea"
            value={decodeData.v}
            onChange={(e) => onUpdateDecode('v', e.target.value)}
            placeholder="Is it dim or bright? Frozen image or moving film? Where is it placed in your mental space?"
            rows={2}
          />
        </div>

        <div className="field-group" id="group-decode-a">
          <label className="field-label flex items-center gap-1.5" htmlFor="decode-a">
            <Volume2 className="w-3.5 h-3.5 text-[var(--decode)]" />
            <span>AUDITORY (A): What exact internal voice or tone repeats the phrase?</span>
          </label>
          <textarea
            id="decode-a"
            className="field-textarea"
            value={decodeData.a}
            onChange={(e) => onUpdateDecode('a', e.target.value)}
            placeholder="e.g. A stern, disappointed whisper; loud harsh criticism; your own anxious voice..."
            rows={2}
          />
        </div>

        <div className="field-group mb-0" id="group-decode-k">
          <label className="field-label flex items-center gap-1.5" htmlFor="decode-k">
            <Activity className="w-3.5 h-3.5 text-[var(--decode)]" />
            <span>KINAESTHETIC (K): Where in your physical body is this sensation anchored?</span>
          </label>
          <input
            id="decode-k"
            className="field-input"
            value={decodeData.kLocation}
            onChange={(e) => onUpdateDecode('kLocation', e.target.value)}
            placeholder="e.g. Tight knot in solar plexus, constriction in throat, heaviness across chest..."
          />
        </div>
      </div>

      {/* Baseline Intensity Bar */}
      <div className="zen-card text-center">
        <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-1">
          Initial Belief Grip Rating (1 – 10)
        </div>
        <div className="text-[12px] text-[var(--text-secondary)] mb-4">
          {getIntensityDescription(intensityBefore)}
        </div>

        <div className="intensity-bar" id="intensity-before-bar">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <button
              key={n}
              id={`intensity-before-${n}`}
              className={getIntClass(n, intensityBefore)}
              onClick={() => onSetIntensityBefore(n)}
              type="button"
            >
              {n}
            </button>
          ))}
        </div>

        <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono px-1">
          <span>1 = Faint Doubt</span>
          <span>5 = Moderate</span>
          <span>10 = Visceral Certainty</span>
        </div>
      </div>

      <button
        id="btn-step-dissolve"
        className="btn-primary"
        style={{
          background: canProceed
            ? 'linear-gradient(135deg, var(--dissolve) 0%, #6C3483 100%)'
            : undefined,
        }}
        disabled={!canProceed}
        onClick={onNext}
      >
        <span>STEP INTO D3: DISSOLVE STRUCTURE</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="text-center mt-4">
        <button id="btn-back-to-select" className="btn-ghost" onClick={onBack}>
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Belief Selection</span>
        </button>
      </div>
    </div>
  );
};
