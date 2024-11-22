import { z } from "astro:content";

export const bookSchema = z.object({
    isbn: z.string().optional(),
    title: z.string().optional(),
    notes: z.string().optional(),
});

export const shelfSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    note: z.string().optional(),
    books: z.array(bookSchema).optional(),
});

export const postSchema = z.object({
    layout: z.string().optional(),
    title: z.string().optional(),
    author: z.string().optional(),
    image: z.object({
        url: z.string().optional(),
        alt: z.string().optional(),
    }).optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags:z.array(
        z.string().optional(),
    )
  })
