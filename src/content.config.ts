import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

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

const gallery = defineCollection({
  loader: glob({ base: './src/content/gallery', pattern: '**/*.{md,json}' }),
  schema: ({ image }) =>
    z.object({
      src: image(),
      // real alt text enforced at build (spec FR-005): min length + ban junk patterns
      alt: z
        .string()
        .min(15, 'write a real description')
        .refine((s) => !/photo\s*\d|\.webp|\.jpg|img_/i.test(s), {
          message: 'alt text looks like a filename — describe the photo',
        }),
      wide: z.boolean().default(false),
      order: z.number().default(99),
    }),
});

export const collections = { blog, projects, gallery };
