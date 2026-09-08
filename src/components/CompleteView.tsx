import React, { useState } from 'react';
import { DecodeData, DesignVAK } from '../types';
import { BRAND } from '../data/constants';
import {
  Sparkles,
  Copy,
  Check,
  Printer,
  RotateCcw,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Sun,
  Download,
  FileText,
  FileCode,
} from 'lucide-react';
import {
  generateReportHtml,
  generateReportMarkdown,
  downloadFile,
  ReportData,
} from '../utils/reportGenerator';

interface CompleteViewProps {
  name: string;
  goal: string;
  activeBelief: string;
  decodeData: DecodeData;
  intensityBefore: number;
  intensityAfter: number;
  newBelief: string;
  designVAK: DesignVAK;
  logicAnswers?: Record<number, string>;
  answers?: Record<string, string>;
  onReset: () => void;
}

export const CompleteView: React.FC<CompleteViewProps> = ({
  name,
  goal,
  activeBelief,
  decodeData,
  intensityBefore,
  intensityAfter,
  newBelief,
  designVAK,
  logicAnswers = {},
  answers = {},
  onReset,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadedHtml, setDownloadedHtml] = useState(false);
  const [downloadedTxt, setDownloadedTxt] = useState(false);

  const reportPayload: ReportData = {
    name,
    goal,
    activeBelief,
    decodeData,
    intensityBefore,
    intensityAfter,
    newBelief,
    designVAK,
    logicAnswers,
    answers,
  };

  const handleDownloadHtml = () => {
    const html = generateReportHtml(reportPayload);
    const sanitizedName = (name || 'Practitioner').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Monkhood_Club_4D_Report_${sanitizedName}.html`;
    downloadFile(html, filename, 'text/html');
    setDownloadedHtml(true);
    setTimeout(() => setDownloadedHtml(false), 3000);
  };

  const handleDownloadTxt = () => {
    const txt = generateReportMarkdown(reportPayload);
    const sanitizedName = (name || 'Practitioner').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Monkhood_Club_4D_Report_${sanitizedName}.txt`;
    downloadFile(txt, filename, 'text/plain');
    setDownloadedTxt(true);
    setTimeout(() => setDownloadedTxt(false), 3000);
  };

  const handleCopySummary = async () => {
    const summaryText = generateReportMarkdown(reportPayload);
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = summaryText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const shiftDelta = Math.max(0, intensityBefore - intensityAfter);

  return (
    <div className="text-center" id="complete-view">
      <div
        className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-[var(--design-glow)] border border-[rgba(54,179,126,0.35)] shadow-[0_0_25px_rgba(54,179,126,0.2)]"
        id="complete-icon"
      >
        <Sparkles className="w-8 h-8 text-[var(--design)]" />
      </div>

      <h2 className="phase-title text-3xl font-semibold mb-2" id="complete-title">
        Subconscious Code Rewritten
      </h2>

      <p className="phase-sub max-w-md mx-auto mb-6" id="complete-sub">
        You have successfully walked through all 4 dimensions. Here is your permanent clearing and installation certificate.
      </p>

      {/* The Sacred Transformation Scroll */}
      <div className="transformation-scroll mb-6" id="transformation-summary-card">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)]">
          <div>
            <div className="text-[10px] font-bold tracking-[2.5px] text-[var(--monk-amber)] uppercase font-mono">
              {BRAND.name} · Official Record
            </div>
            <div className="text-[15px] font-semibold text-[var(--text-primary)]">
              Subconscious Reprogramming Transcript
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-[rgba(54,179,126,0.12)] border border-[rgba(54,179,126,0.3)] text-[11px] font-bold text-[var(--design)] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dissolved & Sealed</span>
          </div>
        </div>

        {/* Section: Goal & Practitioner */}
        <div className="scroll-section" id="summary-section-goal">
          <div className="scroll-label text-[var(--monk-amber)]">
            Anchor Goal & Practitioner
          </div>
          {name && (
            <div className="text-[12.5px] font-semibold text-[var(--monk-amber-light)] mb-1" id="summary-name">
              Practitioner: {name}
            </div>
          )}
          <div className="text-[14.5px] text-[var(--text-primary)] font-medium leading-snug" id="summary-goal">
            {goal}
          </div>
        </div>

        {/* Section: Dissolved Old Belief */}
        <div className="scroll-section" id="summary-section-old-belief">
          <div className="scroll-label text-[var(--detect)]">
            D1 · Limiting Belief (Dissolved & Invalidated)
          </div>
          <div
            className="text-[14px] text-[rgba(255,255,255,0.45)] line-through italic"
            id="summary-old-belief"
          >
            "{activeBelief}"
          </div>
        </div>

        {/* Section: Origin Traced */}
        {(decodeData.when || decodeData.whose) && (
          <div className="scroll-section" id="summary-section-origin">
            <div className="scroll-label text-[var(--decode)]">
              D2 · Subconscious Imprint Origin
            </div>
            <div className="text-[13px] text-[var(--text-secondary)] space-y-0.5" id="summary-origin">
              {decodeData.when && <div>First Formed: {decodeData.when}</div>}
              {decodeData.whose && <div>Source Voice: {decodeData.whose}</div>}
            </div>
          </div>
        )}

        {/* Section: Intensity Shift */}
        <div className="scroll-section" id="summary-section-intensity">
          <div className="scroll-label text-[var(--dissolve)]">
            D3 · Emotional Charge Collapse
          </div>
          <div className="flex items-center gap-6 my-2" id="summary-intensity-shift">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-[var(--detect)] font-mono">
                {intensityBefore}/10
              </div>
              <div className="text-[10px] tracking-wider text-[var(--text-muted)] font-mono uppercase">
                Prior Charge
              </div>
            </div>
            <div className="flex items-center text-[var(--text-muted)]">
              <ArrowRight className="w-5 h-5 text-[var(--monk-amber)]" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-[var(--design)] font-mono">
                {intensityAfter}/10
              </div>
              <div className="text-[10px] tracking-wider text-[var(--text-muted)] font-mono uppercase">
                Active State
              </div>
            </div>
            {shiftDelta > 0 && (
              <div className="ml-auto px-3 py-1.5 rounded-lg bg-[rgba(54,179,126,0.1)] border border-[rgba(54,179,126,0.25)] text-[12px] font-bold text-[var(--design)] font-mono">
                -{shiftDelta} Point Reduction
              </div>
            )}
          </div>
        </div>

        {/* Section: Installed New Truth */}
        <div className="scroll-section" id="summary-section-new-belief">
          <div className="scroll-label text-[var(--design)]">
            D4 · Sovereign New Identity (Active)
          </div>
          <div
            className="text-[18px] text-[var(--design)] font-bold italic leading-relaxed py-1"
            id="summary-new-belief"
          >
            "{newBelief}"
          </div>

          {(designVAK.v || designVAK.a || designVAK.k) && (
            <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)] text-[12px] text-[var(--text-secondary)] space-y-1">
              {designVAK.v && <div>• <strong>Visual:</strong> {designVAK.v}</div>}
              {designVAK.a && <div>• <strong>Auditory:</strong> {designVAK.a}</div>}
              {designVAK.k && <div>• <strong>Somatic:</strong> {designVAK.k}</div>}
            </div>
          )}
        </div>

        {/* Brand Footer Seal */}
        <div className="pt-4 mt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono">
          <span>{BRAND.methodTitle}</span>
          <span>{BRAND.name.toUpperCase()} · {BRAND.author.toUpperCase()}</span>
        </div>
      </div>

      {/* 21-Day Daily Practice Protocol */}
      <div className="zen-card text-left mb-6" id="card-next-21-days">
        <div className="flex items-center gap-2 text-[var(--monk-amber)] text-[12px] font-bold tracking-[1.5px] uppercase mb-3">
          <Calendar className="w-4 h-4" />
          <span>The 21-Day Neuro-Plasticity Protocol</span>
        </div>
        <div className="space-y-3 text-[13px] text-[var(--text-secondary)]">
          <div className="flex items-start gap-2.5">
            <Sun className="w-4 h-4 text-[var(--monk-amber)] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--text-primary)]">Morning Installation:</strong> Stand tall upon waking. Recite your new belief out loud 10 times with expansive posture and physiological emotion.
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[var(--monk-amber)] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--text-primary)]">Midday Awareness:</strong> Recite internally 5 times. If any shadow of the old phrase whispers, perform the Thumb Technique to laugh it off.
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-[var(--monk-amber)] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--text-primary)]">Evening Re-wiring:</strong> Write your new belief 5 times in your journal before sleep, mentally rehearsing your visual movie as your brain transitions to theta state.
            </div>
          </div>
        </div>
      </div>

      {/* Primary Download Report Hub */}
      <div className="zen-card text-left mb-5 p-5 border-l-4 border-l-[var(--monk-amber)]" id="card-download-report">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-[var(--monk-amber)] font-bold text-[12.5px] tracking-[1px] uppercase">
            <Download className="w-4 h-4" />
            <span>Download Complete Reprogramming Report</span>
          </div>
          <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
            All Techniques Included
          </span>
        </div>
        <p className="text-[12.5px] text-[var(--text-secondary)] leading-relaxed mb-4">
          Save your complete archival report including the Somatic Extraction technique, Voice Deflation (Thumb Technique), full Socratic inquiry reflections, V.A.K blueprints, and the 21-day integration protocol.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            id="btn-download-html-report"
            className="btn-primary py-3 text-[13px] tracking-wide"
            onClick={handleDownloadHtml}
          >
            {downloadedHtml ? (
              <>
                <Check className="w-4 h-4" />
                <span>HTML Report Downloaded!</span>
              </>
            ) : (
              <>
                <FileCode className="w-4 h-4" />
                <span>Download Styled Report (.html)</span>
              </>
            )}
          </button>

          <button
            type="button"
            id="btn-download-txt-report"
            className="btn-ghost py-3 text-[13px] border-[rgba(229,154,70,0.3)] hover:border-[var(--monk-amber)] text-[var(--text-primary)]"
            onClick={handleDownloadTxt}
          >
            {downloadedTxt ? (
              <>
                <Check className="w-4 h-4 text-[var(--design)]" />
                <span className="text-[var(--design)]">Text Report Downloaded!</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 text-[var(--monk-amber)]" />
                <span>Download Text / Markdown (.txt)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Secondary Actions (Print & Clipboard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <button
          type="button"
          id="btn-copy-summary"
          className="btn-ghost py-3"
          onClick={handleCopySummary}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[var(--design)]" />
              <span className="text-[var(--design)]">Copied Full Transcript!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[var(--monk-amber)]" />
              <span>Copy Full Transcript</span>
            </>
          )}
        </button>

        <button
          type="button"
          id="btn-print-summary"
          className="btn-ghost py-3"
          onClick={handlePrint}
        >
          <Printer className="w-4 h-4 text-[var(--text-secondary)]" />
          <span>Print or Save to PDF</span>
        </button>
      </div>

      <button
        id="btn-start-new-clearing"
        className="btn-ghost w-full py-3"
        onClick={onReset}
      >
        <RotateCcw className="w-4 h-4" />
        <span>Clear Another Limiting Belief</span>
      </button>
    </div>
  );
};
