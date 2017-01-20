---
title: Genesis Boilerplate
description: A starting point for custom WordPress sites using the Genesis Framework.
category: portfolio
code_url: https://github.com/bradonomics/genesis-boilerplate/
platform: WordPress
featured_image_path: /images/portfolio/genesis-boilerplate-thumbnail.jpg
---

Early on I realized certain CSS structures and certain functions were in every WordPress theme I was building. I decided to setup a bare-bones theme that would have all these things already included. A starting point for new custom design projects build on the Genesis Framework.

The repo is setup with a `/dev` directory and a gulpfile if you want to use [Gulp](http://gulpjs.com/). The `/dev` directory is where your Sass and pre processed JavaScript will live. If you prefer not to use Sass or Gulp, you'll need to manually move all the CSS from the .scss files to a styles.css file in the root directory.

A blog post about how I build Genesis child themes can be found here: [bradonomics.com/genesis-boilerplate/](http://bradonomics.com/genesis-boilerplate/)

Originally I used [Skeleton](http://getskeleton.com) as a base for the CSS, but after many rewrites it's hard to find much of the original Skeleton code.

For the Genesis Framework, check out <http://studiopress.com> for documentation and details.

## Getting Started

To start your new child theme with Genesis Boilerplate, you can [Download the files from GitHub](https://github.com/bradonomics/genesis-boilerplate/archive/master.zip) (or clone the repo: `git clone https://github.com/bradonomics/genesis-boilerplate.git`). You can then upload the files under Appearances -> Themes in your Wordpress Dashboard, although you'll probably want to add some styles before you do. Remember this is a starting point for a custom theme and pretty vanilla as is. If it doesn't make it into 90% of my custom theme work, it isn't in the boilerplate.

### What's in the download?

The download includes SCSS files and a functions.php file to get you started building a custom Genesis child theme. There are also HTML samples with standard Genesis HTML output so you (or your designer) will know what CSS classes to use and have an HTML template to follow.

You'll want to add a [screenshot.png file](http://codex.wordpress.org/Theme_Development#Screenshot) so something will show in the Wordpress Dashboard.

## License

The Genesis Framework itself and [Genesis Boilerplate](https://github.com/bradonomics/genesis-boilerplate/blob/master/LICENSE.md) are released under the [GPL-2.0 License](http://www.gnu.org/licenses/gpl-2.0.html).
