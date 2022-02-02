---
title: Setup
order: 2
---

## Install

### Global

npm add @danglingdev/airfry -g

### Project

npm add @danglingdev/airfry

# Near Zero Config

Airfry has very little to configure. You can pass the following options on the command line:

```text
  -i, --input <inputDir>    input directory
  -d, --data <dataDir>      data directory
  -o, --output <outputDir>  output directory
  -o, --public <publicDir>  public directory
  -c, --cache <cacheDir>    cache directory
  -nw, --noWatch            quit after processing all templates
  -wo, --watchOnly          dont process at start, only watch
  -cc, --clearCache         clear cache on start
  -v, --verbose             logging verbosity
  -V, --version             output the version number
  -h, --help                display help for command
```

Or specify in a file called **airfry.json**:
(defaults are shown here)

```javascript
	{
		input:"./airfry/templates",
		data: "./airfry/data",
		output: "./airfry/templates",
		public: "./airfry/public",
		cache: "./airfry/cache",
		verbose:  false,
		noWatch:  false,
		watchOnly:  false,
	}
```

## Input Directory

Templates must be in this directory. Airfry will search recursively at build time and will watch for changes recursively while idle.

## Data Directory

This is where you'd put data files whether JSON, markdown, or any other format you choose to support in your template [generate scripts](/docs/templates/generateScript/). Airfry will monitor this folder when checking for [data dependency changes](/docs/performance/dependencyTracking/).

## Output Directory

This is the only directory Airfry is allowed to write to. This helps prevent accidental generation of files on your file system where you don't expect them when making mistakes in your generate scripts.

## Public Directory

This directory is copied recursively into your output directory, for your convenience. The copying occurs before Airfy runs so it's possible you can overwrite files you write if you are not careful.

## Cache Directory

When you use Airfry [caching](/docs/performance/cache/) all data gets stored in this directory. You can delete it at will, or use the "clearCache" option when building for production if desired.

## Quit Airfry After Build

On a production build, you probably don't want to keep Airfry running after the site is built.

## Don't build, only watch for changes.

If you had to shut down Airfry and for some reason you don't want to regenerate the entire site, you can start Airfry from where you left off.

## Clear Cache on Start

Simply delete the cache directory at start.

## Verbose Logging

Make logging noisier.
