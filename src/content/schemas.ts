import { z } from "astro:content";

export const bookSchema = z.object({
    about: z.array(z.string().optional()).optional(),
    author: z.array(z.string().optional()).optional(),
    award: z.array(z.string().optional()).optional(),
    bookFormat: z
        .enum([
            "AudiobookFormat",
            "EBook",
            "GraphicNovel",
            "Hardcover",
            "Paperback",
        ])
        .optional(),
    description: z.string().optional(),
    illustrator: z.array(z.string().optional()).optional(),
    image: z.string().optional(),
    id: z.string().optional(),
    identifier: z.string().optional(), //???
    isbn: z.string().optional(),
    name: z.string().optional(),
    notes: z.string().optional(),
    numberOfPages: z.string().optional(),
    publishDate: z.string().optional(),
    publisher: z.string().optional(),
    publisherDescription: z.string().optional(),
    title: z.string().optional(),
    translator: z.array(z.string().optional()).optional(),
    collectionInfo: z
        .object({
            sourceShelf: z.string().optional(),
            dateCreated: z.string().datetime().optional(),
            dateModified: z.string().datetime().optional(),
            dateFinished: z.string().datetime().optional(),
            primaryShelf: z.boolean().optional(),
            notes: z
                .object({
                    content: z.string().optional(),
                    source: z.string().optional(),
                    attribution: z.string().optional(),
                    dateCreated: z.string().datetime().optional(),
                    dateModified: z.string().datetime().optional(),
                })
                .optional(),
            links: z
                .array(
                    z.object({
                        type: z.enum(["Info", "Purchase"]).optional(),
                        text: z.string().optional(),
                        url: z.string().optional(),
                        accessed: z.string().datetime().optional(),
                    })
                )
                .optional(),
        })
        .optional(),
});

export const bookEntrySchema = bookSchema.extend({
    id: z.string().optional(),
    shelfEntries: z.array(bookSchema),
});

export const shelfSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    notes: z.string().optional(),
    books: z.array(bookSchema),
});

export const postSchema = z.object({
    layout: z.string().optional(),
    title: z.string().optional(),
    author: z.string().optional(),
    image: z
        .object({
            url: z.string().optional(),
            alt: z.string().optional(),
        })
        .optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string().optional()),
});
