---
title: Introduction
order: 1
---

# Introduction

Airfry is static site generator featuring **effecient dependecy tracking** baked-in from the ground up for super-fast change updates even on massive sites. It's **near zero-config** staying out of your way as much as possible. It has **an opinionanted workflow** based on decades of software engineering experience.

Airfry is designed to integrate with modern tools like [vite](/docs/integration/vite) in order to make awesome progressivly enhanced websites with awesome interactivity that can still score triple 100s on lighthouse, and produce awesome SEO results. Of course if you have an unhealthy fear of having any javascript on your webpages whatsoever (you know who you are), Airfry will not try to talk you out of it.

## Concepts

In order to use Airfry effectively, you need to understand two things. The fundamentals of **javascript**, and the basics of html **templating**.

## Workflow

In the course of generating your site, Airfry goes through three phases:

1. Pre Generation
2. Page Generation
3. Post Generation

Each of these phases have hooks where you write javascript and provide templates in order to manipulate and render the data your customers ultimately experience on your website.

### Pre Generation

The [PreGenerate Hook](/docs/templates/preGenerate/) lets you call APIs or run javascript calculations to build up data that might be useful on all your pages.

For example, perhaps you call a headless wordpress API to download and your blog data. You
might use javascript to massage the data, order it, tag it, convert it, etc.

Or more simply you might want to get a version from your git tags to pass to all pages. If you need data that will likely be used across multiple pages, the pre generation hook is the place to create it.

## Page Generation

Airfry runs through all your [templates](/docs/templates/templates/), each one generating one or [more](/docs/templates/pagesFromData/) rendered pages.

Each template can have it's own javascript called a [generate script](/docs/templates/generateScript/). Generate scripts used primarily when you want to spit out multiple pages using the same template. For example if you could write a template to render blog post and feed through the data you pull down from your headless api.

Templates have access to anything you supplied from the [PreGenerate Hook](/docs/templates/preGenerate/), [front matter data](/docs/templates/frontmatter/), and and data pased from [generate scripts](/docs/templates/generateScript/).

## Post Generation

The [PostGenerate Hook](/docs/templates/postGenerate/) lets you use javascript to summarize everything that was written for any purposes you might need.

For example, perhaps you want to write out a json data structure with links to all the page that were generated.

## Install

### Global

npm add @danglingdev/airfry -g

### Project

npm add @danglingdev/airfry
