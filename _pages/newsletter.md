---
layout: page
title: Building a Business, In Public
permalink: /newsletter/
redirect_from: /thailand-etcetera/
---

If you've ever wanted to watch over someone's shoulder while they build a business, you are in the right place.

I've wanted to build a business for a long while and have read many stories on the internet of other people's experiences. I've always felt something was missing from those stories. The main thing is, they never seemed to start from the beginning. They never mentioned existing relationships, past work experiences, or any of the things you might need to know if you wanted to follow in their footsteps.

For the next year I intend to write a monthly recap of building a tour company. I'll start from the very beginning—how we got the idea, incorporation, banking, marketing strategy, what we're doing, what is working, and what is not. If you'd like to follow along, add your email below. I've never done this before and it might end in spectacular failure. I hope it won't. No matter what happens, I hope you'll join me.

**Update May 2020:**

This was mostly a failed experiment. A recap is coming soon and will be posted to [the blog]({{ '/articles/' | absolute_url }}). [RSS]({{ "/feed.xml" | absolute_url }}) is your best option for being notified when it is published.

<h2>Archives</h2>

<div class="row justify-content-start">
  {% for post in site.thailand_etcetera %}
    <article>
      <p class="post-title"><a href="{{ post.url | absolute_url }}">{{ post.title | remove: 'Thailand ETCetera: ' }}</a></p>
    </article>
  {% endfor %}
</div>
