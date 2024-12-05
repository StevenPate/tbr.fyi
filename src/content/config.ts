import { defineCollection, getCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import {
    shelfSchema,
    postSchema,
    bookSchema,
    bookEntrySchema,
} from "./schemas";

const mdShelves = defineCollection({
    loader: glob({ pattern: ["*.md"], base: "src/content/shelves" }),
    schema: shelfSchema,
});

const allShelves = defineCollection({
    loader: async () => {
        const mdShelves = [...(await getCollection("mdShelves"))];

        const allMdShelves: any = mdShelves.map((s) => {
            const {
                id,
                data: { name, books },
                body: notes,
            } = s;
            return {
                id,
                name,
                books,
                notes,
            };
        });
        // add allCSVShelves, allJSONshelves, allCMSshelves, etc.
        return [...allMdShelves];
    },
    schema: shelfSchema,
});

const allBooks = defineCollection({
    loader: async () => {
        const mdShelves = [...(await getCollection("mdShelves"))];

        const shelves: any = mdShelves.map((s) => {
            const {
                id,
                data: { books },
            } = s;
            return {
                id,
                books,
            };
        });

        const allBooks: z.infer<typeof bookEntrySchema>[] = [];
        shelves.map((shelf: any) => {
            const { books, id: shelfID } = shelf;

            books?.map((b: z.infer<typeof bookSchema>) => {
                const shelfEntry = {
                    ...b,
                    identifier: b.isbn || b.identifier || "",
                    collectionInfo: {
                        ...b.collectionInfo,
                        sourceShelf: shelfID,
                    },
                };
                let foundbook = allBooks.find(
                    (entry: any) => entry.id === shelfEntry.identifier
                );
                if (foundbook) {
                    foundbook.shelfEntries.push(shelfEntry);
                } else {
                    allBooks.push({
                        id: shelfEntry.identifier,
                        shelfEntries: [shelfEntry],
                    });
                }
            });
        });
        return allBooks as { id: string }[];
    },
    schema: bookEntrySchema,
});

const posts = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/content/posts" }),
    schema: postSchema,
});

export const collections = {
    posts,
    mdShelves,
    allShelves,
    allBooks,
};
