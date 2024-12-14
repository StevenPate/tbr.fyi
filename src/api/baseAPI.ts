import type { z } from "astro:content";
import { bookSchema } from "@content/schemas";
import { getIsbnDB } from "src/apis/isbnDB";
export function hasAllFields(book: z.infer<typeof bookSchema>) {
    if (!book) {
        return false;
    }
    //TODO check settings for if there are mandatory fields
    //TODO check to see if book has those mandatory fields
    //TODO if not, return false
    return false;
}
export async function getAPIData(book: z.infer<typeof bookSchema>) {
    //TODO check settings to see if api data is to be fetched
    //TODO check settings to see what api service provider is preferred
    //TODO get api data from api service(s) in settings
    //TODO see if ID is valid ISBN, if not see if there is an isbn or isbn13
    const bookWithData: any = await getIsbnDB(book);
    return bookWithData;
}
