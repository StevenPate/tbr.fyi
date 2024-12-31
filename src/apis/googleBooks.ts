import Isbn from "isbn3";
import EleventyFetch from "@11ty/eleventy-fetch";
import { config } from "@site";
const {
    apiData: { fetch, services },
} = config;
import type { bookSchema } from "@content/schemas";
import type { z } from "astro:content";

export async function getGoogleBooks(book: z.infer<typeof bookSchema>) {
    if (!fetch || !services.googleBooks) {
        return book;
    }
    const { isbn } = book;

    if (!isbn) {
        return false;
    }

    // Let's make sure we've got a good ISBN, and can get the ISBN10 and ISBN13
    const goodISBN = Isbn.parse(isbn)?.isValid ? Isbn.parse(isbn) : null;
    if (!goodISBN) {
        return;
    }
    const isbn13 = goodISBN?.isbn13 || "";
    const isbn10 = goodISBN?.isbn10 || "";

    let bookData: any = {};
    const googleBooksAPI = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn13}&key=${import.meta.env.GOOGLE_BOOKS_TOKEN}`;

    try {
        bookData = await EleventyFetch(googleBooksAPI, {
            duration: "100d",
            type: "json",
            directory: "../.cache",
            fetchOptions: {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        });
    } catch {
        bookData = { totalItems: 0 };
        console.log("response error is:", Response.error());
    }

    if (!bookData?.items) return book;
    if (bookData?.items[0].selfLink) {
        try {
            bookData = await EleventyFetch(bookData.items[0].selfLink, {
                duration: "100d",
                type: "json",
                directory: "../.cache",
                fetchOptions: {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            });
        } catch {
            bookData = { totalItems: 0 };
            console.log("response error is:", Response.error());
        }
    }

    const bookPropertiesData =
        bookData?.totalItems > 0
            ? bookData.items[0].volumeInfo
            : bookData.volumeInfo;
    const { imageLinks } = bookPropertiesData;
    const bookFromAPI = {
        title: bookPropertiesData.title,
        subtitle: bookPropertiesData.subtitle,
        author: bookPropertiesData.authors,
        publishDate: bookPropertiesData.publishedDate,
        publisher: bookPropertiesData.publisher,
        publisherDescription: bookPropertiesData.description,
        numberOfPages: bookPropertiesData.pageCount,
        isbn10,
        isbn13,
        isbn,
        image:
            imageLinks?.extraLarge ||
            imageLinks?.large ||
            imageLinks?.medium ||
            null,
        // googleBooksLink: bookPropertiesData.infoLink,
    };
    return { ...bookFromAPI, ...book };
}
