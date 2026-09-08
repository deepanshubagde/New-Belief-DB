import React from 'react';
import { DESIGN_RULES } from '../data/constants';
import { DesignVAK } from '../types';
import { CheckCircle2, Eye, Volume2, Heart, ArrowRight, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

interface DesignViewProps {
  newBelief: string;
  designVAK: DesignVAK;
  onNewBeliefChange: (val: string) => void;
  onUpdateDesignVAK: (key: keyof DesignVAK, val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DesignView: React.FC<DesignViewProps> = ({
  newBelief,
  designVAK,
  onNewBeliefChange,
  onUpdateDesignVAK,
  onNext,
  onBack,
}) => {
  const canProceed = newBelief.trim().length > 0;

  return (
    <div id="design-view">
      <div className="text-center">
        <div
          className="phase-badge bg-[var(--design-glow)] text-[var(--design)] border border-[rgba(54,179,126,0.3)]"
          id="design-badge"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Stage D4 · Design & Install</span>
        </div>

        <h2 className="phase-title" id="design-title">
          Forge Your New Sovereign Truth
        </h2>

        <p className="phase-sub" id="design-sub">
          The subconscious mind cannot remain empty. You must install a radiant, neurologically fortified identity to replace the old conditioning.
        </p>
      </div>

      {/* The 5 Rules of Neurological Installation */}
      <div className="zen-card text-left mb-6">
        <div className="section-label text-[var(--design)] mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>The 5 Laws of Subconscious Installation</span>
        </div>

        <div className="space-y-2.5" id="design-rules-list">
          {DESIGN_RULES.map((r, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-[rgba(54,179,126,0.03)] border border-[rgba(54,179,126,0.15)] flex items-start gap-2.5"
              id={`rule-card-${i}`}
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[var(--design-glow)] text-[var(--design)] font-bold text-[11px] flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <div className="text-[13px] font-bold text-[var(--design)]">
                  {r.title}
                </div>
                <div className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                  {r.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The New Empowering Belief Input */}
      <div className="zen-card text-left border-l-4 border-l-[var(--design)] mb-6" id="group-new-belief">
        <label className="field-label text-[var(--design)] flex items-center gap-1.5" htmlFor="input-new-belief">
          <Sparkles className="w-3.5 h-3.5 text-[var(--design)]" />
          <span>YOUR MASTER AFFIRMATION (Declare as Present "I AM...")</span>
        </label>
        <textarea
          id="input-new-belief"
          className="field-textarea text-[16px] font-medium text-[var(--design)] border-[rgba(54,179,126,0.3)] bg-[rgba(54,179,126,0.04)]"
          value={newBelief}
          onChange={(e) => onNewBeliefChange(e.target.value)}
          placeholder="I am deeply worthy of monumental success, peace, and abundance as I elevate those around me..."
          rows={3}
        />
        <div className="text-[11.5px] text-[var(--text-secondary)] mt-2 italic">
          Keep it in present tense, positively framed, emotionally vibrant, and visceral.
        </div>
      </div>

      {/* V.A.K Installation */}
      <div className="zen-card text-left mb-6">
        <div className="section-label text-[var(--design)] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sensory Neurological Anchoring</span>
        </div>

        <div className="field-group" id="group-design-v">
          <label className="field-label flex items-center gap-1.5" htmlFor="design-v">
            <Eye className="w-3.5 h-3.5 text-[var(--design)]" />
            <span>VISUAL (V): What cinema plays in your mind as you live this truth?</span>
          </label>
          <textarea
            id="design-v"
            className="field-textarea"
            value={designVAK.v}
            onChange={(e) => onUpdateDesignVAK('v', e.target.value)}
            placeholder="See yourself standing tall, radiant, surrounded by abundance and stillness..."
            rows={2}
          />
        </div>

        <div className="field-group" id="group-design-a">
          <label className="field-label flex items-center gap-1.5" htmlFor="design-a">
            <Volume2 className="w-3.5 h-3.5 text-[var(--design)]" />
            <span>AUDITORY (A): How does your own grounded, calm voice speak this truth?</span>
          </label>
          <textarea
            id="design-a"
            className="field-textarea"
            value={designVAK.a}
            onChange={(e) => onUpdateDesignVAK('a', e.target.value)}
            placeholder="Resonant, unwavering, quiet confidence, peaceful clarity..."
            rows={2}
          />
        </div>

        <div className="field-group mb-0" id="group-design-k">
          <label className="field-label flex items-center gap-1.5" htmlFor="design-k">
            <Heart className="w-3.5 h-3.5 text-[var(--design)]" />
            <span>KINAESTHETIC (K): Where does the expansive physical feeling ignite?</span>
          </label>
          <textarea
            id="design-k"
            className="field-textarea"
            value={designVAK.k}
            onChange={(e) => onUpdateDesignVAK('k', e.target.value)}
            placeholder="Chest opening wide, grounded warmth through the spine, ease in the belly..."
            rows={2}
          />
        </div>
      </div>

      <button
        id="btn-complete-transformation"
        className="btn-primary"
        style={{
          background: canProceed
            ? 'linear-gradient(135deg, var(--monk-amber) 0%, var(--monk-amber-dark) 100%)'
            : undefined,
        }}
        disabled={!canProceed}
        onClick={onNext}
      >
        <span>SEAL & COMPLETE TRANSFORMATION</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="text-center mt-4">
        <button id="btn-back-to-release" className="btn-ghost" onClick={onBack}>
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Somatic Release</span>
        </button>
      </div>
    </div>
  );
};
