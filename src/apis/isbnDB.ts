import EleventyFetch from "@11ty/eleventy-fetch";
import type { bookSchema } from "@content/schemas";
import type { z } from "astro:content";

export async function getIsbnDB(book: z.infer<typeof bookSchema>) {
    const { isbn } = book;
    let bookData: any = {};
    const isbndbAPI = `https://api2.isbndb.com/book/${isbn}`;
    try {
        bookData = await EleventyFetch(isbndbAPI, {
            type: "json",
            fetchOptions: {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: import.meta.env.ISBNDB_TOKEN,
                },
            },
        });
    } catch {
        console.log("response error is:", Response.error());
    }
    const { book: bookDataFromAPI } = bookData;
    const bookFromAPI = {
        publisher: bookDataFromAPI.publisher,
        description: bookDataFromAPI.synopsis,
        image: bookDataFromAPI.image,
        numberOfPages: bookDataFromAPI.pages.toString(),
        datePublished: bookDataFromAPI.date_published,
        subjexts: bookDataFromAPI.subjects,
        author: bookDataFromAPI.authors,
        title: bookDataFromAPI.title_long,
    };

    // const bookWithData = { ...bookFromAPI, ...book };

    return { ...bookFromAPI, ...book };
}
