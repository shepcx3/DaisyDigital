import type { IconName } from "@/components/icons/Icon";

// ✿ ALL site copy lives here, so the client can edit words without touching components.
// Display/UI copy is lowercase on purpose. Form labels + legal stay clear and conventional.
// Anything marked [placeholder] still needs real info from Daisy Digital.

export const brand = {
  name: "daisy digital",
  tagline: "creative by nature",
  motto: "stay cute. stay current. stay on everyone's feed.",
  signoff: "love, daisy digital xo",
  email: "hello@daisydigital.com", // [placeholder] real inbox
  // Formspree (or similar) endpoint for forms. Empty = forms fall back to opening the visitor's email app.
  formEndpoint: "",
};

export const nav = [
  { href: "/", label: "home", icon: "daisy" },
  { href: "/work/", label: "work", icon: "tab" },
  { href: "/team/", label: "team", icon: "heart" },
  { href: "/careers/", label: "careers", icon: "watering-can" },
  { href: "/contact/", label: "contact", icon: "bee" },
] as const;

export const marquee = ["stay cute", "stay current", "stay on everyone's feed"];

export const microcopy = {
  loading: "brb brainstorming…",
  read: "read 2:47 am",
  onTrend: "you're so on trend",
  shy: "don't be shy",
  empty: "this daisy hasn't bloomed yet",
  lost: "lost in the scroll",
  plusTab: ["new idea loading…", "another tab? obviously.", "tab 474 unlocked ✦", "this is how erica lives"],
};

export const home = {
  label: "currently obsessed: your brand",
  intro: "chronically online, creatively curious and always a few scrolls ahead.",
  body: "we make brands look good, sound cool and yes, we're probably already working on your next idea.",
  cta: "give us a buzz",
  polaroids: [
    { caption: "brainstorm @ 2:47am", icon: "message" },
    { caption: "content day", icon: "film" },
    { caption: "on set, obviously", icon: "sparkle" },
  ],
  stickyNote: ["answer the dms", "catch the trend early", "make your brand the one they screenshot"], // [placeholder] client is changing this wording
  servicesTitle: "what we do",
  servicesIntro: "four ways we keep your brand a few scrolls ahead.",
  services: [
    { name: "social media", icon: "heart", blurb: "your feed, handled. we plan it, post it and keep it looking like you." },
    { name: "content", icon: "film", blurb: "photos and videos made for the feed, from the first random idea to the final cut." },
    { name: "strategy", icon: "tab", blurb: "we track what's trending, work out what fits your brand and turn it into a plan." },
    { name: "consulting", icon: "sparkle", blurb: "already have a team? we'll look at what you're doing and show you what to change." },
  ],
  workTitle: "brands we've worked with",
  workIntro: "and more. the full stories are blooming soon.",
  teamTitle: "meet the team",
  teamCta: "meet the team",
  ctaTitle: "got an idea? we're already obsessed.",
  ctaBody: "tell us about your brand, your big idea, or your random 2am thought.",
};

export type CaseStudy = {
  slug: string;
  brand: string;
  label: string;
  services: string[]; // [placeholder] confirm what DD actually did for each brand
  summary: string;
  featured?: boolean;
};

// No results or claims are written in until the client confirms them.
export const work: CaseStudy[] = [
  { slug: "bloom", brand: "bloom", label: "case study", services: [], summary: "", featured: true },
  { slug: "glossier", brand: "glossier", label: "case study", services: [], summary: "", featured: true },
  { slug: "lay-low", brand: "lay low", label: "case study", services: [], summary: "", featured: true },
  { slug: "strong", brand: "strong", label: "case study", services: [], summary: "" },
  { slug: "holistically-hip", brand: "holistically hip", label: "case study", services: [], summary: "" },
  { slug: "dreamers-club", brand: "dreamers club", label: "case study", services: [], summary: "" },
];

export const presenceLabels = { online: "online", available: "available", busy: "busy", away: "away" } as const;
export type Presence = keyof typeof presenceLabels;

export type Member = {
  slug: "erica" | "bri" | "philie" | "jany";
  name: string;
  role: string;
  title: string;
  icon: IconName;
  icon2: IconName;
  accent: "blue" | "pink" | "violet";
  badge: string;
  bio: string;
  mood: string;
  status: string;
  presence: Presence; // what the status list shows. [placeholder] not live yet: set by hand here
  presenceNote: string; // the little line under their name, like an old messenger status
  listening: string;
  trends: [string, string, string];
};

