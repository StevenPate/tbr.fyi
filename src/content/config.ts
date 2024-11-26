import { defineCollection, getCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { shelfSchema, postSchema, bookSchema } from "./schemas";
import { slugify } from "src/ts/utils";

const mdShelves = defineCollection({
    loader: glob({ pattern: ["*.md"], base: "src/content/shelves" }),
    schema: shelfSchema,
});

const allShelves = defineCollection({
    loader: async () => {
        const mdShelves = [...(await getCollection("mdShelves"))];
        
        const allMdShelves:any = mdShelves.map((s) => {
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
        const shelves = [...(await getCollection("allShelves"))];
        const allBooks: z.infer<typeof bookSchema>[] = []
        shelves.map((shelf) => {
            const { data: {books}} = shelf;
            books.map((book)=>{
                book.shelfID = shelf.id
                book.id = book.id || book?.isbn || slugify(book?.name || book?.title || '')
                allBooks.push(book)
            })
        })
        return allBooks as { id: string }[];
    },

})

const posts = defineCollection({
    loader: glob({ pattern: "**\/*.md", base: "src/content/posts" }),
    schema: postSchema,
});

export const collections = {
    posts,
    mdShelves,
    allShelves,
    allBooks
};