const envUrl = process.env.SITE_URL;
export const SITE_URL = (envUrl || 'https://evalbranch.example').replace(/\/$/, '');
export const BASE_PATH = process.env.BASE_PATH || '/';

const site = {
  id: 'evalbranch',
  name: 'Evalbranch',
  tagline: 'Practical notes on AI developer tools — coding agents, LLM APIs, and evaluation.',
  description: 'Evalbranch is a blog about AI developer tools: coding agents, LLM APIs, prompt engineering, and evaluation tooling for builders who ship and ship with AI. Published by the OnlyOrders team.',
  siteUrl: SITE_URL,
  basePath: BASE_PATH,
  locale: 'en',
  publisher: { name: 'OnlyOrders', url: 'https://onlyorders.tech/' },
  theme: {
    accent: '#0f766e',
    accent2: '#b45309',
    bg: '#fbfaf6',
    fg: '#1c1a17',
    muted: '#6b6660',
    card: '#f4f0e8',
  },
  categories: {
    'coding-agents': 'Coding Agents',
    'llm-apis': 'LLM APIs',
    'eval-tooling': 'Evaluation Tooling',
    'prompt-engineering': 'Prompt Engineering',
    'agents': 'Agents',
    'ai-for-business': 'AI for Business',
  },
};

export default site;
