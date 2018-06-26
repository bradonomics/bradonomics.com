---
title: Jekyll vs WordPress, a Speed Comparison
description: Are static websites really faster? I ran some tests to find out.
category: General Geekery
read_next:
  - title: Paginate a Dual Language Blog in Jekyll
    url: /jekyll-dual-language/
---

WordPress has long been thought of as the weak option for content management on the web. Developers are often telling clients how Drupal is much more powerful, robust, and secure; or they're pitching some custom built solution. Then you've got the WordPress crowd trying to defend their position claiming that "WordPress is more than just a blogging platform." Well, I'm about to flip that on its head. I spend a lot of time on the internet---I've got my 10,000 hours if you know what I mean---and I'd say WordPress is too much system for a majority of websites.

I've long thought static websites are faster, safer, and cheaper. In this article we'll look at some data concerning speed differences between the two systems and see if I'm right.

<figure class="caption">
  <img src="/images/hahaha-lulz.jpg" alt="Cat laughing">
  <figcaption>WordPress is fast?</figcaption>
</figure>

First, let me explain how I came to use static pages and static site generators. In 2014 I was told about a private forum post where the author claimed to rank websites in Google without backlinks. He said by having a super fast website and following a few other directives, he was routinely ranking for difficult keywords without a single backlink. I decided to test this and recreated my WordPress site using only static HTML, CSS, and Javascript. I never saw any significant SERP movement and while I did like the speed of the site, I didn't like the difficulty of updating something like a menu item or the footer---things that were on every page. That's when I went searching for a static website generator. I decided on Jekyll but there are many generators and all of them have the same end result: a set of static HTML files. I use "Jekyll" in the descriptions below but just substitute "static" or your preferred generator if you don't want to use Jekyll.

To test the difference in speed between WordPress and Jekyll, I set up two sites on an unimpressive shared hosting account. I added a large amount of text and a number of pictures to a post to have some data to work with. Once the pages were loaded with the same data I used [GTmetrix](https://gtmetrix.com/) and [WebPagetest.org](http://www.webpagetest.org/) to test the sites.

The [GTmetrix test of the WordPress site](https://gtmetrix.com/reports/demo.bradonomics.com/0bYcDCXc) showed a page load time of 3.7 seconds. That's not bad---better than most according to Google's data. The [GTmetrix test of the Jekyll generated site](https://gtmetrix.com/reports/demo.bradonomics.com/RbLv2xkO) showed a page load time of 1.4 seconds. That's 2.3 seconds faster or 164%. The PageSpeed Grade was 35% better and the YSlow grade was 8% better with the static site.

<figure class="caption">
  <a href="/images/gtmetrix-wordpress-vs-jekyll.jpg"><img src="/images/gtmetrix-wordpress-vs-jekyll.jpg" alt="gt-metrics comparison"></a>
  <figcaption>I loaded the same content in a WordPress install and a Jekyll install, then ran the numbers.</figcaption>
</figure>

WebPagetest.org runs the site twice giving you a better idea of what a first time visitor would see and what a repeat visitor would see once your site has been cached. Here are the numbers:

<figure class="caption">
  <a href="/images/webpagetest-wordpress.jpg"><img src="/images/webpagetest-wordpress.jpg" alt="WordPress test on webpagetest.org"></a>
  <figcaption>First View: 19.625s; Repeat View: 5.607s. <a href="http://www.webpagetest.org/result/160514_A2_CJM/">Full test results here</a>.</figcaption>
</figure>

<figure class="caption">
  <a href="/images/webpagetest-jekyll.jpg"><img src="/images/webpagetest-jekyll.jpg" alt="Jekyll test on webpagetest.org"></a>
  <figcaption>First View: 10.791s; Repeat View: 2.942s. <a href="http://www.webpagetest.org/result/160514_XJ_CKT/">Full test results here</a>.</figcaption>
</figure>

Quite a bit different. The page load time is still faster with the static site---82% faster---but WebPagetest.org is showing a longer load time than GTmetrix.

For me, the decision to go with a static site generator is pretty obvious. The only question then is: do you need a database? The answer is "no" more often than you'd think, and if you can say no to the database I think you should. You'll get more speed, more security, and less complexity, all of which should save you money.
