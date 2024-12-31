import EleventyFetch from "@11ty/eleventy-fetch";
import type { bookSchema } from "@content/schemas";
import type { z } from "astro:content";
import { config } from "@site";
const {
    apiData: { fetch, services },
} = config;

export async function getIsbnDB(book: z.infer<typeof bookSchema>) {
    if (!fetch || !services.isbnDB) {
        return book;
    }
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
    let weight = bookDataFromAPI?.dimensions_structured?.weight
        ? bookDataFromAPI?.dimensions_structured?.weight
        : null;
    const bookFromAPI = {
        publisher: bookDataFromAPI.publisher,
        publisherDescription: bookDataFromAPI.synopsis,
        image: bookDataFromAPI.image,
        numberOfPages: bookDataFromAPI.pages.toString(),
        publishDate: bookDataFromAPI.date_published,
        subjects: bookDataFromAPI.subjects,
        author: bookDataFromAPI.authors,
        title: bookDataFromAPI.title_long,
        weight,
    };

    // const bookWithData = { ...bookFromAPI, ...book };

    return { ...bookFromAPI, ...book };
}
