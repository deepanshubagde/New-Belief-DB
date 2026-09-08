import { DecodeData, DesignVAK } from '../types';
import { BRAND, LOGIC_QS, DESIGN_RULES, PROMPTS } from '../data/constants';

export interface ReportData {
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
  completedDate?: string;
}

export function generateReportMarkdown(data: ReportData): string {
  const dateStr = data.completedDate || new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const shiftDelta = Math.max(0, data.intensityBefore - data.intensityAfter);

  let md = `# ${BRAND.name.toUpperCase()}
## ${BRAND.methodTitle} — Official Reprogramming Transcript
**Subconscious Reprogramming & Inner Mastery** · by ${BRAND.author}
**Date of Session:** ${dateStr}

---

### PRACTITIONER & ANCHOR GOAL
${data.name ? `- **Practitioner Name:** ${data.name}\n` : ''}- **The Sacred Target Goal:**
  > "${data.goal}"

---

### STAGE 1 (D1) · DETECT: THE LIMITING BELIEF UNMASKED
- **Identified Core Limiting Belief (Dissolved):**
  > ~~"${data.activeBelief}"~~

*The Monkhood Detection Law:* The belief that induces the sharpest internal discomfort or hesitation is the master lock of the subconscious pattern.
`;

  // Prompts excavated if any
  if (data.answers && Object.keys(data.answers).length > 0) {
    md += `\n**Excavated Inquiries from Stage 1:**\n`;
    PROMPTS.forEach((group, gi) => {
      group.prompts.forEach((p, pi) => {
        const key = `${gi}-${pi}`;
        const val = data.answers?.[key];
        if (val && val.trim()) {
          md += `- *"${p}"* → **"${val.trim()}"**\n`;
        }
      });
    });
  }

  md += `
---

### STAGE 2 (D2) · DECODE: NEUROLOGICAL REVERSE-ENGINEERING
- **Subconscious Archeology (First Memory):** ${data.decodeData.when || 'Childhood / Early development'}
- **Source Authority Voice:** ${data.decodeData.whose || 'External conditioning'}

**Sensory V.A.K Blueprint (How the belief was held):**
- **Visual (V):** ${data.decodeData.v || 'Mental cinema of past hesitation'}
- **Auditory (A):** ${data.decodeData.a || 'Critical internal whisper'}
- **Kinaesthetic (K):** Somatic Anchor at **${data.decodeData.kLocation || 'Body center / Solar plexus'}**

---

### STAGE 3 (D3) · DISSOLVE: COGNITIVE & SOMATIC RELEASE
#### 1. Socratic Cognitive Invalidation
`;

  LOGIC_QS.forEach((q, i) => {
    const ans = data.logicAnswers?.[i];
    md += `\n**Q${i + 1}: ${q}**\n`;
    md += ans && ans.trim() ? `> *${ans.trim()}*\n` : `> *(Reflected & collapsed in session)*\n`;
  });

  md += `
#### 2. Somatic & Audio Dissolution Techniques
- **Technique 1 · Pattern Break (Somatic Extraction - K):**
  Located the physical density anchored at *${data.decodeData.kLocation || 'your body center'}*, gave it physical shape and color, manually grasped the density with both hands, pulled it completely out of the torso, and cast it upward to vaporize on deep audible exhalation.

- **Technique 2 · The Thumb Technique (Voice Deflation - A):**
  Transported the authority voice of *${data.decodeData.whose || 'the original critic'}* down from the head, through the shoulder, down the arm, and compressed it into the tip of the left thumb as a tiny, helium cartoon character—collapsing all emotional weight through conscious amusement.

#### 3. Neurological Charge Shift
- **Initial Baseline Charge:** ${data.intensityBefore} / 10
- **Post-Release Charge:** ${data.intensityAfter} / 10
- **Net Emotional Reduction:** -${shiftDelta} point${shiftDelta === 1 ? '' : 's'} (${Math.round((shiftDelta / Math.max(1, data.intensityBefore)) * 100)}% charge neutralized)

---

### STAGE 4 (D4) · DESIGN: THE SOVEREIGN NEW IDENTITY
- **Installed Master Affirmation:**
  > **"${data.newBelief}"**

**Neurological Sensory Installation (V.A.K):**
- **Visual (V):** ${data.designVAK.v || 'High-definition future self living with sovereignty'}
- **Auditory (A):** ${data.designVAK.a || 'Calm, unwavering, grounded voice of absolute truth'}
- **Kinaesthetic (K):** ${data.designVAK.k || 'Expansive warmth, grounded spine, relaxed solar plexus'}

**The 5 Laws of Subconscious Installation:**
`;

  DESIGN_RULES.forEach((rule, idx) => {
    md += `${idx + 1}. **${rule.title}:** ${rule.desc}\n`;
  });

  md += `
---

### THE 21-DAY MONKHOOD NEURO-PLASTICITY INTEGRATION PROTOCOL
To permanently cement this new neural pathway and prevent the brain from falling back into default mode network grooves, execute this daily protocol for 21 consecutive days:

1. **Morning Installation (Immediate upon waking):**
   Stand tall with shoulders rolled back and open chest. Recite your new sovereign affirmation out loud 10 times with diaphragmatic breathing and full physiological embodiment.
2. **Midday Awareness (Midday pause):**
   Pause for 60 seconds. Repeat your affirmation silently 5 times. If any faint whisper of the old belief surfaces, invoke the Thumb Technique immediately to deflate its authority.
3. **Evening Re-wiring (Before sleep):**
   In your journal, handwrite your new affirmation 5 times while entering theta state. Run your vivid mental cinema before drifting to sleep.

---
*Transcript Certified by ${BRAND.name} · ${BRAND.author} · ${BRAND.methodTitle}*
`;

  return md.trim();
}

