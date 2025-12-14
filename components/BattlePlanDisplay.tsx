
import React, { useState } from 'react';
import type { Intel, BattlePlan, ProjectTask } from '../types';

interface BattlePlanDisplayProps {
  intel: Intel;
  plan: BattlePlan;
}

type View = 'warBinder' | 'launchCadence';

const Card: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow-lg p-6 mb-8 ${className}`}>
        <h3 className="text-2xl font-bold text-trust border-b-2 border-gray-200 pb-2 mb-4">{title}</h3>
        {children}
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h4 className="text-xl font-semibold text-text-primary mb-3">{title}</h4>
        {children}
    </div>
);

const TaskTable: React.FC<{ tasks: ProjectTask[] }> = ({ tasks }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {tasks.map(task => (
                    <tr key={task.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.phase}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.id}</td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">{task.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                {task.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export const BattlePlanDisplay: React.FC<BattlePlanDisplayProps> = ({ intel, plan }) => {
  const [view, setView] = useState<View>('warBinder');

  const renderWarBinder = () => (
    <div>
        <Card title='Phase 1: Avatar Deep Dive'>
            {plan.phase1.map((avatar, index) => (
                <div key={index} className="mb-4 last:mb-0 p-4 border border-gray-200 rounded-md">
                    <h4 className="font-bold text-lg text-text-primary">{avatar.name}</h4>
                    <p><strong className="text-text-secondary">Pain:</strong> {avatar.pain}</p>
                    <p><strong className="text-text-secondary">Core Psychology:</strong> {avatar.psychology}</p>
                    <p><strong className="text-text-secondary">The "Spin":</strong> {avatar.spin}</p>
                </div>
            ))}
        </Card>

        <Card title='Phases 2-4: The Conversion Machine (Landing Pages)'>
            {plan.phase2_4.map((lp, index) => (
                <div key={index} className="mb-6 last:mb-0 p-4 border border-gray-200 rounded-md">
                    <h4 className="font-bold text-lg text-text-primary">Avatar: {lp.avatarName}</h4>
                    <p className="font-mono bg-gray-100 p-1 rounded-sm inline-block">Page Slug: {lp.slug}</p>
                    <div className="mt-4">
                        <strong className="block text-text-secondary mb-2">A - Attention (Headlines):</strong>
                        <ul className="list-disc list-inside space-y-1 pl-4">
                            {lp.headlines.map((h, i) => <li key={i}>{h}</li>)}
                        </ul>
                    </div>
                     <div className="mt-4">
                        <strong className="block text-text-secondary mb-2">I - Interest (Hook):</strong>
                        <p>"{lp.interestHook}" Common Enemy: <strong>{lp.commonEnemy}</strong></p>
                    </div>
                    <div className="mt-4">
                        <strong className="block text-text-secondary mb-2">D - Desire (Benefits & Social Proof):</strong>
                         <ul className="list-disc list-inside space-y-1 pl-4">
                            {lp.benefits.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                        <p className="italic mt-2">Placeholders for 3 testimonials focused on trust, speed, and results.</p>
                    </div>
                    <div className="mt-4">
                        <strong className="block text-text-secondary mb-2">A - Action (CTA):</strong>
                        <p>Minimalist Form: Name, Email, Phone. CTA Button: <span className="font-bold text-action">{lp.cta}</span></p>
                    </div>
                </div>
            ))}
             <div className="mt-6 text-center bg-yellow-50 border border-yellow-300 p-3 rounded-md">
                <p className="font-bold">CRITICAL GHL IMPLEMENTATION</p>
                <p>All forms redirect to <strong className="font-mono">/merci?avatar=[type]</strong></p>
            </div>
        </Card>

        <Card title='Phase 5: Driving the Crowd (Traffic)'>
           {plan.phase5.map((strat, index) => (
                <div key={index} className="mb-6 last:mb-0 p-4 border border-gray-200 rounded-md">
                    <h4 className="font-bold text-lg text-text-primary">Strategy for: {strat.avatarName}</h4>
                    <Section title="Paid Traffic (Google Ads Copy)">
                        <ul className="list-disc list-inside space-y-1 pl-4">{strat.adCopies.map((ad, i) => <li key={i}>{ad}</li>)}</ul>
                    </Section>
                    <Section title="Organic Traffic (SEO 'Pain' Keywords)">
                        <p className="text-gray-700">{strat.painKeywords.join(', ')}</p>
                    </Section>
                     <Section title="Retargeting Message (For 'Abandoners')">
                        <p className="italic text-red-600">"{strat.retargetingMessage}"</p>
                    </Section>
                </div>
            ))}
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
            <Card title='Phase 6: Brand & Design'>
                <p><strong className="text-text-secondary">Voice:</strong> {plan.phase6.voice}</p>
                <p className="mt-2"><strong className="text-text-secondary">Colors:</strong></p>
                <div className="flex space-x-4 mt-1">
                    <div className="text-center"><div className="w-10 h-10 rounded-full bg-trust mx-auto"></div>Trust</div>
                    <div className="text-center"><div className="w-10 h-10 rounded-full bg-background border mx-auto"></div>Background</div>
                    <div className="text-center"><div className="w-10 h-10 rounded-full bg-action mx-auto"></div>ACTION</div>
                </div>
                <p className="mt-4"><strong className="text-text-secondary">Design:</strong> {plan.phase6.design}</p>
            </Card>

            <Card title='Phase 7: The Arsenal (GHL Tech Stack)'>
                <Section title="4-Stage Sales Pipeline">
                    <p className="font-mono">{plan.phase7.pipeline.join(' -> ')}</p>
                </Section>
                <Section title="Segmented Workflows">
                   {plan.phase7.workflows.map((wf, i) => (
                       <div key={i} className="mb-2">
                           <p className="font-semibold">{wf.trigger}:</p>
                           <ul className="list-decimal list-inside pl-4 text-sm">
                               {wf.actions.map((act, j) => <li key={j}>{act}</li>)}
                           </ul>
                       </div>
                   ))}
                </Section>
            </Card>
        </div>
        
        <Card title='Phase 8: The Ruthless Tracking Schema (GTM & GA4)'>
            <Section title="GTM Variable: The Bulletproof Weapon">
                 <p><strong className="font-mono">{plan.phase8.variable.name}</strong> (Type: {plan.phase8.variable.type}, Key: '{plan.phase8.variable.key}')</p>
            </Section>
            <Section title="Key GTM Triggers & GA4 Events">
                {plan.phase8.events.map((e,i) => (
                    <p key={i}><strong>{e.name}:</strong> Trigger on {e.name === 'generate_lead' ? <strong className="text-green-600">{e.trigger}</strong> : e.trigger}</p>
                ))}
                <p className="text-sm mt-1">Note: <code className="bg-gray-100 p-1 rounded-sm">generate_lead</code> event must pass <strong className="font-mono">avatar_type</strong> as a custom parameter using the GTM variable above.</p>
            </Section>
             <Section title="GA4 Audiences">
                {plan.phase8.audiences.map((a,i) => (
                    <p key={i}><strong>{a.name}:</strong> {a.description}</p>
                ))}
            </Section>
        </Card>
    </div>
  );

  const renderLaunchCadence = () => (
    <div>
        <Card title='Phase 9: The 7-Phase Launch Plan (Project Task List)'>
            <TaskTable tasks={plan.phase9} />
        </Card>
        <Card title='Phase 10: 7-Day Launch Calendar'>
            <ul className="space-y-4">
            {plan.phase10.launchCalendar.map(day => (
                <li key={day.day} className="p-4 border border-gray-200 rounded-md">
                    <h4 className="font-bold text-lg">Day {day.day}: <span className="text-trust">{day.focus}</span></h4>
                    <ul className="list-disc list-inside pl-4 mt-2 text-sm text-gray-700">
                        {day.tasks.map((task, i) => <li key={i}>{task}</li>)}
                    </ul>
                </li>
            ))}
            </ul>
        </Card>
    </div>
  );

  return (
    <div>
      <div className="mb-6 bg-white p-2 rounded-lg shadow-md inline-block">
        <nav className="flex space-x-1">
          <button onClick={() => setView('warBinder')} className={`px-4 py-2 text-sm font-bold rounded-md ${view === 'warBinder' ? 'bg-trust text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            The "War Binder"
          </button>
          <button onClick={() => setView('launchCadence')} className={`px-4 py-2 text-sm font-bold rounded-md ${view === 'launchCadence' ? 'bg-trust text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            The "Launch Cadence"
          </button>
        </nav>
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-trust">COMMAND CENTER: OPERATIONAL DOCUMENTS</h2>
        <p className="text-text-secondary mt-1">All strategic assets and project plans. Ready for execution.</p>
      </div>
      
      {view === 'warBinder' ? renderWarBinder() : renderLaunchCadence()}

      <div className="mt-12">
        <Card title="Conclusion: The 'Next Steps' Menu">
            <p className="mb-4 text-text-secondary">Momentum is critical. Choose your next target to maintain operational velocity.</p>
            <ol className="list-decimal list-inside space-y-2 text-text-primary font-semibold">
                <li><strong className="text-action">Deploy Tracking First:</strong> Implement the full Phase 8 schema in GTM/GA4 before a single line of code is written for the landing pages. No data, no decisions.</li>
                <li><strong className="text-action">Build the 'Bulldog' Nurture:</strong> Construct the Phase 7 GHL workflow immediately. It must be live and tested before traffic runs.</li>
                <li><strong className="text-action">A/B Test Headlines:</strong> Launch with your top headline choice from Phase 2-4, but have the other two ready for a split test. The headline is 80% of the battle.</li>
                <li><strong className="text-action">Set Up Retargeting Audiences:</strong> Activate the 'Abandoners' audience from Phase 8 in your ad platforms now. It needs time to populate.</li>
                <li><strong className="text-action">Role-Play the Sales Call:</strong> Use the Avatar profiles from Phase 1 to train the person who will be calling these leads. They must speak the lead's language of pain and desire.</li>
            </ol>
        </Card>
      </div>
    </div>
  );
};
