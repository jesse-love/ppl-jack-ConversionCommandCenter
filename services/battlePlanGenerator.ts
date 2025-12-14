
import type { Intel, BattlePlan, AvatarProfile, ProjectTask } from '../types';
import { StrategicChoice } from '../types';

export const generateBattlePlan = (intel: Intel): BattlePlan => {
  const avatars = generatePhase1(intel);
  const landingPages = generatePhase2_4(intel, avatars);
  const trafficStrategies = generatePhase5(intel, avatars, landingPages);
  const brandAndDesign = generatePhase6();
  const techStack = generatePhase7(intel, avatars);
  const trackingSchema = generatePhase8(landingPages);
  const launchPlan = generatePhase9(intel);
  const commandCenter = generatePhase10(launchPlan);

  return {
    phase1: avatars,
    phase2_4: landingPages,
    phase5: trafficStrategies,
    phase6: brandAndDesign,
    phase7: techStack,
    phase8: trackingSchema,
    phase9: launchPlan,
    phase10: commandCenter,
  };
};

const generatePhase1 = (intel: Intel): AvatarProfile[] => {
  if (intel.strategicChoice === StrategicChoice.SINGLE) {
    return [{
      name: `Primary Avatar (${intel.hungryCrowd})`,
      pain: `Directly experiencing the problem: "${intel.burningPain}"`,
      psychology: 'Solution-focused and urgent. Needs immediate relief and assurance.',
      spin: `Focus on speed, a guaranteed solution, and the core benefit of the '${intel.bait}'.`,
    }];
  } else {
    return [
      {
        name: 'Avatar 1 (The "In-Pain")',
        pain: `Acute problem: "${intel.burningPain}". They need a solution YESTERDAY.`,
        psychology: 'Driven by immediate need. Fear of the problem worsening is their primary motivator. Price sensitive but speed is more important.',
        spin: 'Urgency, speed, and immediate relief. "End Your [Pain Category] Problem Now".',
      },
      {
        name: 'Avatar 2 (The "Skeptic")',
        pain: `Has the problem but has been burned before. Fear of being ripped off is greater than the pain itself.`,
        psychology: 'Distrustful of marketing claims. Needs proof, guarantees, and transparency. Looks for reviews and signs of authority.',
        spin: 'Trust, honesty, and guarantees. "The Honest [Service] Your Neighbors Trust". Use USP heavily.',
      },
      {
        name: 'Avatar 3 (The "Bundler")',
        pain: `Has the problem, but is also looking for maximum value. Sees this as an opportunity to solve other potential issues.`,
        psychology: 'Value and efficiency-driven. Wants the best deal and a comprehensive solution. Thinks long-term.',
        spin: 'Value, savings, and comprehensive care. "Get Your [Bait] PLUS a [Bonus Offer]".',
      },
    ];
  }
};

