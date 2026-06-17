/**
 * All narrative content. Kept deliberately sparse — the motion and the 3D scene
 * carry the story, so copy is reduced to short, punchy lines.
 */

export interface Role {
  title: string;
  essence: string;
}

export interface SystemProject {
  name: string;
  problem: string;
  outcome: string;
}

export interface ImpactStatement {
  audience: string;
  promise: string;
}

export const hero = {
  name: "Rhohart Martel",
  role: "AI Engineer · Systems Thinker",
  curiosityLine: "Everything starts with curiosity.",
  scrollCue: "Scroll",
};

export const learning = {
  label: "Learning",
  title: "Every role, a new lens.",
  roles: [
    { title: "Prompt Engineer", essence: "Language as precision." },
    { title: "Data Analyst", essence: "Signal over noise." },
    { title: "Junior Developer", essence: "Ideas, shipped." },
    { title: "AI Engineer", essence: "Parts into systems." },
  ] satisfies Role[],
};

export const systems = {
  label: "Systems",
  title: "I build systems, not features.",
  flow: ["Problem", "Thinking", "Architecture", "Outcome"],
  projects: [
    {
      name: "Autonomous Ops Agent",
      problem: "Manual triage everywhere.",
      outcome: "Hours → minutes.",
    },
    {
      name: "Knowledge Pipeline",
      problem: "Knowledge trapped in docs.",
      outcome: "Answers you can trust.",
    },
    {
      name: "Creator Scale Engine",
      problem: "Can't clone yourself.",
      outcome: "Scale, same voice.",
    },
  ] satisfies SystemProject[],
};

export const impact = {
  label: "Impact",
  title: "Technology that helps people.",
  statements: [
    { audience: "Businesses", promise: "Automate the repetitive." },
    { audience: "Creators", promise: "Scale the voice." },
    { audience: "Teams", promise: "Move faster, together." },
    { audience: "Talent", promise: "Unlock opportunity." },
  ] satisfies ImpactStatement[],
};

export const future = {
  label: "Future",
  title: "Still building.",
  subtitle: "Still learning. Still exploring.",
  contact: {
    cta: "Let's build a system.",
    email: "hello@rhohart.dev",
    links: [
      { label: "Email", href: "mailto:hello@rhohart.dev" },
      { label: "GitHub", href: "https://github.com/SoloistHart" },
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
    ],
  },
};

export const chapterLabels = [
  "Curiosity",
  "Learning",
  "Systems",
  "Impact",
  "Future",
];
