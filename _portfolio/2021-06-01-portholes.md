---
title: Portholes
description: A Ruby app for downloading web articles, Portholes is a replacement for Instapaper or Pocket.
featured_image: /images/portfolio/portholes-thumbnail.jpg
image: /images/portfolio/portholes.jpg
build_year: '2021'
code_url: https://github.com/bradonomics/portholes-sinatra/
requirements: |
  - Save article URL.
  - Allow articles to be saved to folders.
  - Allow sorting of articles in unread folder.

  I first wrote Portholes as a [Rails app](https://github.com/bradonomics/portholes-rails). It included users and [Strip integration](https://github.com/bradonomics/portholes-rails/tree/stripe-payments) for paid usage. I then decided to rebuild Portholes with Sinatra; no users, no payments, simpler. I also moved the [Article parsing to it's own library](https://github.com/bradonomics/portholes-sinatra/blob/master/lib/portholes.rb).
---