const generatePhase2_4 = (intel: Intel, avatars: AvatarProfile[]) => {
    return avatars.map(avatar => {
        const baseSlug = intel.bait.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const avatarSlug = avatar.name.split('(')[1]?.split(')')[0].toLowerCase().replace(/"/g, '') || avatar.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const slug = avatars.length > 1 ? `/${baseSlug}-${avatarSlug}` : `/${baseSlug}`;

        let headlines: string[] = [];
        let interestHook = '';
        let benefits: string[] = [];
        let cta = `Get My ${intel.bait}!`;
        const commonEnemy = "Hidden Fees & Vague Promises";

        if (avatar.name.includes("In-Pain") || avatars.length === 1) {
            headlines = [
                `Finally, An End to "${intel.burningPain}" in ${intel.hungryCrowd.split(' in ')[1] || 'Your Area'}.`,
                `Get Your ${intel.bait} Today And Stop Worrying About [Pain Point].`,
                `Fast Relief for ${intel.hungryCrowd}: Claim Your ${intel.bait} Now.`
            ];
            interestHook = `That nagging feeling of '${intel.burningPain}' doesn't have to be your reality. We understand the stress, and we're here to end it without the usual runaround from the big guys.`;
            benefits = [
                `Experience Immediate Peace of Mind: Know exactly what's wrong, fast.`,
                `Stop Wasting Time: Our process is designed for speed and efficiency.`,
                `Get Back to Your Life: Solve this problem and move on.`,
                `Transparent Pricing: No surprises, just the solution you need.`,
                `Guaranteed Callback: We respect your time. ${intel.usp}`
            ];
            cta = `Get My FREE Inspection & Quote!`;
        } else if (avatar.name.includes("Skeptic")) {
            headlines = [
                `The Most Trusted ${intel.businessName} in ${intel.hungryCrowd.split(' in ')[1] || 'Your Area'}. Here's Proof.`,
                `Tired of Shady Mechanics? Get an Honest Opinion with Our ${intel.bait}.`,
                `Our Iron-Clad Guarantee: You'll Love Our Service or It's FREE.`
            ];
            interestHook = `You've heard the promises before. You're right to be skeptical. That's why we put our guarantee front and center and let our reputation speak for itself.`;
            benefits = [
                `Total Transparency: We show you the problem, explain the solution, and quote before any work begins.`,
                `Iron-Clad Guarantee: Backed by our commitment to ${intel.usp}.`,
                `See Our Reviews: Loved by hundreds of ${intel.hungryCrowd}.`,
                `Certified & Vetted: Our team is the best in the business.`,
                `No Upselling, Ever: We solve your problem, not sell you services you don't need.`
            ];
            cta = `Get My HONEST Bilan!`;
        } else { // Bundler
            headlines = [
                `Maximize Your Savings: Get a ${intel.bait} AND a [Bonus Service] for One Low Price.`,
                `The Smart Choice for ${intel.hungryCrowd}: Bundle, Save, and Secure Your Peace of Mind.`,
                `Why Just Fix One Thing? Get a Complete Check-Up With Your ${intel.bait}.`
            ];
            interestHook = `Solving one problem is good. Preventing the next one is better. Smart ${intel.hungryCrowd} know that bundling services is the key to long-term value and savings.`;
             benefits = [
                `Unbeatable Value: Get more for your money, guaranteed.`,
                `Long-Term Savings: Prevent future costly repairs by addressing issues today.`,
                `One-Stop-Shop: Save time and hassle by getting everything done at once.`,
                `Comprehensive Report: Understand the full picture of your [Asset, e.g., 'Vehicle's Health'].`,
                `Exclusive Offer: This bundle is not available anywhere else.`
            ];
            cta = `Get My BUNDLE DEAL!`;
        }

        return {
            avatarName: avatar.name,
            slug: slug,
            headlines: headlines,
            interestHook,
            commonEnemy,
            benefits,
            testimonials: [],
            cta
        };
    });
};

const generatePhase5 = (intel: Intel, avatars: AvatarProfile[], landingPages: ReturnType<typeof generatePhase2_4>) => {
    return avatars.map((avatar, index) => {
        const lp = landingPages[index];
        return {
            avatarName: avatar.name,
            adCopies: [
                `${lp.headlines[0]}`,
                `${lp.headlines[1]}`,
                `${intel.usp}. Claim Your ${intel.bait} Today.`
            ],
            painKeywords: [
                `fix "${intel.burningPain}"`,
                `${intel.hungryCrowd.split(' in ')[0]} help with [problem]`,
                `best ${intel.businessName} near me`,
                `[problem] cost ${intel.hungryCrowd.split(' in ')[1] || 'local'}`,
                `${intel.bait} ${intel.hungryCrowd.split(' in ')[1] || 'local'}`
            ],
            retargetingMessage: `Still dealing with '${intel.burningPain}'? Your offer for a ${intel.bait} is about to expire. Don't wait until it's too late. Claim it now.`
        };
    });
};

const generatePhase6 = () => ({
    voice: "Authoritative, direct, and empathetic to the pain. We are the expert solution, not just another option.",
    colors: { trust: 'Dark Blue/Green', background: 'White/Light Gray', action: 'Bright Orange/Red' },
    design: "Zero distractions. Single column layout. No navigation, no footer links, no social icons. The only two exits are the form submission or the browser's back button."
});

const generatePhase7 = (intel: Intel, avatars: AvatarProfile[]) => ({
    pipeline: ["New Lead", "Contacted", "Booked", "Won/Lost"],
    workflows: avatars.map(avatar => ({
        trigger: `Form Submitted on Landing Page for '${avatar.name}'`,
        actions: [
            `Create/Update Opportunity in Pipeline Stage "New Lead".`,
            `Internal Notification (SMS to ${intel.contactNumber}): "🚨 URGENT LEAD (${avatar.name}): {{contact.name}}, {{contact.phone}}. From ${avatar.name} funnel. CALL NOW."`,
            `External SMS to Lead (Confirmation): "Hi {{contact.first_name}}, this is ${intel.businessName}. We received your request for the ${intel.bait}. We'll call you from ${intel.contactNumber} within 15 minutes to confirm. ${intel.usp}"`,
            `Wait 2 hours (if no reply).`,
            `Send Email: "Following up on your request..."`,
            `Wait 24 hours (if no reply).`,
            `Send SMS: "Hi {{contact.first_name}}, just checking if you had any questions about the ${intel.bait}?"`,
            `Stop nurture sequence on any reply.`
        ]
    }))
});

const generatePhase8 = (landingPages: ReturnType<typeof generatePhase2_4>) => {
    const slugs = landingPages.map(lp => lp.slug.substring(1)).join('|');
    return {
        variable: { name: 'url_avatar_type', type: 'URL Parameter', key: 'avatar' },
        events: [
            { name: 'view_landing_page', trigger: `Page View on URL slugs matching RegEx: /(${slugs})$` },
            { name: 'generate_lead', trigger: 'Page View on URL Path containing /merci' },
        ],
        audiences: [
            { name: 'Abandoners', description: "Users who triggered 'view_landing_page' but not 'generate_lead' in the last 7 days." },
            { name: 'Converted', description: "Users who triggered 'generate_lead' in the last 90 days. (For exclusion)." },
        ]
    };
};

const generatePhase9 = (intel: Intel): ProjectTask[] => {
    const tasks: Omit<ProjectTask, 'id' | 'status'>[] = [
        // Phase 1: Foundations
        { phase: '1. Foundations', description: 'Finalize and approve all strategic copy from the War Binder (Avatars, LPs, Ads).' },
        { phase: '1. Foundations', description: 'Set up GHL account, including phone number and user access.' },
        { phase: '1. Foundations', description: 'Set up Google Tag Manager and Google Analytics 4 properties.' },
        { phase: '1. Foundations', description: 'Install GTM container snippet on all web properties.' },
        { phase: '1. Foundations', description: 'Purchase domain for landing pages.' },

        // Phase 2: Tracking & Tech
        { phase: '2. Tracking & Tech', description: 'Implement GTM Variable "url_avatar_type" as defined in Phase 8.' },
        { phase: '2. Tracking & Tech', description: 'Create GTM Trigger and GA4 Event Tag for "view_landing_page".' },
        { phase: '2. Tracking & Tech', description: 'Create GTM Trigger and GA4 Event Tag for "generate_lead", passing "avatar_type" parameter.' },
        { phase: '2. Tracking & Tech', description: 'Create "Abandoners" and "Converted" audiences in GA4.' },
        { phase: '2. Tracking & Tech', description: 'Build the 4-stage sales pipeline in GHL.' },

        // Phase 3: GHL Automation Build
        { phase: '3. GHL Automation', description: `Build the GHL workflow for ${intel.strategicChoice === StrategicChoice.SINGLE ? 'the primary avatar' : 'Avatar 1 (In-Pain)'}.` },
        ...(intel.strategicChoice === StrategicChoice.MULTI ? [
            { phase: '3. GHL Automation', description: 'Build the GHL workflow for Avatar 2 (Skeptic).' },
            { phase: '3. GHL Automation', description: 'Build the GHL workflow for Avatar 3 (Bundler).' },
        ] : []),
        { phase: '3. GHL Automation', description: 'Thoroughly test all GHL workflows with test leads.' },
        { phase: '3. GHL Automation', description: 'Confirm internal and external SMS/email are firing correctly.' },

        // Phase 4: Landing Page Build
        { phase: '4. LP Build', description: `Build landing page for ${intel.strategicChoice === StrategicChoice.SINGLE ? 'the primary avatar' : 'Avatar 1 (In-Pain)'}.` },
         ...(intel.strategicChoice === StrategicChoice.MULTI ? [
            { phase: '4. LP Build', description: 'Build landing page for Avatar 2 (Skeptic).' },
            { phase: '4. LP Build', description: 'Build landing page for Avatar 3 (Bundler).' },
        ] : []),
        { phase: '4. LP Build', description: 'Build the universal "/merci" thank you page.' },
        { phase: '4. LP Build', description: 'Integrate GHL forms on all landing pages, ensuring they pass avatar type to thank you page.' },
        { phase: '4. LP Build', description: 'Ensure all pages are mobile responsive and load in under 2 seconds.' },

        // Phase 5: Ad Platform Build
        { phase: '5. Ad Platform Build', description: 'Set up Google Ads account and billing.' },
        { phase: '5. Ad Platform Build', description: `Create ad campaign and ad group for ${intel.strategicChoice === StrategicChoice.SINGLE ? 'the primary avatar' : 'Avatar 1 (In-Pain)'}.` },
         ...(intel.strategicChoice === StrategicChoice.MULTI ? [
            { phase: '5. Ad Platform Build', description: 'Create ad campaign and ad group for Avatar 2 (Skeptic).' },
            { phase: '5. Ad Platform Build', description: 'Create ad campaign and ad group for Avatar 3 (Bundler).' },
        ] : []),
        { phase: '5. Ad Platform Build', description: 'Add "Pain Keywords" to respective ad groups.' },
        { phase: '5. Ad Platform Build', description: 'Write and upload all ad copy variations.' },
        { phase: '5. Ad Platform Build', description: 'Link GA4 audiences to Google Ads for retargeting and exclusion.' },

        // Phase 6: Testing & QA
        { phase: '6. Testing & QA', description: 'Perform end-to-end test: Click ad -> View Lander -> Submit Form -> Check GTM/GA4 Events -> Check GHL Opportunity -> Receive All Notifications.' },
        { phase: '6. Testing & QA', description: 'Verify lead data is passing correctly at every stage.' },
        { phase: '6. Testing & QA', description: 'Review all copy for typos and grammatical errors.' },

        // Phase 7: Launch
        { phase: '7. Launch', description: 'Set daily budgets and activate Google Ads campaigns.' },
        { phase: '7. Launch', description: 'Monitor GHL and GA4 in real-time for the first 2 hours.' },
        { phase: '7. Launch', description: 'Confirm with client they are receiving and actioning internal notifications.' },
    ];
    return tasks.map((task, index) => ({
        ...task,
        id: `${task.phase.split('.')[0]}.${String(index + 1).padStart(2, '0')}`,
        status: 'To-Do'
    }));
};

const generatePhase10 = (tasks: ProjectTask[]) => {
    return {
        launchCalendar: [
            { day: 1, focus: "Foundations & Tracking", tasks: tasks.filter(t => t.phase.startsWith('1.') || t.phase.startsWith('2.')).map(t => `${t.id}: ${t.description}`) },
            { day: 2, focus: "GHL Automation", tasks: tasks.filter(t => t.phase.startsWith('3.')).map(t => `${t.id}: ${t.description}`) },
            { day: 3, focus: "Landing Page Build (Part 1)", tasks: tasks.filter(t => t.phase.startsWith('4.') && (t.description.includes('Avatar 1') || t.description.includes('primary avatar'))).map(t => `${t.id}: ${t.description}`) },
            { day: 4, focus: "Landing Page Build (Part 2) & Ad Build", tasks: tasks.filter(t => (t.phase.startsWith('4.') && !t.description.includes('Avatar 1') && !t.description.includes('primary avatar')) || t.phase.startsWith('5.')).map(t => `${t.id}: ${t.description}`) },
            { day: 5, focus: "Integration & Testing", tasks: tasks.filter(t => t.phase.startsWith('6.')).map(t => `${t.id}: ${t.description}`) },
            { day: 6, focus: "Final Review & Client Walkthrough", tasks: ["Review all assets with client.", "Get final approval for launch."] },
            { day: 7, focus: "Launch & Monitor", tasks: tasks.filter(t => t.phase.startsWith('7.')).map(t => `${t.id}: ${t.description}`) },
        ]
    };
};
