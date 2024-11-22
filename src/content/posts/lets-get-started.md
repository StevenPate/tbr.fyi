---
layout: ../../components/BlogLayout.astro
title: "Let's Get Started"
pubDate: 2024-11-18
description: "This post should take us from an empty folder to a first commit and functional but bare demo TBR.FYI site."
author: 'Steven Pate'
tags: ["astro", "blogging", "astro", "learning in public"]
---
## Let's get started

I am choosing to build this project using [Astro](https://astro.build/). The ability to ship rendered HTML and less javascript with the options of using the [Astro Islands architecture](https://docs.astro.build/en/concepts/islands/) and potentially taking advantage of incremental static regeneration with [Netlify](https://www.netlify.com/) will give me the most flexibility, I think. I like that it is UI-framework agnostic, and can be as simple or as complex as I would like it to be.

So I'm going to starting with [Astro 5.0 Beta](https://astro.build/blog/astro-5-beta/), because features in this release will be the Content Layer and Server Islands features could be quite useful to me right out of the gate.

Great! We have something installed. What else?

* I'm using [open-props](en-props.style) because It gives me a little bit of a leg up in setting up my own css props for design consistency from the outset. 
* I added a Layout component for the default HTML and a shelf component for a curated list of ISBNs.
* I created the most minimal shelf I could (using markdown) and a collection for "shelves" in the content layer.
* I added a "Shelves" route in /src/pages, which will map over the items in the shelves collection.
* I created another collection, route and layout for this blog post, so I can try and document every step I take.

This is about as minimal as I can get and still feel like it has the DNA of the thing I want it to evolve into. It looks... incomplete. But, I will write a minimum viable readme file and commit.

*Next*: make this shelf look like something, and add a second book.
