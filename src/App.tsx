/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Phase, DecodeData, DesignVAK } from './types';
import { Header } from './components/Header';
import { WelcomeView } from './components/WelcomeView';
import { GoalView } from './components/GoalView';
import { DetectPromptsView } from './components/DetectPromptsView';
import { DetectSelectView } from './components/DetectSelectView';
import { DecodeView } from './components/DecodeView';
import { DissolveLogicView } from './components/DissolveLogicView';
import { DissolveReleaseView } from './components/DissolveReleaseView';
import { DesignView } from './components/DesignView';
import { CompleteView } from './components/CompleteView';

export default function App() {
  const [phase, setPhase] = useState<Phase>(Phase.WELCOME);
  const [name, setName] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedBelief, setSelectedBelief] = useState<string>('');
  const [customBelief, setCustomBelief] = useState<string>('');
  const [decodeData, setDecodeData] = useState<DecodeData>({
    when: '',
    whose: '',
    v: '',
    a: '',
    k: '',
    kLocation: '',
  });
  const [intensityBefore, setIntensityBefore] = useState<number>(0);
  const [logicAnswers, setLogicAnswers] = useState<Record<number, string>>({});
  const [intensityAfter, setIntensityAfter] = useState<number>(0);
  const [newBelief, setNewBelief] = useState<string>('');
  const [designVAK, setDesignVAK] = useState<DesignVAK>({ v: '', a: '', k: '' });

  const updateAnswer = (key: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
  };

  const updateDecode = (key: keyof DecodeData, val: string) => {
    setDecodeData((prev) => ({ ...prev, [key]: val }));
  };

  const updateLogic = (key: number, val: string) => {
    setLogicAnswers((prev) => ({ ...prev, [key]: val }));
  };

  const updateDesignVAK = (key: keyof DesignVAK, val: string) => {
    setDesignVAK((prev) => ({ ...prev, [key]: val }));
  };

  const filledPrompts = Object.entries(answers)
    .filter(([_, v]) => typeof v === 'string' && v.trim().length > 0)
    .map(([_, v]) => (v as string).trim());

  const activeBelief = selectedBelief || customBelief;

  const currentStep =
    phase <= Phase.GOAL
      ? 0
      : phase <= Phase.DETECT_SELECT
      ? 1
      : phase <= Phase.DECODE
      ? 2
      : phase <= Phase.DISSOLVE_RELEASE
      ? 3
      : 4;

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const next = (p: Phase) => {
    setPhase(p);
    scrollTop();
  };

  const handleReset = () => {
    setPhase(Phase.WELCOME);
    setAnswers({});
    setSelectedBelief('');
    setCustomBelief('');
    setDecodeData({ when: '', whose: '', v: '', a: '', k: '', kLocation: '' });
    setIntensityBefore(0);
    setLogicAnswers({});
    setIntensityAfter(0);
    setNewBelief('');
    setDesignVAK({ v: '', a: '', k: '' });
    setGoal('');
    setName('');
    scrollTop();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        phase={phase}
        currentStep={currentStep}
        onSelectStep={(targetPhase) => {
          setPhase(targetPhase);
          scrollTop();
        }}
      />

      <main className="main-content flex-1 w-full" id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {phase === Phase.WELCOME && (
              <WelcomeView onStart={() => next(Phase.GOAL)} />
            )}

            {phase === Phase.GOAL && (
              <GoalView
                name={name}
                goal={goal}
                onNameChange={setName}
                onGoalChange={setGoal}
                onNext={() => next(Phase.DETECT_PROMPTS)}
                onBack={() => next(Phase.WELCOME)}
              />
            )}

            {phase === Phase.DETECT_PROMPTS && (
              <DetectPromptsView
                goal={goal}
                answers={answers}
                onAnswerChange={updateAnswer}
                onNext={() => next(Phase.DETECT_SELECT)}
                onBack={() => next(Phase.GOAL)}
              />
            )}

            {phase === Phase.DETECT_SELECT && (
              <DetectSelectView
                filledPrompts={filledPrompts}
                selectedBelief={selectedBelief}
                customBelief={customBelief}
                onSelectBelief={(val) => {
                  setSelectedBelief(val);
                  setCustomBelief('');
                }}
                onCustomBeliefChange={(val) => {
                  setCustomBelief(val);
                  setSelectedBelief('');
                }}
                onNext={() => next(Phase.DECODE)}
                onBack={() => next(Phase.DETECT_PROMPTS)}
              />
            )}

            {phase === Phase.DECODE && (
              <DecodeView
                activeBelief={activeBelief}
                decodeData={decodeData}
                intensityBefore={intensityBefore}
                onUpdateDecode={updateDecode}
                onSetIntensityBefore={setIntensityBefore}
                onNext={() => next(Phase.DISSOLVE_LOGIC)}
                onBack={() => next(Phase.DETECT_SELECT)}
              />
            )}

            {phase === Phase.DISSOLVE_LOGIC && (
              <DissolveLogicView
                activeBelief={activeBelief}
                intensityBefore={intensityBefore}
                logicAnswers={logicAnswers}
                onUpdateLogic={updateLogic}
                onNext={() => next(Phase.DISSOLVE_RELEASE)}
                onBack={() => next(Phase.DECODE)}
              />
            )}

            {phase === Phase.DISSOLVE_RELEASE && (
              <DissolveReleaseView
                decodeData={decodeData}
                intensityBefore={intensityBefore}
                intensityAfter={intensityAfter}
                onSetIntensityAfter={setIntensityAfter}
                onNext={() => next(Phase.DESIGN)}
                onBack={() => next(Phase.DISSOLVE_LOGIC)}
              />
            )}

            {phase === Phase.DESIGN && (
              <DesignView
                newBelief={newBelief}
                designVAK={designVAK}
                onNewBeliefChange={setNewBelief}
                onUpdateDesignVAK={updateDesignVAK}
                onNext={() => next(Phase.COMPLETE)}
                onBack={() => next(Phase.DISSOLVE_RELEASE)}
              />
            )}

            {phase === Phase.COMPLETE && (
              <CompleteView
                name={name}
                goal={goal}
                activeBelief={activeBelief}
                decodeData={decodeData}
                intensityBefore={intensityBefore}
                intensityAfter={intensityAfter}
                newBelief={newBelief}
                designVAK={designVAK}
                logicAnswers={logicAnswers}
                answers={answers}
                onReset={handleReset}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