export const team: Member[] = [
  {
    slug: "erica",
    name: "erica",
    role: "the girl with 473 tabs open",
    title: "professional trend stalker",
    icon: "tab",
    icon2: "message",
    accent: "blue",
    badge: "404 DOLL",
    bio: "determined to stay young, hip and culturally aware, professional trend stalker. chronically online and convinced she knows what's cool before everyone else does.",
    mood: "already over it (it was trending tuesday)", // [placeholder]
    status: "chronically online",
    presence: "online",
    presenceNote: "tab 474 is open", // [placeholder]
    listening: "a sound that'll trend next week", // [placeholder]
    trends: ["[trend one]", "[trend two]", "[trend three]"], // [placeholder]
  },
  {
    slug: "bri",
    name: "bri",
    role: "the everything girl",
    title: "ceo of moving in silence",
    icon: "bolt",
    icon2: "film",
    accent: "pink",
    badge: "VIRAL",
    bio: "ceo of moving in silence, from concepts to creations, she's the girl behind the magic. a little bit of everything and knows a thing or two about making a viral video. if it starts as a random thought, she'll probably turn it into a campaign.",
    mood: "turning a random thought into a campaign", // [placeholder]
    status: "recording",
    presence: "busy",
    presenceNote: "brb, filming", // [placeholder]
    listening: "the audio she's about to make viral", // [placeholder]
    trends: ["[trend one]", "[trend two]", "[trend three]"], // [placeholder]
  },
  // Philie and Jany are made-up placeholders until the client sends the real details.
  {
    slug: "philie",
    name: "philie",
    role: "our photographer",
    title: "always has a camera out",
    icon: "camera",
    icon2: "sparkle",
    accent: "violet",
    badge: "NEW",
    bio: "our photographer. if it looks good on your feed, philie probably shot it. [placeholder bio]",
    mood: "waiting for the good light", // [placeholder]
    status: "on set",
    presence: "away",
    presenceNote: "chasing golden hour", // [placeholder]
    listening: "the shutter, mostly", // [placeholder]
    trends: ["[trend one]", "[trend two]", "[trend three]"], // [placeholder]
  },
  {
    slug: "jany",
    name: "jany",
    role: "our model and middleman",
    title: "knows everyone, somehow",
    icon: "star",
    icon2: "message",
    accent: "pink",
    badge: "NEW",
    bio: "our model and middleman. in front of the camera, and in the middle of every group chat that gets it booked. [placeholder bio]",
    mood: "camera ready, phone charged", // [placeholder]
    status: "in the group chat",
    presence: "available",
    presenceNote: "text me", // [placeholder]
    listening: "whatever's on at the shoot", // [placeholder]
    trends: ["[trend one]", "[trend two]", "[trend three]"], // [placeholder]
  },
];

export const careers = {
  label: "now hiring cuties",
  title: "we're growing",
  intro: "think you'd bloom here? send us your resume and a little about you.",
  submit: "let's bloom",
  sent: `almost there! email your resume to ${brand.email} 🌱`,
};

export const contact = {
  label: "read at 2:47am",
  title: "give us a buzz",
  intro: "tell us about your brand, your big idea, or your random 2am thought.",
  submit: "slide into our inbox",
  // shown under the button while brand.formEndpoint is empty (the form opens the visitor's email app)
  mailtoNote: "this opens your email app with your message ready to send.",
  direct: "rather write it yourself?",
  services: ["Social media", "Content", "Strategy", "Consulting", "All of the above"],
  errors: {
    name: "we need something to call you ✿",
    email: "that email looks a little lost in the scroll",
    message: "don't be shy, tell us a little something",
    send: "lost in the scroll 😵‍💫 try again in a sec",
  },
};

export const footer = {
  chat: [
    { from: "them", text: "heyyy bestie 💌" },
    { from: "them", text: "stay cute. stay current. stay on everyone's feed." },
    { from: "me", text: "ur so on trend omg" },
  ],
  newsletter: "new message: get our trend alerts (no spam, pinky promise)",
  newsletterCta: "subscribe",
  links: [
    { href: "/work/", label: "see the work" },
    { href: "/contact/", label: "slide into our inbox" },
    { href: "/careers/", label: "join the team" },
  ],
};

export const screens = {
  notFound: { title: "lost in the scroll", body: "this daisy hasn't bloomed yet. the page you're looking for is probably in one of erica's 473 tabs." },
  thanks: { title: "you're so on trend", body: "message received. we'll slide back into your inbox soon." },
  password: { title: "daisy digital", body: "this page is for the girls (and their clients) only. enter the password to peek." },
};
