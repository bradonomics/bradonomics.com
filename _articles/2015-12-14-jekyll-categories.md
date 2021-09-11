---
title: Jekyll Categories on GitHub Pages
description: How I implemented categories in Jekyll for GitHub Pages.
type: article
code: true
redirect_to: https://webniyom.com/jekyll-categories/
exclude: true
sitemap: false
---

Categories in Jekyll had me stymied for months. I looked for tutorials and dug through theme files on GitHub but couldn't get it to work.

Well, finally I've got it. I hope category and tag support will be added to Jekyll core one day, but in the meanwhile here is the workaround I used:

## Post Meta Data

First let's create the link to the category archive for your post's meta data. I've called this file post-categories.html and added it in my _includes directory.

If your posts will have a single category:

```html
<span class="entry-categories"><a href="{{ site.url }}/{{ page.category-url }}/" rel="category">{{ page.category }}</a></span>
```

If you want multiple categories you'll need to loop trough them:

```html
{% raw %}{% if post %}
  {% assign categories = post.categories %}
{% else %}
  {% assign categories = page.categories %}
{% endif %}
{% for category in categories %}
  <span class="entry-categories"><a href="{{ site.url }}/{{ page.category-url }}/" rel="category">{{ page.category }}</a></span>{% unless forloop.last %},{% endunless %}
{% endfor %}{% endraw %}
```

In either case, you can call them in your post layout like so:

```liquid
{% raw %}{% include post-categories.html %}{% endraw %}
```

## Category Layout

Next we'll need to create the category archives page. First we'll need a layout to do the loop. This will go in your _layouts directory:

```html
{% raw %}---
layout: default
type: archive
---

<div class="archive-description">
  <h1 class="archive-title">{{ page.category }} Archive</h1>
  {{ content }}
</div>

<div class="wrap">
{% if site.categories[page.category] %}
  <div class="group-year">
    {% for post in site.categories[page.category] %}
      {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
      {% unless year == this_year %}
        {% assign year = this_year %}
        <p>{{ year }}</p>
      {% endunless %}
      <article>
        <h3><a href="{{ post.url | absolute_url }}">{{ post.title }}</a></h3>
        <time>
          <span class="month">{{ post.date | date: "%b" }}</span>
          <span class="day">{{ post.date | date: "%d" }}</span>
          <span class="year">{{ post.date | date: "%Y" }}</span>
        </time>
      </article>
    {% endfor %}
  </div>
{% else %}
  <p>There are no posts in this category.</p>
{% endif %}
</div>{% endraw %}
```

This is the loop from my blog, but you can create any type of loop you want. Look around the web, there are many examples.

You'll notice I've added "type" in the front matter, this is used to add a body class to my category archives pages for CSS styles. I've added it this way:

```liquid
{% raw %}{% if page.type %} class="{{ page.type }}"{% endraw %}
```

## Category Page

Next you'll need to add a page for every category. This is the tedious part I hope will one day be added to Jekyll core, but for now, I'm adding the category name (in lowercase) and category permalink in the front matter. The body of the file is my archive intro text.

One note on your permalinks, if you're moving from WordPress and you want your links to have /category/category-name/, add exactly that. I prefer not to use the /category/ sub-directory.

```markdown
---
layout: category
title: Language Learning
description: Some thoughts on adult language learning that fall outside the standard techniques of translation and grammar study.
category: language learning
permalink: /language-learning/
---
If you were hoping for some original research, sadly I have none. What follows has already been written about elsewhere and by people far smarter than me. What I hope to bring to the conversation is a simplified version of their work and my story in discovering it. But more importantly, I hope to introduce you to some thoughts on adult language learning that fall outside the standard techniques of translation and grammar study.
```

Don't forget to include the _pages directory in your _config.yml file or Jekyll won't pickup the pages during the build:

```yaml
{% raw %}include: ["_pages"]{% endraw %}
```

## Styles

Since your category names need to be in lowercase for the category pages, you'll probably want to "override" this on the front end. You can add text-transform to your archive titles like so:

```css
.archive-title {
  text-transform: capitalize;
}
```

And that's it ... categories on GitHub Pages.
