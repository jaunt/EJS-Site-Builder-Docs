---
title: Workflow
order: 1.1
---

# Workflow

In the course of generating your site, EJS Site Builder goes through three phases:

1. Pre Generation
2. Page Generation
3. Post Generation

Each phase has hooks where you write javascript and provide templates in order to manipulate and render the data your customers ultimately experience on your website.

### Pre Generation

The [PreGenerate Hook](/templates/preGenerate/) is your first chance to load and massage data that you'll use to render your pages. You might read files or pull data from your APIs before getting it ready for all of your pages.

For example, perhaps you call a headless wordpress API to download blog data. You'd likely write simple javascript to parse the data, order it, tag it, convert it, cache it, etc.

Or consider the simple case where you want to use the version from your latest git tag to pass to all pages.

If you need data that will likely be used across multiple pages, the pre generation hook is the place to fetch and prepare it.

For data that you only need on a single page (or group of pages generated from a single template), you can do so in the page generation phase.

## Page Generation

EJS Site Builder runs through all your [templates](/templates/templates/), each one generating one or [more](/templates/pagesFromData/) rendered pages.

Each template can have its own hook called a [generate script](/templates/generateScript/). Generate scripts are used primarily when you want to spit out multiple pages using the same template.

For example, you could write a template to render a blog post with a consistent style and layout, with a generate script that feeds the data you pull down from your headless api through the template for each post.

Templates have access to anything you supply from the [PreGenerate Hook](/templates/preGenerate/), [front matter data](/templates/frontmatter/), and of course data passed from [generate scripts](/templates/generateScript/).

## Post Generation

The [PostGenerate Hook](/templates/postGenerate/) can be very useful, but you may not need it at first. It's a hook where EJS Site Builder sends you information regarding everything that was written by EJS Site Builder to your file system while generating your site, for any purposes you might need.

For example, perhaps you want to write out a json data structure with links to all the page that were generated to create a site manifest, or perhaps to format the MPA entry points for the [vite configuration file](/integration/vite/) for production builds.

If
