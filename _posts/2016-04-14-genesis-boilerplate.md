---
title: How I Create Custom Genesis Child Themes
description: A step-by-step tutorial on how I create Genesis child themes.
category: General Geekery
facebook_image_path:
---

Most of my custom WordPress development is built on the [Genesis Framework](http://www.shareasale.com/r.cfm?B=346198&U=573840&M=28169&urllink=). It makes building a site much faster and over time I've come to like the way its underlying code is structured. That said, I'm not a fan of how Brian Gardner and company write CSS, so I decided to setup my own "starter kit." I call it [Genesis Boilerplate](https://github.com/bradonomics/genesis-boilerplate/). It includes a custom functions file, Sass based on [Skeleton CSS](http://getskeleton.com/), and [Gulp](http://gulpjs.com/) to compile the Sass and JavaScript and to run [BrowserSync](https://www.browsersync.io/) so I don't have to refresh the page every time I make a change. As for the functions, I included the most common things that make it into my child themes---the things I'd have to write every time anyway.

I intend this to be a living document and as my workflow changes, I'll update the Genesis Boilerplate code as well as this document. If you have questions regarding this document, find errors, or can offer suggestions for a better workflow, please get in touch.

The below assumes you have all dependent software installed already (things like Apache, PHP, MySQL, Node.js, etc.).

## Installing WordPress

I have WordPress installed in `/var/www/html/wordpress` and typically create a new directory for my next project in the `/wp-content/themes` directory. If you don't already have WordPress installed you can install it in the root of `/html` so you don't have to worry with directories when you run [http://localhost/](http://localhost/) in your browser. If you need to have multiple installs, you can create a new directory as I have with `/wordpress`. If you install WordPresss in this subdirectory it will mean that you will access the front-end here: [http://localhost/wordpress](http://localhost/wordpress).

## Setup Theme Directory

I've created a bash script to download the Genesis Boilerplate theme files, the newest version of normalize CSS, and get everything setup the way I like. You can see the [script on GitHub](https://gist.github.com/bradonomics/8a0bcf1f8d40785254edae60bdd13868) or [download it here](https://gist.githubusercontent.com/bradonomics/8a0bcf1f8d40785254edae60bdd13868/raw/79a95a637497ab4dc3b6115b97b59405b690613e/install.sh). To use this script create a child theme directory in `/wp-content/themes` and move the `install.sh` file there. Open a terminal in that directory and type the following to make the script executable.

```shell
chmod +x install.sh
```

Then you'll be able to run the script with this:

```shell
./install.sh
```

Note that this installs Gulp so you'll need to have Node.js installed or it will error. If you don't already have Node.js installed, you can get files and instructions here: [nodejs.org](http://nodejs.org/).

After downloading the files, the script will install Gulp and prompt you for your WordPress directory. Once you enter the directory it will automatically add it to your Gulp file so BrowserSync will serve from the correct directory.

## Setup Theme Directory Manually

If you don't want to use the script to setup your child theme, here are the steps to do it manually.

<ol>
  <li>Clone the Genesis Boilerplate repo into the <code class="highlighter-rouge">/themes</code> directory.</li>
  <li>Rename the directory to your child theme name.</li>
  <li>Open a terminal in the child theme directory and change your git origin.</li>
  <li>
    <p>Run the following to setup node package manager. (If you don’t already have Node.js installed, you can get files and instructions here: <a href="http://nodejs.org/">nodejs.org</a>.)</p>
    <div class="highlighter-rouge"><pre class="highlight"><code>npm init</code></pre></div>
  </li>
  <li>
    <p>Run the following to install and save your gulp settings.</p>
    <div class="highlighter-rouge"><pre class="highlight"><code>npm install --save-dev gulp gulp-sass gulp-autoprefixer gulp-cssnano gulp-concat gulp-uglify gulp-rename browser-sync</code></pre></div>
  </li>
  <li>Add project name (directory name) on line 2 of your gulpfile.</li>
</ol>

## Activate New Theme

If it's not already there, you'll need to add the Genesis Framework files in the `/themes` directory or you'll get an error trying to activate your new child theme. Once you've got the Genesis theme in place and you've successfully setup the Genesis Boilerplate child theme files, you'll need to run `gulp css` in the terminal to build the style.css file. Once you run gulp to generate the CSS file you can activate your child theme in the WordPress dashboard.

## My Development Process

Sometimes I get HTML and CSS files from a designer and all I have to do is the WordPress build. In that case, the job is much more simple and I can jump past most of the steps below. If I'm doing the design myself, I start work in the browser. My Photoshop skills are, well ...let's not talk about that. Just know it's much easier and much faster for me to design in-browser. But sometimes I'm working with a designer who can't (or doesn't have time to) do the PSD extraction and will send me only PSD files. In that case here is my workflow:

1. Look through the PSD files to get a feel for the design.
2. Have a call with the designer to discuss functionality and other things a static design doc can't explain. Also, discuss how the site is to be built; are template file sufficient (meaning the user won't be updating content), or would it be better to make widget areas or use a plugin like [Advanced Custom Fields](https://www.advancedcustomfields.com/) or [Toolset](https://wp-types.com/) to allow for content editing?
3. Start with the simplest page---whatever has the least amount of custom styling. This is typically a post in WordPress nomenclature. (How to extract a PSD file is outside the scope of this article, but to give you some idea how this works: I use [Brackets](http://brackets.io/) which has a PSD extractor tool built-in. You can find some decent tutorials on YouTube if you are new to this.)
4. Once the HTML/CSS has been created, upload the static files to a dev server so the designer can verify things are as they should be before beginning the WordPress build.

## Testing

Once you've got the child theme built, you'll need to test various things before sending the files to your designer, your client, or uploading them to the web.

**1. Add a Variety of Content to WordPress**

You can start by adding theme unit test data (you can find some [here](https://codex.wordpress.org/Theme_Unit_Test), and [here](http://wptest.io/), and [here](https://github.com/chodhary/theme-unit-data-test)). That will only get you post and page data in most cases so if you've built custom post types or custom taxonomies you'll need to manually add some data to check that it's behaving as you expected. Even though the unit test data has posts, I like to add an extra one manually with a really long title---obnoxiously long. You never know when something like that will break a design.

**2. Check Responsive Behavior in the Inspector**

In your inspector tools there is a mobile emulator. Click the button in the top left in Chrome:

<figure><img src="/images/inspector-tools.jpg" alt="Chrome Browser Inspector Tools"></figure>

You can use this to check responsive break points. This will get you about 90%-95% of the way, but some devices---I'm looking at you iOS---will not render things the same as a desktop browser. Which leads us to:

**3. Physical Device Check**

I'm a bit of a Luddite when it comes to mobile technology so I can't test my builds on physical devices without bugging my friends. But if you have some devices on which you can check, you may be surprised that fonts or images don't display the same as the desktop.

**4. Browser Check**

If like me, you did your build in a single browser, you'll need to test that things look the same in other major browsers. The main ones I check are Chrome, FireFox, Safari, and Internet Explorer (or Edge as they are now calling it). It's unlikely you'll have major problems since Gulp is running the auto-prefixer in your CSS, but best to check.

## Packaging Your Theme Files

This part is pretty simple. Once you've built and tested your new child theme, just zip the appropriate files so the theme can be installed and send them to the client or designer or upload the theme to the web. At a minimum this will be a style.css file, but will likely include functions.php, a JavaScript file, and an images directory.

## A Note On Version Control

The one thing not covered above is keeping your theme files in a version control system. I hinted to it in the manual theme setup, but you'll probably want to use [Git](https://git-scm.com/) as it's the industry-leading system, and you'll probably want to set it up from the beginning. Some people prefer to only set it up after the build is complete. That's a decision you'll have to make, but keep in mind that if you have Git setup you can easily revert back to a working state if you add something that crashes WordPress. How to use Git is outside the scope of this article but GitHub has many good tutorials to get you started.