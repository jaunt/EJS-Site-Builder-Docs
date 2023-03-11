---
title: Under The Hood
order: 13
---

# Under The Hood

## EJS Site Builder and Node.JS VM

EJS Site Builder runs as a Node JS CLI app and is written in typescript.

Your generate scripts are loaded and run using the Node JS VM. See [Node JS VM Documentation](https://nodejs.org/api/vm.html).

From the docs, please note this carefully:

**The vm module is not a security mechanism. Do not use it to run untrusted code.**

This should not be a surprise to you if you use NPM in your other projects. You should never blindly trust NPM modules, nor the code that you write for your generate scripts.

### ESM vs Common JS

As of Jan 2022, typescript has yet to fully support ESM modules, and the Node JS ecosystem is much more mature when it comes to Common JS. What does this mean for you?

In your [generate scripts](/templates/generateScript/) you have access to "require", which allows you to import modules you add via npm to your project.

If you try to "require" scripts that are ESM only, they will not work.

It might be a while before it's possible to use both ESM and Common JS together, but EJS Site Builder will be updated to follow whatever the community ends up with. For now it will stick to Common JS.

You can follow the typescript issue [here](https://github.com/microsoft/TypeScript/issues/46452)

### Source Code Stats

EJS Site Builder is around 2000 lines of typescript code.

### Dependencies

Here are the NPM modules EJS Site Builder depends on:

#### Build Time Dependencies

- typescript
- @types/node
- git-tag-version

#### Testing Dependencies

- @danglingdev/clifry (functional testing for CLIs)
- diff2html (for making nice test reports)

#### Run Time Dependencies

- @danglingdev/shared-ts (super basic typescript helpers)
- chokidar (monitoring the filesystem for changes)
- commander (CLI interface)
- front-matter (parsing front matter)
- fs-extra (extra handy filesystem utilties)
- ejs (ejs templating)
- micromatch (glob pattern matching)
- nconf (reading configuration files)
- picocolors (colorful console logging)
