---
layout: ../../components/BlogLayout.astro
title: "Books Collection"
pubDate: 2024-11-18
description: "Now we've got some collections."
author: 'Steven Pate'
tags: ["astro", "blogging", "astro", "learning in public"]
---
## Books Colllection

With this update, I created a books collection. This meant adding a colllection to the content layer that takes all the books arrays from the shelves collection items and adds them to a new collection. This is just a first phase, because this solution will not be able to acommodate a book being on multiple shelves.

I updated the book schema to add some more fields (image, name and notes) to the type, and then created a Book component, with components for some of elements that might be able to use encapsulated functionality (like ISBN, which will have a "copy to clipboard" and a "display as barcode" features) or that to which I might want to pass different properties in different contexts (e.g., sometimes wanting to add a link to a book cover or title, or attribute notes to a particular shelf).

Then I added routes for the books collection as a whole and for individual books. It was hard not to want to fiddle with the CSS rules to display these and the markup to render them semantically. My intention is for the display and layout of the Book and Shelf components to be driven by CSS inheritance, so that toggling between a display of cover(s) and text link(s) or full listing(s) will rely only on changing a data attribute for the containing element

Then of course I added a couple more shelves to provide fodder to play with here, and some books for those.

*Next*: add detail to the book component and acommodate books on multiple shelves.
