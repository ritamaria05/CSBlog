import { defineCollection, z } from "astro:content";

const theorySchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  tags: z.array(z.string()),
});

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  techStack: z.array(z.string()),
  githubUrl: z.string().url().optional(),
  tags: z.array(z.string()),
});

export const collections = {
    'theory': defineCollection({ schema: theorySchema }),
    'projects': defineCollection({ schema: projectSchema }),
};