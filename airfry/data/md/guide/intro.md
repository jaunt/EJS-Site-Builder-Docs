---
title: Introduction
order: 1
---

# Introduction

_What's awesome about Airfry?_

**Effecient dependecy tracking** baked-in from the ground up, giving you super-fast change updates, even on massive sites with thousands of pages.

**Powered by your javascript**. There's no configuration file to balloon out of control. Airfry doesn't offer "yet another plug-in architecture" because we already have NPM for that. If you love javascript, you'll be right at home.

**Minimal** by design. It doesn't pollute itself with half-baked semi-useful blogging features that are never quite enough. It's written in typescript, is under 2000 lines of code, and will always be kept as simple as possible.

**Logical and opinionanted workflow** based on decades of software engineering experience. It helps you make the right decisions early on so you don't end up with something unmanagable down the road.

**Integrates with modern tools** like [vite](/integration/vite/) in order to make awesome progressivly enhanced websites. Yes, you can score triple 100s on lighthouse and produce awesome SEO results, and not be judged for wanting a little javascript on your pages.

## Quick Start

- Create an empty project using its vanilla template ([see vite docs](https://vitejs.dev/guide/)).

```bash
npm init vite@latest airfryStarter --template vanilla
cd airfryStarter
npm install
```

- Install airfry

```bash
npm add @danglingdev/airfry
```

- Create an airfry directory where all the "ingredients" go, and a src directory where vite will serve your site from:

```bash
mkdir airfry
mkdir src
```

- Create vite.config.js

```bash
touch vite.config.js
```

- Point vite root to the new src directory. Add the following to vite.config.js:

**vite.config.js**

```javascript
// vite.config.js
export default {
  // config options
  root: "./src",
};
```

- Create some templates to render the site

```bash
mkdir -p airfry/templates
touch airfry/templates/index.ejs
touch airfry/templates/random.ejs
```

- Add some html, front matter, and template variables to index.ejs

**index.ejs**

```javascript
---
generate: /
title: Crispy and healty
---

Title: <%= title %>
<% for (let i=0; i<10; i++) {
  const page = "page_" + i.toString() %>
  <br />
  <a href="/random/<%= page %>/"><%= page %></a>
<% } %>
```

- Add some html, front matter, and a silly generate script to random.ejs

**random.ejs**

```html
---
generate: /random/*
---

Random: <%= title %>
<br />
<a href="/">home</a>

<script generate>
  const pages = 10;
  let toRender = pages;
  for (let i = 0; i < pages; i++) {
    const num = Math.floor(Math.random() * 100);
    setTimeout(() => {
      generate({
        path: "page_" + i.toString(),
        data: {
          title: num.toString(),
        },
      });
      toRender--;
      if (toRender == 0) {
        resolve();
      }
    }, num);
  }
</script>
```

- Install concurrently to be able to trigger airfry and vite concurrently:

```bash
npm install concurrently
```

- Update package.json to be able to trigger airfry

**package.json**

```bash
... snip ...
  "scripts": {
    "airfry": "npx airfry --noWatch",
    "serve": "concurrently --kill-others \"npx airfry\" \"npm run dev\"",
... snip ...
```

- Tell airfry where to find the templates and where to output the results

```bash
touch airfry.json
```

**airfry.json**

```javascript
{
  "options": {
    "input": "./airfry/templates",
    "output": "./src"
  }
}
```

- Turn on the airfryer!

```bash
npm run serve
```

Vite should run very quickly and your new site should be ready to explore, probably at http://localhost:3000 but check the console output to be sure.

If you make changes to your templates, your site should update quickly. When you are done, exit airfry and vite with ctrl-c from the console.

### What happened?

**index.ejs** is pretty simple. You can see how data from front matter gets rendered into the template.

Important: Airfry uses [EJS](https://ejs.co/) for its primary template language because it allows us to use javascript everywhere. You may be wondering if Airfry supports other template languanges. Yes and no. If you have a bunch of existing content in some other template language, it's very easy to use it in your Airfry project.

For example, these very docs are written in markdown.

But if you want to take advantage of ultra efficient dependency tracking, recursive template wrapping, and all the other cool stuff Airfry does for you, you need to use EJS. Checkout the [FAQ](/guide/faq/) for more information.

**random.ejs** is an obscure example of how Airfry generate scripts work. Generate scripts can be specified inline with your templates, and are responsible for doing something with data before sending it one or more times through your template. Generate scripts are asynchronous so you can take as long as you need, as demonstrated by the setTimeout call in our example. There are of course many other useful generate script features available.
