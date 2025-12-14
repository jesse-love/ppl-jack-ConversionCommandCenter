import React, { useState, useMemo } from 'react';
import type { Intel } from '../types';
import { StrategicChoice } from '../types';

interface Phase0FormProps {
  onSubmit: (intel: Intel) => void;
}

export const Phase0Form: React.FC<Phase0FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Omit<Intel, 'strategicChoice'> & { strategicChoice: string }>({
    hungryCrowd: '',
    burningPain: '',
    bait: '',
    usp: '',
    businessName: '',
    contactNumber: '',
    primaryLanguage: '',
    strategicChoice: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, strategicChoice: e.target.value }));
  };
  
  const isFormValid = useMemo(() => {
    // FIX: Add a type guard to ensure `value` is a string before calling `trim()`, as `Object.values` can return `unknown[]`.
    return Object.values(formData).every(value => typeof value === 'string' && value.trim() !== '');
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit({
        ...formData,
        strategicChoice: formData.strategicChoice as StrategicChoice,
      });
    }
  };

  const inputClass = "w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-trust focus:border-trust transition duration-150 ease-in-out";
  const labelClass = "block text-sm font-bold text-gray-700 mb-1";

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-2xl max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-trust">PHASE 0: THE "HUNGRY CROWD" (INTEL)</h2>
        <p className="text-text-secondary mt-2">MANDATORY INPUT: Provide this intelligence before any battle plan is generated. Precision here is non-negotiable.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="hungryCrowd" className={labelClass}>1. The "Hungry Crowd" (Exact Audience)</label>
            <input type="text" id="hungryCrowd" name="hungryCrowd" value={formData.hungryCrowd} onChange={handleChange} className={inputClass} placeholder="Ex: Homeowners in Terrebonne, QC." required />
          </div>
          <div>
            <label htmlFor="bait" className={labelClass}>3. The "Bait" (Irresistible Offer)</label>
            <input type="text" id="bait" name="bait" value={formData.bait} onChange={handleChange} className={inputClass} placeholder="Ex: Free Brake Inspection + 10% Off Parts." required />
          </div>
        </div>
        
        <div>
          <label htmlFor="burningPain" className={labelClass}>2. The Burning Pain (What keeps them up?)</label>
          <textarea id="burningPain" name="burningPain" value={formData.burningPain} onChange={handleChange} className={inputClass} rows={3} placeholder="Ex: My brakes are grinding and I'm terrified of a $2,000 bill." required></textarea>
        </div>
        
        <div>
            <label htmlFor="usp" className={labelClass}>4. The USP (Unique Selling Proposition)</label>
            <input type="text" id="usp" name="usp" value={formData.usp} onChange={handleChange} className={inputClass} placeholder="Ex: Honest, certified mechanics. Guaranteed same-day callback." required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="businessName" className={labelClass}>5. Business Name</label>
            <input type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} className={inputClass} placeholder="Ex: Garage XYZ" required />
          </div>
          <div>
            <label htmlFor="contactNumber" className={labelClass}>5. Business Contact Number</label>
            <input type="text" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className={inputClass} placeholder="Ex: 555-123-4567" required />
          </div>
        </div>
        
         <div>
            <label htmlFor="primaryLanguage" className={labelClass}>6. Primary Language / Market</label>
            <input type="text" id="primaryLanguage" name="primaryLanguage" value={formData.primaryLanguage} onChange={handleChange} className={inputClass} placeholder="Ex: French-first, Terrebonne/Mascouche" required />
        </div>

        <div>
          <fieldset>
            <legend className={labelClass}>7. CRITICAL STRATEGIC CHOICE</legend>
            <div className="mt-2 space-y-2 md:space-y-0 md:flex md:space-x-4">
              <div className="flex items-center">
                <input id="single" name="strategicChoice" type="radio" value={StrategicChoice.SINGLE} onChange={handleRadioChange} checked={formData.strategicChoice === StrategicChoice.SINGLE} className="h-4 w-4 text-trust focus:ring-action border-gray-300" required />
                <label htmlFor="single" className="ml-3 block text-sm font-medium text-gray-700">{StrategicChoice.SINGLE} (One avatar, one funnel)</label>
              </div>
              <div className="flex items-center">
                <input id="multi" name="strategicChoice" type="radio" value={StrategicChoice.MULTI} onChange={handleRadioChange} checked={formData.strategicChoice === StrategicChoice.MULTI} className="h-4 w-4 text-trust focus:ring-action border-gray-300" required />
                <label htmlFor="multi" className="ml-3 block text-sm font-medium text-gray-700">{StrategicChoice.MULTI} (Three avatars, three funnels)</label>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="pt-4">
          <button type="submit" disabled={!isFormValid} className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-action hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300">
            GENERATE BATTLE PLAN
          </button>
        </div>
      </form>
    </div>
  );
};