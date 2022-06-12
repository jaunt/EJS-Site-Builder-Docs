---
title: FAQ
order: 2.1
---

# FAQ

### What are the goals of Templer

- Fast site builds
- Avoid unnecessary site rebuilds like the plague
- Live and Breath Javascript
- Near Zero Config
- Opinionated workflow proven in production.
- [Integrate](/integration/guides/) well with [Vite](https://vitejs.dev/) and other modern tools.

### Why does Templer use EJS Templating?

Templer is a javascript site generator. It wants you do live and breath javascript. EJS is a javascript templating langauge which lends itself very well to the goals of Templer.

### Does Templer support Markdown?

Yes. Templer leaves it up to you to parse your own data files and pass them to your EJS templates using your [generate scripts](/templates/generateScript/).

It's very easy to parse markdown in this way. Have a look at the generate script used to make these Templer Docs. See how it uses the awesome [markdown-it](https://github.com/markdown-it/markdown-it) module to parse markdown files:

[docsMD.ejs](https://github.com/jaunt/templerDocs/blob/main/templer/templates/generators/docsMD.ejs)

The sky is the limit. For example, if you wanted to create "sections" in your markdown files that rendered to different sections of your templates, you could use markdown-it [custom containers](https://github.com/markdown-it/markdown-it-container) and pass what you receive into your template variables.

### Does Templer support other Templating Languages?

Yes, but not as first class citizens. See the question above regarding Markdown. Instead of using the markdown-it NPM module in your [generate scripts](/templates/generateScript/), you could find an NPM module for the templating language of your choice, whether it be [handlebars](https://handlebarsjs.com/), [liquid](https://shopify.github.io/liquid/), [nunjucks](https://mozilla.github.io/nunjucks/) etc.

### Should I use other template languages besides EJS?

It's highly recommended that you only use other templating languages out of necessity, like if you have thousands of existing template content files that you want to render with Templer.

EJS has a massive advantage that it is natively supported by Templer, works with Templer's [built-in dependency tracking](/performance/dependencyTracking/), is fast, simple, and lets you write all your site generation logic in javascript, instead of switching back and forth between other template languages.

### Can I make shortcodes and filters?

See [shortcodes](/guide/shortcodes/) for details.

### How is the Templer source code tested?

It's functionlly tested using [CliFry](https://github.com/jaunt/clifry) a CLI unit testing utility written during the creation of Templer.
