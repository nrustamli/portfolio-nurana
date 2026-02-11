export interface Project {
  id: number
  slug: string
  title: string
  description: string
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'spot-the-artist',
    title: 'Spot the Artist',
    description:
      "An AI-powered Web Application that allows users to discover and store Anna Laurini's famous around their city.",
  },
  {
    id: 2,
    slug: 'protein-llm',
    title: 'Protein LLM',
    description:
      'Masters Project where after training an encoder on domain-level sequences we obtain an embedding space covering 77 million protein',
  },
  {
    id: 3,
    slug: 'galanthus',
    title: 'Galanthus',
    description: 'A brief description of the third project and what it does.',
  },
]
