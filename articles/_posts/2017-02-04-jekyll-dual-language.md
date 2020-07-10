---
title: Paginate a Dual Language Blog in Jekyll
description: Using a Gem to allow pagination of a secondary blog in Jekyll.
code: true
redirect_to: https://webniyom.com/jekyll-dual-language/
exclude: true
sitemap: false
---

I've been looking for a dual language solution that will paginate both blogs and have finally got something working. Most of the solutions I found wouldn't paginate the secondary language blog since Jekyll will only paginate one blog by default.

## TL;DR

I'm paginating the secondary language blog with Georg Schmidl's [Jekyll Paginate Multiple plugin](https://github.com/scandio/jekyll-paginate-multiple). I've setup an [example repo here](https://github.com/bradonomics/jekyll-dual-language).

## What Did Not Work

Here are a few of the plugins I've tried that did *not* work for me:

Plugins:

 - [Multilingual by Octopress](https://github.com/octopress/multilingual)
 - [Jekyll Multiple Languages by Anthony Gaudino](https://github.com/Anthony-Gaudino/jekyll-multiple-languages-plugin)
 - [Jekyll Multiple Languages by Huqiu Liao](https://github.com/liaohuqiu/jekyll-multiple-languages)
 - [Jekyll Multilingual by Patrice Brend'amour](https://github.com/drallgood/jekyll-multilingual)
 - [Jekyll Language Plugin by Vincent Wochnik](https://github.com/vwochnik/jekyll-language-plugin)
 - [Polyglot Jekyll by Mattia Tezzele](https://github.com/mrzool/polyglot-jekyll)
 - [Polyglot by Samuel Volin](http://polyglot.untra.io/)

I also tried the [Octopress Paginate](https://github.com/octopress/paginate) plugin which is supposed to allow [multilingual pagination](https://github.com/octopress/paginate#multilingual-pagination). I couldn't get that to work either. It would throw errors or simply wouldn't build.

There are a few tutorials around the interwebz that attempt to get multi-language blogs to work on GitHub Pages---meaning without plugins. The two below came close but neither would paginate the secondary language blog.

Tutorials:

 - [Sylvain Durand's Making Jekyll Multilingual](https://www.sylvaindurand.org/making-jekyll-multilingual/)
 - [Development Seed's Multilingual Jekyll Sites](https://www.developmentseed.org/blog/multilingual-jekyll-sites/)

## What Did Work

I didn't need this to work on GitHub pages so being a plugin wasn't a problem, but I did need it to work on CloudCannon. After contacting CloudCannon for ideas, [Ross](https://mobile.twitter.com/rphillips_nz) setup a [repo](https://github.com/rphillips-nz/jekyll-dual-language) for me and sent me an email explaining the structure. I didn't like the exact structure he'd used, but it got me thinking. He didn't use plugins and was able to do everything I wanted except the pagination.

So here's what I've got working so far:

 1. Create a directory for the secondary language. In the example repo, I've used `/th`.
 2. Add all the translated documents there---the secondary `index.html`, `about.html`, etc.
 3. Be sure to add `include: [th]` to your `_config.yml` file so Jekyll knows where those files live.

## Pagination Settings

In order to paginate the secondary language blog, I'm using the [jekyll-paginate-multiple](https://github.com/scandio/jekyll-paginate-multiple) plugin. The plugin's README file does a good job of explaining the setup. My paginate settings in the `_config.yml` file are slightly different since I'm not outputting the English blog in a `/en` directory.

```coffeescript
paginate_multiple:
  - paginate: 3
    paginate_path: '/blog/page:num/'
    sub_dir: '/en'
  - paginate: 3
    paginate_path: '/th/blog/page:num/'
    sub_dir: '/th'
```

## Language Switcher

Since the secondary language is added as a subdirectory we'll need to add "/th" before the page URL or remove it if we're on a Thai language page.

```html
{% raw %}{% if page.language == 'en' %}
  <a class="menu-item" href="{{ page.url | prepend: '/th' }}">ภาษาไทย</a>
{% endif %}
{% if page.language == 'th' %}
  <a class="menu-item" href="{{ page.url | remove: '/th' }}">English</a>
{% endif %}{% endraw %}
```

## Dates

In order to have blog post dates in the appropriate language, we've got to tell Jekyll what those dates are called. Not only did I want the dates displayed in the correct language, I wanted them ordered differently. Since I was working with Thai language I wanted it to output in day-month-year and in English month-day-year like this:

 - 4 กุมภาพันธ์ 2017
 - February 4, 2017

This code is 100% swiped from [Sylvain Durand's Making Jekyll Multilingual](https://www.sylvaindurand.org/making-jekyll-multilingual/) article.

I created a `date.html` file in the `_includes` directory with the following:

```liquid
{% raw %}{% capture hide %}

{% if include.mode != 'month' %}

  {% assign day = include.date | date: "%-d" %}

{% endif %}

{% if page.language == 'th' %}

  {% assign m = include.date | date: "%-m" %}
  {% case m %}
    {% when '1' %}
      {% capture month %}มกราคม{% endcapture %}
    {% when '2' %}
      {% capture month %}กุมภาพันธ์{% endcapture %}
    {% when '3' %}
      {% capture month %}มีนาคม{% endcapture %}
    {% when '4' %}
      {% capture month %}เมษายน{% endcapture %}
    {% when '5' %}
      {% capture month %}พฤษภาคม{% endcapture %}
    {% when '6' %}
      {% capture month %}มิถุนายน{% endcapture %}
    {% when '7' %}
      {% capture month %}กรกฎาคม{% endcapture %}
    {% when '8' %}
      {% capture month %}สิงหาคม{% endcapture %}
    {% when '9' %}
      {% capture month %}กันยายน{% endcapture %}
    {% when '10' %}
      {% capture month %}ตุลาคม{% endcapture %}
    {% when '11' %}
      {% capture month %}พฤศจิกายน{% endcapture %}
    {% when '12' %}
      {% capture month %}ธันวาคม{% endcapture %}
  {% endcase %}

{% else %}

  {% capture month %}{{ include.date | date: "%B" }}{% endcapture %}

{% endif %}

{% capture year %}{{ include.date | date: "%Y" }}{% endcapture %}

{% endcapture %}{% endraw %}
```

I then created two time-files in the `_includes` directory: `page-time.html` and `post-time.html`. I use <code class="highlighter-rouge">{% raw %}{% include page-time.html %}{% endraw %}</code> when I'm calling from within a page or a post since I need to call `page.date`. And I use <code class="highlighter-rouge">{% raw %}{% include post-time.html %}{% endraw %}</code> when I'm calling inside a loop where I've used <code class="highlighter-rouge">{% raw %}{% for post in paginator.posts %}{% endraw %}</code> and need to call `post.date`.

Be sure to call the date file (<code class="highlighter-rouge">{% raw %}{% include date.html date=page.date %}{% endraw %}</code>) in your page and post time-files.

## TODO

I'm still looking for a way to paginate categories. If you know of a way or find some documentation or a tutorial that might lead somewhere, please get in touch.
