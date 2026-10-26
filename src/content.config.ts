import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: file('./src/data/projects.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    what: z.string(),
    why: z.string(),
    how: z.string(),
    url: z.string(),
    stars: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { blog, projects };
