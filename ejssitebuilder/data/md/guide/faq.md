---
title: FAQ
order: 2.1
---

# FAQ

### What are the goals of EJS Site Builder

- Fast site builds
- Great DX
- Avoid unnecessary site rebuilds like the plague
- Live and Breath Javascript
- No extra features specific to blogs etc
- No plugins other than using NPM packages in your generate scripts
- Near Zero Config
- Opinionated workflow proven in production.
- [Integrate](/integration/guides/) well with [Vite](https://vitejs.dev/) and other modern tools.

### Why does EJS Site Builder use EJS Templating?

EJS Site Builder is a javascript site generator. It wants you do live and breath javascript. EJS is a javascript templating langauge which lends itself very well to the goals of EJS Site Builder.

### Does EJS Site Builder support Markdown?

Yes. EJS Site Builder leaves it up to you to parse your own data files and pass them to your EJS templates using your [generate scripts](/templates/generateScript/).

It's very easy to parse markdown in this way. Have a look at the generate script used to make these EJS Site Builder Docs. See how it uses the awesome [markdown-it](https://github.com/markdown-it/markdown-it) module to parse markdown files:

[docsMD.ejs](https://github.com/jaunt/EJS-Site-Builder-Docs/blob/main/ejssitebuilder/templates/generators/docsMD.ejs)

The sky is the limit. For example, if you wanted to create "sections" in your markdown files that rendered to different sections of your templates, you could use markdown-it [custom containers](https://github.com/markdown-it/markdown-it-container) and pass what you receive into your template variables.

### Does EJS Site Builder support other Templating Languages?

Yes, but not as first class citizens. See the question above regarding Markdown. Instead of using the markdown-it NPM module in your [generate scripts](/templates/generateScript/), you could find an NPM module for the templating language of your choice, whether it be [handlebars](https://handlebarsjs.com/), [liquid](https://shopify.github.io/liquid/), [nunjucks](https://mozilla.github.io/nunjucks/) etc.

### Should I use other template languages besides EJS?

It's highly recommended that you only use other templating languages out of necessity, like if you have thousands of existing template content files that you want to render with EJS Site Builder.

EJS has a massive advantage that it is natively supported by EJS Site Builder, works with EJS Site Builder's [built-in dependency tracking](/performance/dependencyTracking/), is fast, simple, and lets you write all your site generation logic in javascript, instead of switching back and forth between other template languages.

### Can I make shortcodes and filters?

See [shortcodes](/guide/shortcodes/) for details.

### How is the EJS Site Builder source code tested?

It's functionlly tested using [CliFry](https://github.com/jaunt/clifry) a CLI unit testing utility written during the creation of EJS Site Builder.