export function generateReportHtml(data: ReportData): string {
  const dateStr = data.completedDate || new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const shiftDelta = Math.max(0, data.intensityBefore - data.intensityAfter);

  const logicRows = LOGIC_QS.map((q, i) => {
    const ans = data.logicAnswers?.[i]?.trim();
    return `
      <div style="margin-bottom: 16px; padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
        <div style="font-weight: 600; font-size: 13.5px; color: #E5A84B; margin-bottom: 6px;">
          Question ${i + 1}: ${escapeHtml(q)}
        </div>
        <div style="font-size: 13px; color: #D1D5DB; font-style: italic; line-height: 1.6;">
          ${ans ? `"${escapeHtml(ans)}"` : '<span style="color: #6B7280;">(Reflected and logically dismantled during session)</span>'}
        </div>
      </div>
    `;
  }).join('');

  const promptAnswers = data.answers ? Object.entries(data.answers)
    .filter(([_, v]) => typeof v === 'string' && v.trim().length > 0)
    .map(([key, v]) => {
      const [gi, pi] = key.split('-').map(Number);
      const promptText = PROMPTS[gi]?.prompts[pi] || 'Prompt';
      return `
        <div style="padding: 10px 14px; background: rgba(255,255,255,0.02); border-left: 2px solid #E26D5C; border-radius: 4px; margin-bottom: 8px; font-size: 13px;">
          <div style="color: #9CA3AF; font-size: 12px; margin-bottom: 2px;">${escapeHtml(promptText)}</div>
          <div style="color: #FFA194; font-weight: 500;">"${escapeHtml(v.trim())}"</div>
        </div>
      `;
    }).join('') : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>4D Belief Clearing Transcript | ${escapeHtml(BRAND.name)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0C0E14;
      --surface: #141822;
      --surface-elevated: #1B212F;
      --amber: #E59A46;
      --amber-light: #F5C78E;
      --detect: #E26D5C;
      --decode: #E5A84B;
      --dissolve: #9D71E8;
      --design: #36B37E;
      --text: #F3F4F6;
      --text-muted: #9CA3AF;
      --border: rgba(255, 255, 255, 0.1);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      padding: 40px 20px;
    }
    .container {
      max-width: 820px;
      margin: 0 auto;
      background: var(--surface);
      border: 1px solid rgba(229, 154, 70, 0.25);
      border-radius: 18px;
      box-shadow: 0 15px 45px rgba(0,0,0,0.45);
      overflow: hidden;
    }
    .header-banner {
      background: linear-gradient(135deg, #1B212F 0%, #141822 100%);
      border-bottom: 1px solid var(--border);
      padding: 36px 32px 28px;
      text-align: center;
      position: relative;
    }
    .header-banner::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 4px;
      background: linear-gradient(90deg, var(--amber), var(--design));
    }
    .brand-badge {
      display: inline-block;
      padding: 4px 14px;
      background: rgba(229, 154, 70, 0.12);
      border: 1px solid rgba(229, 154, 70, 0.3);
      border-radius: 9999px;
      color: var(--amber);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    h1 {
      font-family: 'Cinzel', Georgia, serif;
      font-size: 28px;
      color: #FFFFFF;
      margin-bottom: 6px;
      letter-spacing: 0.5px;
    }
    .subtitle {
      font-size: 14px;
      color: var(--text-muted);
    }
    .meta-bar {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding: 14px 32px;
      background: rgba(0,0,0,0.25);
      border-bottom: 1px solid var(--border);
      font-size: 12px;
      color: var(--text-muted);
    }
    .content {
      padding: 32px;
    }
    .section {
      margin-bottom: 32px;
      padding-bottom: 28px;
      border-bottom: 1px solid var(--border);
    }
    .section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 14px;
    }
    .box-quote {
      padding: 16px 20px;
      border-radius: 10px;
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border);
      margin-bottom: 14px;
    }
    .technique-box {
      background: var(--surface-elevated);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
      border-left: 4px solid var(--amber);
    }
    .intensity-metric {
      display: flex;
      align-items: center;
      gap: 24px;
      margin: 16px 0;
      padding: 16px;
      background: rgba(255,255,255,0.02);
      border-radius: 10px;
    }
    .metric-col { text-align: center; }
    .metric-val { font-size: 26px; font-weight: 800; font-family: monospace; }
    .metric-lbl { font-size: 11px; text-transform: uppercase; color: var(--text-muted); }
    .print-actions {
      text-align: center;
      padding: 20px 32px;
      background: rgba(0,0,0,0.3);
      border-top: 1px solid var(--border);
    }
    .btn-print {
      display: inline-block;
      padding: 12px 24px;
      background: var(--amber);
      color: #0C0E14;
      font-weight: 700;
      border-radius: 8px;
      text-decoration: none;
      font-size: 13px;
      letter-spacing: 0.5px;
      cursor: pointer;
      border: none;
    }
    @media print {
      body { background: #fff !important; color: #111 !important; padding: 0 !important; }
      .container { border: none !important; box-shadow: none !important; max-width: 100% !important; background: #fff !important; }
      .header-banner { background: #f9fafb !important; border-bottom: 2px solid #111 !important; }
      .header-banner h1 { color: #111 !important; }
      .subtitle, .meta-bar { color: #555 !important; }
      .section { border-bottom: 1px solid #e5e7eb !important; }
      .box-quote, .technique-box { background: #f9fafb !important; color: #111 !important; border: 1px solid #e5e7eb !important; }
      .print-actions { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-banner">
      <div class="brand-badge">${escapeHtml(BRAND.name)}</div>
      <h1>${escapeHtml(BRAND.methodTitle)}</h1>
      <p class="subtitle">${escapeHtml(BRAND.methodSubtitle)} · Mastered by ${escapeHtml(BRAND.author)}</p>
    </div>

    <div class="meta-bar">
      <div><strong>Practitioner:</strong> ${escapeHtml(data.name || 'Dedicated Seeker')}</div>
      <div><strong>Date of Session:</strong> ${escapeHtml(dateStr)}</div>
      <div><strong>Verification Status:</strong> Neutralized & Installed</div>
    </div>

    <div class="content">
      <!-- Anchor Goal -->
      <div class="section">
        <div class="section-title" style="color: var(--amber);">The Sacred Target Goal</div>
        <div class="box-quote" style="border-left: 3px solid var(--amber); font-size: 16px; font-weight: 600;">
          "${escapeHtml(data.goal)}"
        </div>
      </div>

      <!-- D1: Detect -->
      <div class="section">
        <div class="section-title" style="color: var(--detect);">Stage 1 · Detect (Root Subconscious Block)</div>
        <div class="box-quote" style="border-left: 3px solid var(--detect); background: rgba(226,109,92,0.05);">
          <div style="font-size: 11px; font-weight: 700; color: var(--detect); text-transform: uppercase; margin-bottom: 4px;">Dissolved Limiting Belief</div>
          <div style="font-size: 16px; text-decoration: line-through; color: rgba(255,255,255,0.6); font-style: italic;">
            "${escapeHtml(data.activeBelief)}"
          </div>
        </div>
        ${promptAnswers ? `
          <div style="margin-top: 14px;">
            <div style="font-size: 12px; font-weight: 600; color: #9CA3AF; margin-bottom: 8px;">Subconscious Excavation Trail:</div>
            ${promptAnswers}
          </div>
        ` : ''}
      </div>

      <!-- D2: Decode -->
      <div class="section">
        <div class="section-title" style="color: var(--decode);">Stage 2 · Decode (Neurological Sensory Imprint)</div>
        <div class="box-quote" style="border-left: 3px solid var(--decode);">
          <div style="margin-bottom: 10px;">
            <strong style="color: var(--decode);">Formative Origin Memory:</strong> 
            <span style="color: #D1D5DB;">${escapeHtml(data.decodeData.when || 'Childhood / Early life')}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: var(--decode);">Source Authority Voice:</strong> 
            <span style="color: #D1D5DB;">${escapeHtml(data.decodeData.whose || 'External authority / Conditioning')}</span>
          </div>
          <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 13px; color: #9CA3AF;">
            <div>• <strong>Visual (V):</strong> ${escapeHtml(data.decodeData.v || 'Internal movie of fear or hesitation')}</div>
            <div>• <strong>Auditory (A):</strong> ${escapeHtml(data.decodeData.a || 'Internal criticizing tone')}</div>
            <div>• <strong>Kinaesthetic (K):</strong> Anchored physically at <strong style="color: var(--decode);">${escapeHtml(data.decodeData.kLocation || 'Body Center')}</strong></div>
          </div>
        </div>
      </div>

      <!-- D3: Dissolve -->
      <div class="section">
        <div class="section-title" style="color: var(--dissolve);">Stage 3 · Dissolve (Cognitive Collapse & Somatic Release)</div>
        
        <div class="intensity-metric">
          <div class="metric-col">
            <div class="metric-val" style="color: var(--detect);">${data.intensityBefore}/10</div>
            <div class="metric-lbl">Initial Grip</div>
          </div>
          <div style="font-size: 20px; color: var(--amber);">➔</div>
          <div class="metric-col">
            <div class="metric-val" style="color: var(--design);">${data.intensityAfter}/10</div>
            <div class="metric-lbl">Post-Release</div>
          </div>
          <div style="margin-left: auto; padding: 6px 14px; background: rgba(54,179,126,0.15); border-radius: 6px; font-weight: 700; color: var(--design); font-size: 13px;">
            -${shiftDelta} Points Released
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <h3 style="font-size: 13px; font-weight: 700; color: var(--dissolve); text-transform: uppercase; margin-bottom: 10px;">Cognitive Socratic Inquiry</h3>
          ${logicRows}
        </div>

        <div class="technique-box" style="border-left-color: var(--detect);">
          <div style="font-size: 12px; font-weight: 700; color: var(--detect); text-transform: uppercase; margin-bottom: 6px;">
            Technique 1 · Pattern Break: Somatic Extraction (K)
          </div>
          <div style="font-size: 13px; color: #D1D5DB; line-height: 1.6;">
            Locate the physical density in your <strong>${escapeHtml(data.decodeData.kLocation || 'body center')}</strong>. Mentally give it a solid shape and color. Reach out with both hands, firmly grasp the sensation, pull it out of your body, and fling it skyward to vaporize on a deep, audible exhalation. Repeat 3 times whenever tension arises.
          </div>
        </div>

        <div class="technique-box" style="border-left-color: var(--dissolve);">
          <div style="font-size: 12px; font-weight: 700; color: var(--dissolve); text-transform: uppercase; margin-bottom: 6px;">
            Technique 2 · The Thumb Technique: Voice Deflation (A)
          </div>
          <div style="font-size: 13px; color: #D1D5DB; line-height: 1.6;">
            Take the internal voice of <strong>${escapeHtml(data.decodeData.whose || 'the critic')}</strong> that whispers doubt. Move that voice from your head down your arm into your left thumb. Shrink the voice into a tiny, high-pitched cartoon squeak. Laugh at the absurd sound until its authority evaporates completely.
          </div>
        </div>
      </div>

      <!-- D4: Design -->
      <div class="section">
        <div class="section-title" style="color: var(--design);">Stage 4 · Design (New Sovereign Identity)</div>
        <div class="box-quote" style="border-left: 3px solid var(--design); background: rgba(54,179,126,0.06);">
          <div style="font-size: 11px; font-weight: 700; color: var(--design); text-transform: uppercase; margin-bottom: 6px;">The Sovereign Truth ("I AM")</div>
          <div style="font-size: 19px; font-weight: 700; color: var(--design); line-height: 1.5;">
            "${escapeHtml(data.newBelief)}"
          </div>
          ${(data.designVAK.v || data.designVAK.a || data.designVAK.k) ? `
            <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 13px; color: #9CA3AF;">
              <div>• <strong>Visual Cinema (V):</strong> ${escapeHtml(data.designVAK.v || 'Vivid mental cinema of triumph')}</div>
              <div>• <strong>Auditory Resonance (A):</strong> ${escapeHtml(data.designVAK.a || 'Calm, unwavering grounded certainty')}</div>
              <div>• <strong>Somatic Sensation (K):</strong> ${escapeHtml(data.designVAK.k || 'Expanded chest, deep breath, grounded posture')}</div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- 21-Day Protocol -->
      <div class="section">
        <div class="section-title" style="color: var(--amber);">The 21-Day Neuro-Plasticity Protocol</div>
        <div style="font-size: 13px; color: #D1D5DB; line-height: 1.7;">
          <p style="margin-bottom: 10px;"><strong>1. Morning Installation (On Waking):</strong> Stand tall in a power posture. Recite your new sovereign truth 10 times aloud with diaphragmatic breath and deep emotional conviction.</p>
          <p style="margin-bottom: 10px;"><strong>2. Midday Awareness (Lunch / Afternoon):</strong> Pause for 60 seconds. Repeat 5 times internally. If old doubts attempt to whisper, deflate them immediately using the Thumb Technique.</p>
          <p><strong>3. Evening Re-wiring (Before Sleep):</strong> Write your new affirmation by hand 5 times in your journal, visualizing your mental movie as your brain transitions into theta state.</p>
        </div>
      </div>
    </div>

    <div class="print-actions">
      <button class="btn-print" onclick="window.print()">Print or Save as PDF</button>
    </div>
  </div>
</body>
</html>`;
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
