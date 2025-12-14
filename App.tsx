
import React, { useState } from 'react';
import type { Intel, BattlePlan } from './types';
import { StrategicChoice } from './types';
import { Phase0Form } from './components/Phase0Form';
import { BattlePlanDisplay } from './components/BattlePlanDisplay';
import { generateBattlePlan } from './services/battlePlanGenerator';

const App: React.FC = () => {
  const [intel, setIntel] = useState<Intel | null>(null);
  const [battlePlan, setBattlePlan] = useState<BattlePlan | null>(null);

  const handleIntelSubmit = (submittedIntel: Intel) => {
    setIntel(submittedIntel);
    const plan = generateBattlePlan(submittedIntel);
    setBattlePlan(plan);
  };
  
  const resetPlan = () => {
    setIntel(null);
    setBattlePlan(null);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-text-primary">
      <header className="bg-trust shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-3xl font-bold text-white tracking-wider">
            PPL JACK: Conversion Command Center
          </h1>
           {intel && (
            <button
              onClick={resetPlan}
              className="bg-action text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            >
              New Battle Plan
            </button>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!intel || !battlePlan ? (
          <Phase0Form onSubmit={handleIntelSubmit} />
        ) : (
          <BattlePlanDisplay intel={intel} plan={battlePlan} />
        )}
      </main>
      <footer className="text-center py-4 text-text-secondary text-sm">
          <p>Execute with precision. No mercy. &copy; PPL Jack Industries</p>
      </footer>
    </div>
  );
};

export default App;
