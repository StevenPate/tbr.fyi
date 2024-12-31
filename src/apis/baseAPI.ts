import type { z } from "astro:content";
import { config } from "@site";
const { apiData } = config;
import { bookSchema } from "@content/schemas";
import { getIsbnDB } from "src/apis/isbnDB";
import { getGoogleBooks } from "./googleBooks";
export function hasAllFields(book: z.infer<typeof bookSchema>) {
    if (!book) {
        return false;
    }
    const requiredFields = apiData?.requireFields
        ? Object.keys(apiData?.required)
        : [];
    const bookFields = Object.keys(book);

    for (const field of requiredFields) {
        if (!bookFields.includes(field)) {
            return false;
        }
    }
    return true;
}
export async function getAPIData(book: z.infer<typeof bookSchema>) {
    const bookWithData: any = {
        ...(await getGoogleBooks(book)),
        ...(await getIsbnDB(book)),
    };
    return bookWithData;
}
