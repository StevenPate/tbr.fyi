---
layout: ../../layouts/BlogLayout.astro
title: "Remote Data for Books"
pubDate: 2024-12-03
description: "Remote Data for Books"
author: 'Steven Pate'
tags: ["astro", "blogging", "astro", "remote data", "learning in public"]
---

I added some functionality to the Book component to check if the required fields (which will be configurable) are all there. If they are not, then we will hit one or more APIs to get the data. 

Right now, I'm connecting to ISBNdb (which is paid) and Google Books API (which is sometimes not the best).

It will still privelege data entered manually. Any data fetched is cached using EleventyFetch. This data is preserved between builds in production using the Netlify cache plugin.

*Next*: Get missing fields from API Data
