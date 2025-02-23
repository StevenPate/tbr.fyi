import EleventyFetch from "@11ty/eleventy-fetch";
import type { bookSchema } from "@content/schemas";
import type { z } from "astro:content";
import { config } from "@site";
import Isbn from "isbn3";

const {
    apiData: { fetch, services },
} = config;

export async function getIsbnDB(book: z.infer<typeof bookSchema>) {
    if (!fetch || !services.isbnDB) {
        return book;
    }

    let goodISBN = Isbn.parse(book.isbn ?? "")?.isValid
        ? book.isbn
        : Isbn.parse(book.identifier ?? "")?.isValid
          ? book.identifier
          : Isbn.parse(book.id ?? "")?.isValid
            ? book.id
            : "";

    if (!goodISBN) {
        return;
    }

    let bookData: any = {};
    const isbndbAPI = `https://api2.isbndb.com/book/${goodISBN}`;
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
        publisher: bookDataFromAPI.publisher || "Publisher Unknown",
        publisherDescription: bookDataFromAPI.synopsis,
        image: bookDataFromAPI.image,
        numberOfPages: bookDataFromAPI?.pages?.toString(),
        publishDate: bookDataFromAPI.date_published,
        subjects: bookDataFromAPI.subjects,
        author: bookDataFromAPI.authors,
        title: bookDataFromAPI.title_long,
        weight,
    };

    return { ...bookFromAPI, ...book };
}
