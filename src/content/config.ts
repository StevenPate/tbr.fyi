import { defineCollection, getCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { shelfSchema, postSchema } from "./schemas";


const mdShelves = defineCollection({
    loader: glob({ pattern: ["*.md"], base: "src/content/shelves" }),
    schema: shelfSchema,
});

const allShelves = defineCollection({
    loader: async () => {
        const mdShelves = [...(await getCollection("mdShelves"))];
        console.log("🚀 ~ loader: ~ mdShelves:", JSON.stringify(mdShelves, null, 2))
        
        const allMdShelves:any = mdShelves.map((s) => {
            const {
                id,
                data: { name, books },
                body: note,
            } = s;
            return {
                id,
                name,
                books,
                note,
            };
        });
        // add allCSVShelves, allJSONshelves, allCMSshelves, etc.
        return [...allMdShelves];
    },
    schema: shelfSchema,
});

const posts = defineCollection({
    loader: glob({ pattern: "**\/*.md", base: "src/content/posts" }),
    schema: postSchema,
});

export const collections = {
    posts,
    mdShelves,
    allShelves,
};