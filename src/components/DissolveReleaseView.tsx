import React, { useState, useEffect } from 'react';
import { DecodeData } from '../types';
import { Flame, Wind, VolumeX, Timer, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

interface DissolveReleaseViewProps {
  decodeData: DecodeData;
  intensityBefore: number;
  intensityAfter: number;
  onSetIntensityAfter: (val: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DissolveReleaseView: React.FC<DissolveReleaseViewProps> = ({
  decodeData,
  intensityBefore,
  intensityAfter,
  onSetIntensityAfter,
  onNext,
  onBack,
}) => {
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timerSeconds !== null && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const handleStartTimer = (seconds: number) => {
    setTimerSeconds(seconds);
    setTimerActive(true);
  };

  const getIntClass = (n: number, val: number) => {
    if (n !== val) return 'int-btn';
    if (val <= 3) return 'int-btn active-low';
    if (val <= 6) return 'int-btn active-mid';
    return 'int-btn active-high';
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div id="dissolve-release-view">
      <div className="text-center">
        <div
          className="phase-badge bg-[var(--dissolve-glow)] text-[var(--dissolve)] border border-[rgba(157,113,232,0.3)]"
          id="dissolve-release-badge"
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Stage D3 · Part 2: Somatic Release</span>
        </div>

        <h2 className="phase-title" id="dissolve-release-title">
          Release the Somatic & Audio Anchors
        </h2>

        <p className="phase-sub" id="dissolve-release-sub">
          The intellect is unburdened. Now systematically extract the physical tension from your body and collapse the inner critical voice.
        </p>
      </div>

      {/* Technique 1: Somatic Extraction */}
      <div className="zen-card text-left border-l-4 border-l-[var(--detect)] mb-4" id="card-pattern-break">
        <div className="flex items-center gap-2 text-[var(--detect)] font-bold text-[12px] tracking-[1.5px] uppercase mb-2">
          <Wind className="w-4 h-4" />
          <span>Technique 1 · Pattern Break: The Somatic Extraction (K)</span>
        </div>
        <p className="text-[13.5px] text-[var(--text-secondary)] leading-relaxed mb-3">
          Close your eyes. Inwardly locate the exact physical sensation of this belief anchored at{' '}
          <strong className="text-[var(--detect)]">
            {decodeData.kLocation || 'your body center'}
          </strong>
          . Give that density a color and tactile shape. Now reach out with both hands, gently grasp that shape, and pull it completely out of your body. Fling it skyward and watch it evaporate into cosmic dust. Repeat 3 times with a deep, audible exhale.
        </p>
      </div>

      {/* Technique 2: Thumb Ridicule */}
      <div className="zen-card text-left border-l-4 border-l-[var(--dissolve)] mb-4" id="card-thumb-technique">
        <div className="flex items-center gap-2 text-[var(--dissolve)] font-bold text-[12px] tracking-[1.5px] uppercase mb-2">
          <VolumeX className="w-4 h-4" />
          <span>Technique 2 · The Thumb Technique: Voice Deflation (A)</span>
        </div>
        <p className="text-[13.5px] text-[var(--text-secondary)] leading-relaxed mb-3">
          Take the auditory voice of{' '}
          <strong className="text-[var(--dissolve)]">
            {decodeData.whose || 'the original critic'}
          </strong>{' '}
          that whispers this phrase. Mentally transport the speaker from inside your skull, moving down your shoulder, down your arm, and into the tip of your left thumb. Shrink that voice down to a tiny, high-pitched helium cartoon character. Laugh at it. Strip away its false authority completely.
        </p>
      </div>

      {/* Somatic Timer Card */}
      <div className="zen-card text-center p-5 mb-5" id="practice-guide-box">
        <div className="flex items-center justify-center gap-2 text-[var(--text-secondary)] text-[13px] mb-3">
          <Timer className="w-4 h-4 text-[var(--monk-amber)]" />
          <span>Practice both releases for 2 minutes to allow neuro-somatic integration:</span>
        </div>

        {timerSeconds === null ? (
          <button
            type="button"
            className="btn-ghost py-2 px-4 text-[12px]"
            onClick={() => handleStartTimer(120)}
          >
            <Timer className="w-3.5 h-3.5 text-[var(--monk-amber)]" />
            <span>Begin 2-Minute Somatic Practice Timer</span>
          </button>
        ) : (
          <div className="flex items-center justify-center gap-4 py-1">
            <div className="font-mono text-[18px] font-bold text-[var(--monk-amber)]">
              {timerSeconds > 0 ? `Time: ${formatTime(timerSeconds)}` : 'Practice Completed ✦'}
            </div>
            <button
              type="button"
              className="btn-ghost text-[11px] py-1 px-2.5"
              onClick={() => {
                setTimerActive(false);
                setTimerSeconds(null);
              }}
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>

      {/* Post-Release Intensity Rating */}
      <div className="zen-card text-center mb-6">
        <div className="text-[13.5px] font-semibold text-[var(--text-primary)] mb-1">
          Post-Release Intensity Check (1 – 10)
        </div>
        <p className="text-[12px] text-[var(--text-secondary)] mb-4">
          Tune back into the belief right now. How intense does the emotional grip feel now?
        </p>

        <div className="intensity-bar" id="intensity-after-bar">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <button
              key={n}
              id={`intensity-after-${n}`}
              className={getIntClass(n, intensityAfter)}
              onClick={() => onSetIntensityAfter(n)}
              type="button"
            >
              {n}
            </button>
          ))}
        </div>

        {intensityAfter > 0 && intensityBefore > 0 && (
          <div
            className="p-3.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-subtle)] text-[13px] text-center"
            id="intensity-shift-feedback"
          >
            {intensityAfter < intensityBefore ? (
              <div className="text-[var(--design)] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  Belief dropped from <strong>{intensityBefore}</strong> to <strong>{intensityAfter}</strong>! Subconscious charge neutralized.
                </span>
              </div>
            ) : (
              <div className="text-[var(--decode)]">
                Still registering at {intensityAfter}. This is normal for foundational identity memories. The neurological de-linking has begun. Continue to D4 to overwrite the neural circuit.
              </div>
            )}
          </div>
        )}
      </div>

      <button
        id="btn-step-design"
        className="btn-primary"
        style={{
          background:
            intensityAfter > 0
              ? 'linear-gradient(135deg, var(--design) 0%, #1E8449 100%)'
              : undefined,
        }}
        disabled={!intensityAfter}
        onClick={onNext}
      >
        <span>STEP INTO D4: DESIGN NEW IDENTITY</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="text-center mt-4">
        <button id="btn-back-to-logic" className="btn-ghost" onClick={onBack}>
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cognitive Invalidation</span>
        </button>
      </div>
    </div>
  );
};
