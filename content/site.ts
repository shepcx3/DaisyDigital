import type { IconName } from "@/components/icons/Icon";

// ✿ ALL site copy lives here, so the client can edit words without touching components.
// Display/UI copy is lowercase on purpose. Form labels + legal stay clear and conventional.
// Anything marked [placeholder] still needs real info from Daisy Digital.

export const brand = {
  name: "daisy digital",
  tagline: "creative by nature",
  motto: "stay cute. stay current. stay on everyone's feed.",
  signoff: "love, daisy digital xo",
  email: "hello@daisydigital.ca", // [placeholder] real inbox still to come from the client
  instagram: "daisydigital.ca",
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
  plusTab: ["new idea loading…", "another tab? obviously.", "tab 401 unlocked ✦", "this is how erica lives"],
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

// Erica's list. [placeholder] statuses are set by hand below until the live version is built.
export const presenceLabels = {
  online: "online",
  busy: "busy",
  loggedOff: "logged off",
  doomScrolling: "doom-scrolling",
  brb: "brb",
  onACall: "on a call",
  vacay: "vacay mode",
} as const;
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
  presence: Presence;
  listening: string;
  trend: string;
};

// Roles, badges, profile lines and bios are from the owner's handwritten notes.
export const team: Member[] = [
  {
    slug: "erica",
    name: "erica",
    role: "the girl with 400 tabs open",
    title: "professional trend stalker",
    icon: "tab",
    icon2: "message",
    accent: "blue",
    badge: "404 DOLL",
    bio: "determined to stay young and culturally aware. professional trend stalker. convinced she knows what's cool before everyone else does <3",
    mood: "ahead of the game",
    status: "chronically online",
    presence: "doomScrolling",
    listening: "jonas brothers earliest work",
    trend: "ootd",
  },
  {
    slug: "bri",
    name: "bri",
    role: "the everything girl",
    title: "moving in silence, behind the magic",
    icon: "bolt",
    icon2: "film",
    accent: "pink",
    badge: "WHIMZ",
    bio: "moving in silence, behind the magic. knows a thing or two about making a viral video.",
    mood: "research scrolling",
    status: "recording",
    presence: "busy",
    listening: "your favourite artist's favourite artist",
    trend: "out of office ♡",
  },
  {
    slug: "philie",
    name: "philie",
    role: "photography princess",
    title: "the right angles will get you very far",
    icon: "camera",
    icon2: "sparkle",
    accent: "violet",
    badge: "FLASHY",
    bio: "wants to teach you the skills you need to grow. the right angles will get you very far.",
    mood: "calculating",
    status: "monitoring the next best lens",
    presence: "brb",
    listening: "the nerdiest podcast you can think of",
    trend: "how to make your photos cinematic",
  },
  {
    slug: "jany",
    name: "jany",
    role: "model of the year",
    title: "camera ready at all times",
    icon: "star",
    icon2: "message",
    accent: "pink",
    badge: "ANGEL",
    bio: "pretty face. nails always done. lashes on. camera ready at all times.",
    mood: "nonchalant beauty",
    status: "selfie mode on ✓",
    presence: "online",
    listening: "everyone else's playlist",
    trend: "jellycat videos",
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
  notFound: { title: "lost in the scroll", body: "this daisy hasn't bloomed yet. the page you're looking for is probably in one of erica's 400 tabs." },
  thanks: { title: "you're so on trend", body: "message received. we'll slide back into your inbox soon." },
  password: { title: "daisy digital", body: "this page is for the girls (and their clients) only. enter the password to peek." },
};
