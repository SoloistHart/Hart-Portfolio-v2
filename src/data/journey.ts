/**
 * All narrative content lives here so the story can evolve independently of the
 * 3D scene and layout. Every entry is framed around how the work was *thought
 * through*, not which tools were used.
 */

export interface Role {
  title: string;
  arc: string;
  lesson: string;
}

export interface SystemProject {
  name: string;
  problem: string;
  thinking: string;
  architecture: string;
  outcome: string;
}

export interface ImpactStatement {
  audience: string;
  promise: string;
}

export const hero = {
  name: "RhoHart",
  role: "AI Engineer · Systems Thinker",
  curiosityLine: "Everything starts with curiosity.",
  intro:
    "I build AI systems that turn messy, manual work into calm, dependable automation. This is not a list of projects — it is how I think.",
  scrollCue: "Scroll to begin the journey",
};

export const learning = {
  eyebrow: "Stage 02 — Learning",
  title: "Every role taught me a different piece of the puzzle.",
  lede: "Curiosity compounded into capability. Each step added a new way to see a problem — language, data, software, then systems.",
  roles: [
    {
      title: "Prompt Engineer",
      arc: "Learned to speak to models with intent.",
      lesson: "Precision of language is precision of thought.",
    },
    {
      title: "Data Analyst",
      arc: "Learned to find the signal inside the noise.",
      lesson: "Decisions get better when the question gets sharper.",
    },
    {
      title: "Junior Developer",
      arc: "Learned to turn ideas into running software.",
      lesson: "Shipping teaches what planning never can.",
    },
    {
      title: "AI Engineer",
      arc: "Learned to connect models, data, and code into systems.",
      lesson: "The value is in the connections, not the parts.",
    },
  ] satisfies Role[],
};

export const systems = {
  eyebrow: "Stage 03 — Systems Thinking",
  title: "I design systems, not features.",
  lede: "A living ecosystem where data flows, agents communicate, and pipelines execute. Each project below is told as a way of thinking.",
  projects: [
    {
      name: "Autonomous Ops Agent",
      problem: "A team drowned in repetitive back-office decisions.",
      thinking:
        "Map the decisions, separate the reversible from the irreversible, and let an agent own the reversible ones with a human in the loop for the rest.",
      architecture:
        "Event triggers → retrieval over policy docs → planning agent → tool calls → audit log → human review queue.",
      outcome: "Hours of manual triage became minutes of oversight.",
    },
    {
      name: "Knowledge Pipeline",
      problem: "Critical knowledge was trapped in scattered documents.",
      thinking:
        "Treat knowledge as a flowing pipeline, not a static archive — ingest, structure, embed, and keep it continuously fresh.",
      architecture:
        "Source connectors → normalization → chunking + embeddings → vector store → grounded answers with citations.",
      outcome: "Answers became trustworthy because they were traceable.",
    },
    {
      name: "Creator Scale Engine",
      problem: "A creator could not grow without cloning themselves.",
      thinking:
        "Encode their taste and voice into reusable components so output scales without losing identity.",
      architecture:
        "Brand memory → multi-step generation → quality gates → scheduling → feedback loop that learns from what performs.",
      outcome: "Output multiplied while the voice stayed unmistakably theirs.",
    },
  ] satisfies SystemProject[],
};

export const impact = {
  eyebrow: "Stage 04 — Impact",
  title: "Technology matters when it helps people.",
  lede: "Past the architecture, the point is always human. The systems exist to give people back time, momentum, and opportunity.",
  statements: [
    {
      audience: "Businesses",
      promise: "Automate the repetitive so teams can do the meaningful.",
    },
    {
      audience: "Creators",
      promise: "Scale output without losing the voice that made it matter.",
    },
    {
      audience: "Teams",
      promise: "Remove friction so good people move faster together.",
    },
    {
      audience: "Talent",
      promise: "Unlock opportunities that skill alone could not reach.",
    },
  ] satisfies ImpactStatement[],
};

export const future = {
  eyebrow: "Stage 05 — The Future",
  title: "Still building. Still learning. Still exploring.",
  lede: "The network continues beyond what is visible. Some nodes are unfinished. Some paths are unexplored. The journey is not complete.",
  contact: {
    cta: "Let's build a system together.",
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
