---
title: Image Handling
order: 15.7
---

# Recommendations for Image Handling

Many existing site generators make it easy for you to add images to your sites using special short codes which trigger image processing scripts to run tools like [Sharp](https://sharp.pixelplumbing.com/) to re-size and/or create multiple variations of images, resulting in a nice html img tags with the correct srcset etc. While this is conveninent for sure, and you could achieve this with a bit of work using Airfry, Airfry recommends against doing this, as it breaks one of our commandments:

Rebuilds should be fast!

#### TODO: Explain better ways including levereging vite plugins etc.
