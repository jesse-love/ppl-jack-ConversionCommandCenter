
export enum StrategicChoice {
  SINGLE = "Single-Target Assault",
  MULTI = "Multi-Avatar Domination",
}

export interface Intel {
  hungryCrowd: string;
  burningPain: string;
  bait: string;
  usp: string;
  businessName: string;
  contactNumber: string;
  primaryLanguage: string;
  strategicChoice: StrategicChoice;
}

export interface AvatarProfile {
  name: string;
  pain: string;
  psychology: string;
  spin: string;
}

export interface LandingPageBlueprint {
  avatarName: string;
  slug: string;
  headlines: string[];
  interestHook: string;
  commonEnemy: string;
  benefits: string[];
  testimonials: string[];
  cta: string;
}

export interface TrafficStrategy {
  avatarName: string;
  adCopies: string[];
  painKeywords: string[];
  retargetingMessage: string;
}

export interface GHLWorkflow {
  trigger: string;
  actions: string[];
}

export interface GTMEvent {
  name: string;
  trigger: string;
  parameters?: { [key: string]: string };
}

export interface GA4Audience {
  name: string;
  description: string;
}

export interface ProjectTask {
  phase: string;
  id: string;
  description: string;
  status: 'To-Do' | 'In Progress' | 'Done';
}

export interface BattlePlan {
  phase1: AvatarProfile[];
  phase2_4: LandingPageBlueprint[];
  phase5: TrafficStrategy[];
  phase6: {
    voice: string;
    colors: { trust: string; background: string; action: string };
    design: string;
  };
  phase7: {
    pipeline: string[];
    workflows: GHLWorkflow[];
  };
  phase8: {
    events: GTMEvent[];
    variable: { name: string; type: string; key: string };
    audiences: GA4Audience[];
  };
  phase9: ProjectTask[];
  phase10: {
    launchCalendar: { day: number; focus: string; tasks: string[] }[];
  };
}
