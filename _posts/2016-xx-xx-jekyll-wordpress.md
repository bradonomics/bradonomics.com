---
title: Jekyll vs WordPress
description: Are static websites really faster? I ran some test to find out.
category: geekery
facebook_image_path:
---

## Security

There seems to be a news story every month about how WordPress has security vulnerabilities. (I would link to some, but there'll be new ones before you read this. Just do a Google News search for "[wordpress security vulnerabilities](https://www.google.com/search?q=wordpress+security+vulnerabilities&tbm=nws)," you'll be reading for days.) Within 24 hours of a big WordPress security stink someone in the static web community will publish an article about how static websites are more secure, faster, and cheaper. It'd be really difficult to argue against the security. Static sites having only HTML, CSS, and Javascript files have very little to hack. Of course some sites need databases, but we'll skip the "do I need a database" discussion for today and focus on security, speed, and cost.

No matter what system you choose, you'll have a technology stack that looks something like this:

0. System Services (think SSH and FTP)
0. Web Server (think Apache or Nginx)
0. Virtualisation (think VMware)
0. The Operating System (think Linux or Windows)
0. Server Hardware
0. Network Infrastructure (think switches, routers, and DNS)
{: reversed="reversed"}

That's going to look the same no mater how you decide to build your website. Any vulnerability that exists there, exists for every system. While any layer can be exploited, most breached systems are at the layers not mentioned here. The majority of the data breaches or exploits we hear about originate with databases or custom app code, usually from outdated plugings or systems that don't stay updated. You heard about the [Panama Papers](https://en.wikipedia.org/wiki/Panama_Papers#Data_security) right? That mess originated from a lack of updates at the CMS and Custom App level.

The six layers above are what every system would sit atop. A CMS like WordPress would also need a database, the CMS itself, and would likely have some type of plugins or custom apps built on top. The stack would then look like this:

0. Custom Apps (think plugins)
0. CMS
0. Database
0. System Services (think SSH and FTP)
0. Web Server (think Apache or Nginx)
0. Virtualisation (think VMware)
0. The Operating System (think Linux or Windows)
0. Server Hardware
0. Network Infrastructure (think switches, routers, and DNS)
{: reversed="reversed"}

Let's assume for the sake of argument that each of these layers are equal in their vulnerabilities. By choosing a static website you've just dropped from nine possible attack points to six. That is a 50% increase in your margin of safety.

I'm not going to beat a dead horse here. Anyone looking at this article is likely familiar with the security risks of database driven content management systems. Let's get on to the real numbers---the fun stuff.

## Expense

There are two things to keep in mind when thinking about your website cost. There are the up-front costs like designer and developer salary or fees, and there are also the on-going costs like hosting and backups.

### Design & Build Time

It's likely the technology your site is built on won't make any difference to your designer---the design time will be the same. But what happens once you've got your HTML and CSS files? How long does it take to build a WordPress site vs a Jekyll site? I can build Jekyll sites faster and would think most developers could also. It's not a significant difference, but it is faster. If the site were to be built 10% faster, how much savings would that be for you?

Let's use some hypothetical numbers. Let's say a developer has quoted you $60/hour and said it will take three weeks to build your site on WordPress. That's $7,200 assuming a 40-hour week. If you could get the site built 10% faster as I suggested above, it would only cost $6,480 to build on Jelyll.

### On-going Maintenance

The design and build numbers aren't very impressive, it's the hosting and maintenance costs where Jekyll really shines.

Your maintenance costs go down almost to 0. It's difficult for me to show you real numbers for this but let's assume you've got FTP running on your server and someone manages to guess or crack your password. They login and change some of your pages. Maybe they add new content or links. All you have to do with Jekyll is copy the contents of your _site directory and overwrite the files on the server. Everything is back to normal. With WordPress there'll be a database restore at a minimum. There are a few plugins out there these days that make that process a little easier but all things considered it's not as easy as copy/paste.

Hosting is a much larger subject but here are the basics. If you want to run WordPress you are going to need a server with PHP, Apache (or Nginx), and MySQL. You could go with one of the cheaper shared hosts such as Bluehost, Host Gator, or Go Daddy, but I'm sure you'll regret it. I don't know anyone who's ever used one of these cheap hosts and been happy about their decision.

Next up the scale is a "managed WordPress host" like WP Engine. It's still shared hosting, but it's a step up in that they have tools to make your site easier to manage. Services like these start around $30/month.

Virtual Private Servers are the way most people go when they're looking for more performance and security. While you can find a VPS for around $12/month, you'll probably pay more---something in the $30-$50 range for a low traffic website and something in the $100s for a higher traffic site.

What else? I guess if you're an über geek, you could go with a service like Digital Ocean for $5/month so long as you can build your own server and manage every aspect. But if you _are_ an über geek why are you even reading this?

#### Free Hosting

Did you say free?

That's right there are free hosting options.

I have more than a few sites with the speed you'll read about below, hosted 100% for free. I've never heard of free WordPress hosting and I'm not sure I'd trust it if someone was offering it, but free hosting for static sites is available with [GitHub Pages](https://pages.github.com/), [GitLab Pages](https://pages.gitlab.io/), and a few other places.

What'll that do for your monthly bills?







For me the decision to go with a static site generator is pretty obvious. The only question then is: do you need a database? The answer is "no" more often than you'd think, and if you can say no to the database I think you should. You'll get more speed, more security, and less complexity, all of which should save you money.