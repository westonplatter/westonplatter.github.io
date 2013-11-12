---
layout: post
title: "Why Rails Needs Bower"
date: 2013-11-12 12:36
comments: true
categories: 
published: false
---

TL;DR; - We should use Bower to package JS/CSS assets, and never again create an asset centric Rails Engine.

I bet you're probably thinking I'm some ultra hipster developer whose drinking his second organic wheat grass cocktail of the morning. :P. Here's the backstory and why I think Bower > Rails Engines. 

During the Rails 3.2.x era, I spent 3 months transforming a Rails 2.0 plugin  into a Rails Engine ([github repo here](https://github.com/CruGlobal/qe)). Rails Engines allowed you to package javascript, css, and images in the Rails Engine itself and then reference those assets in the main Rails you brought the Engine into. Many prominent Rails Engines (devicse, spree, backbone-rails) loaded assets in the engines just in case the developer wanted to stick to original theme. At the time, I loved it. And specifically related to the Rails Engine I worked on, included assets was a great solution for building out the organization's 10 or so apps that had identical stlying . At the time, including assets in Engines was the right tool for the job.

Fast forward 17 months. Amidst Rails 4 and NoSQL becoming normal, Javascript frameworks have become effective tools for building out web and device products. __Translated more accurately, Javascript frameworks are no longer a hipster thing.__ Or maybe I'm the person whoose late to join the Javascript framework homebrew party. 

I was introduced to Javascript as a confusing a unimportant tool for DOM manipulation. I often worked 2-3x as hard to make features work in the calmness of Ruby's simple and non-async server side environment. The biggest frustration is that I didn't understand Javscript's structure or developer conventions seems non-existent. [@splars](https://twitter.com/splars) and [@alanschoenburg](https://twitter.com/alanschoenburg) introduced me to jQuery plguins, but I still thought Javascript was fragmented since depdendencies were unknown and most middle tier projects never pushed for testing.


