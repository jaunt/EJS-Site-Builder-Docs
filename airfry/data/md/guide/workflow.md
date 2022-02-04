---
title: Workflow
order: 1.1
---

# Workflow

In the course of generating your site, Airfry goes through three phases:

1. Pre Generation
2. Page Generation
3. Post Generation

Each phase has hooks where you write javascript and provide templates in order to manipulate and render the data your customers ultimately experience on your website.

### Pre Generation

The [PreGenerate Hook](/docs/templates/preGenerate/) lets you call APIs or run javascript calculations to build up data that might be useful on all your pages.

For example, perhaps you call a headless wordpress API to download and your blog data. You
might use javascript to massage the data, order it, tag it, convert it, cache it, etc.

Or more simply you might want to get a version from your git tags to pass to all pages. If you need data that will likely be used across multiple pages, the pre generation hook is the place to create it.

For data that you only need on a single page (or group of pages generated from a single template), you can use page generation hooks:

## Page Generation

Airfry runs through all your [templates](/docs/templates/templates/), each one generating one or [more](/docs/templates/pagesFromData/) rendered pages.

Each template can have it's own javascript called a [generate script](/docs/templates/generateScript/). Generate scripts are used primarily when you want to spit out multiple pages using the same template. For example, you could write a template to render blog post have its generate script feed through the data you pull down from your headless api.

Templates have access to anything you supplied from the [PreGenerate Hook](/docs/templates/preGenerate/), [front matter data](/docs/templates/frontmatter/), and of course the data pased from [generate scripts](/docs/templates/generateScript/).

## Post Generation

The [PostGenerate Hook](/docs/templates/postGenerate/) may not be as useful for simple sites. It lets you use javascript to summarize everything that was written for any purposes you might need.

For example, perhaps you want to write out a json data structure with links to all the page that were generated.
