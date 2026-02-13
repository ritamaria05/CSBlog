import { defineCollection, z } from "astro:content";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  tags: z.array(z.string()).optional(),
});

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  techStack: z.array(z.string()),
  githubUrl: z.string().url().optional(),
});

export const collections = {
    'theory': defineCollection({ schema: blogSchema }),
    'projects': defineCollection({ schema: projectSchema }),
};