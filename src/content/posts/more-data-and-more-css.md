---
layout: ../../layouts/BlogLayout.astro
title: "More Data and More CSS"
pubDate: 2024-12-30
description: "More Data and More CSS"
author: 'Steven Pate'
tags: ["astro", "blogging", "astro", "remote data", "learning in public"]
---

Added baseAPI to connect to ISBNdb and Google Books API. There is also a config checking for: whether we want to fetch data, what services to use to fetch data, and if there are required fields to look for. Missing required fields will trigger a fetch from selected services if configured to do so.

I also made the Book component use some the Data Lists HTML element for all the data. Something about the way this is still clear and readable if no CSS is used at all is appealing to me. I added data attributes and itemprops for all the elements too, which will allow me to precent microdata using the schema.org vocabulary rom the [https://schema.org/Book](https://schema.org/Book) type.

I did add some pretty basic CSS for the book display. Because I want it to be scalable and also nested in a satisfying (and hopefullly intelligible) way, I went way down the rabbit hole a few times on this one for sure.  The idea is that the layout and elements displayed will be controlled by the "display format" data attributes, which should be easy to change on the fly. So changing "display-format" from "card" to "cover" to "full" to "inline" will change how the component rendeers.

I also added some data components which seem kind of supurfluous but which I want to play with: Awards (for prizes and such), Data (where I'll display JSON data in a "details" disclosure element for now), and Weight (because ISBNDB provides this, and I have an interesting idea to take advantage of it).

Lastly, I started using isbn3 dependancy for checking ISBN validity.

*Next*: Tweaking components, adding markdown/mdx for descriptions and notes, adding copy-to-clipboard and barcode rendering for ISBN/EANs, and both caching and optimizing images.