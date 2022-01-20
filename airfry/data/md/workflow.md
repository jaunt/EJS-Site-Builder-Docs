---
title: Workflow
---

# Workflow

In the course of generating your site, Airfry goes through three phases:

1. Pre Generation
2. Page Generation
3. Post Generation

### Pre Generation

The [PreGenerate Hook](/docs/templates/preGenerate/) lets you call APIs or run javascript calculations to build up data that might be useful on all your pages.

For example, perhaps you call a headless wordpress API to download and [cache](/docs/performance/cache/) all post json data. You
might use javascript to massage the data, order it, tag it, convert it, etc.

Or more simply you might want to get a version from your git tags to pass to all pages.

## Page Generation

Airfry runs through all your [templates](/docs/templates/templates/), generating one or [more](/docs/templates/pagesFromData/) output html pages for each.

Templates have access to anything you supplied from the [PreGenerate Hook](/docs/templates/preGenerate/), [front matter data](/docs/templates/frontmatter/), and from your [generate scripts](/docs/templates/generateScript/).

## Post Generation

The [PostGenerate Hook](/docs/templates/postGenerate/) lets you use javascript to summarize everything that was written for any purposes you might need.

For example, perhaps you want to write out a json data structure with links to all the page that were generated.
