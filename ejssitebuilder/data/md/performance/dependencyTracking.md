---
title: Dependency Tracking
order: 15
---

# Dependency Tracking

One of the main reasons for the existence of EJS Site Builder in the first place was to have the fastest possible re-generation of your output pages as you tweak your templates.

Imagine a typical blog with a hundred pages while a post being made up of 5 nested sub-templates. If you make a tweak to one of the deeply nested sub templates, ideally only those pages depending on that sub template would be re-generated. This is what dependency tracking is for, and EJS Site Builder has been designed from the ground up to be good at it.

Here are the ways EJS Site Builder tracks your dependencies.

### Sub Templates

When you "include" [teplates](/templatess/templates/) in other templates using EJS include, EJS Site Builder takes note and builds a dependency tree. After EJS Site Builder builds your site and is left running in the background, it monitors your [template directory](/guide/setup#directories) and if it detects a change, rebuilds based on that dependency tree.

### Generate Script Data

In your [generate scripts](/templates/generateScript/), you have the option of reading files from the [data directory](/guide/setup#directories) to use when generating multiple pages from a template. When you resolve the page request data, you can pass "watchFiles" or "watchGlobs", which tells EJS Site Builder which data dependencies you are interstested in. This does two things. First, if one of the files changed in your data directory matches either watch category, the template in question will be called again. Secondly, and most important, it will be called with inputs.triggeredBy set to the path of the data file that changed, so that you can generate a single page request.

### Global Data

In your templates, you have the option of resolving global data that is accessible in all templates. So what happens when you tweak a template that writes to global data after your site is build and while EJS Site Builder is monitoring your template directory? EJS Site Builder is clever enough to detect which template generate scripts accessed the global data, and will rebuild only those that have.

### Template Script References

If you want to use the same generate script from several templates, you can do so by creating a script-only EJS template. See the source code for a script used these very EJS Site Builder docs you are reading for an example:

[docsMD.ejs](https://github.com/jaunt/EJS-Site-Builder-Docs/blob/main/ejssitebuilder/templates/generators/docsMD.ejs).

The above generate script is referenced from this template:
[pages.ejs](https://github.com/jaunt/EJS-Site-Builder-Docs/blob/main/ejssitebuilder/templates/pages.ejs)

When you follow this pattern, changes to the referenced template will cause any templates referring to it to also be updated.
