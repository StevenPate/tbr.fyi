---
layout: ../../layouts/BlogLayout.astro
title: "Books On Lists"
pubDate: 2024-12-03
description: "Details on books, and books on multiple lists"
author: 'Steven Pate'
tags: ["astro", "blogging", "astro", "learning in public"]
---

For this update, I wanted just to add more details to the book component, and then adjust the content data structure in order to display which shelves a book is on. Eventually, this would facilitate looking at a book and then browsing the other shelves it is on, to offer an avenue of discovery.

I ended up doing a lot of work to make this happen. One reason was that, for better or worse, I want to use a data structure derived from https://schema.org/Book (which I see this as the best collaboratively managed, widely distributed representation of a "book") and this opens the door to a lot of different pieces of data.

I have put in minimal, structural affordances for things I don't want to worry about right now , (subject areas, contributors beyond author and translator, format, etc.) and there are plenty that I expect to add later (country of orign, editor, genre, language, size, thumbnail, translator, age range, etc.).

Then there are the elements I put some work into acommodating out of the gate: title, author, description, ISBN, publisher, publication date, page count. I also added an affordance for "collection info" for a book entry on a shelf, where things that pertain to **my** curation of the book here might belong (notes, status, dates, etc.).

I'm using an identifier (almost always the ISBN), which allows me to identify "shelf locations" for the work. Later, I can envision identifying other ISBNs for the same work.

In order to see this in action, I created a list which has some items on other lists: I put some of the shorter things I read this year on a "backlist packlist" shelf, which I have plans to expand into "great books for the backpack."

We're still only dealing with data that I enter manually, so the next step might be a big one.

*Next*: Get missing fields from API Data
