---
title: Jekyll Dual Language Blogs
description:
category: General Geekery
facebook_image_path:
read_next:
  - title: Jekyll vs WordPress, a Speed Comparison
    url: /jekyll-wordpress-speed/
---

I've been been looking for a dual language solution that will paginate both blogs. Most of the solutions I found wouldn't paginate the secondary language blog since Jekyll's paginator only paginates one blog.

Here are a few of the things I've tried that didn't work:

Plugins:
 - <https://github.com/octopress/multilingual>
 - <https://github.com/Anthony-Gaudino/jekyll-multiple-languages-plugin>
 - <https://github.com/liaohuqiu/jekyll-multiple-languages>
 - <https://github.com/drallgood/jekyll-multilingual>
 - <https://github.com/vwochnik/jekyll-language-plugin>
 - <https://github.com/mrzool/polyglot-jekyll>

I also tried the [Octopress Paginate](https://github.com/octopress/paginate) plugin which is supposed to allow [multilingual pagination](https://github.com/octopress/paginate#multilingual-pagination). I couldn't get that to work either. It would either throw errors or simply wouldn't render.

There are a few tutorials around the interwebs that attempt to get multi language blogs to work on GitHub Pages. The two below came close but neither would paginate the secondary language blog. Although I did get Thai language dates to output correctly after reading Sylvain's post.

Tutorials:

 - [Sylvain Durand's Making Jekyll Multilingual](https://www.sylvaindurand.org/making-jekyll-multilingual/)
 - [Development Seed's Multilingual Jekyll Sites](https://www.developmentseed.org/blog/multilingual-jekyll-sites/)

The [Polyglot Plugin](http://polyglot.untra.io/) by Samuel Volin [[git repo](https://github.com/untra/polyglot)] was the only multi-lingual plugin that worked for me. I didn't need this to work on GitHub pages so being a plugin wasn't a problem, but I did need it to work on CloudCannon—and it didn't. Since the pages in both languages have the same permalink CloudCannon only shows the default language pages and my clients were unable to edit their secondary language pages.

After contacting CloudCannon for ideas, [Ross](https://twitter.com/rphillips_nz) setup a [repo](https://github.com/rphillips-nz/jekyll-dual-language) for me. I didn't like the exact structure he'd used, but it got me thinking. He didn't use plugins and was able to do everything I wanted except the pagination.

So here's what I've got working so far: create a directory for the secondary language and add all the translated documents there. In order to paginate the secondary language blog I'm using the [jekyll-paginate-multiple](https://github.com/scandio/jekyll-paginate-multiple) plugin. I forked Ross's repo and updated it as an example. You can see the [GitHub repo here](https://github.com/bradonomics/jekyll-dual-language).
