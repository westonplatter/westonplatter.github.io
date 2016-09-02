---
layout: post
title: "the True Nature of Code"
date: 2013-02-07 00:43
tags:
- reflection
---

Software is communication.

<!-- more -->

Over the past 3 weeks, I've come to value these less:
+ the newest version of bootstrap
+ Rails edge
+ being more agile with JS MVCs
+ using a NoSQL solution

Why?

Software at the core is __User Experience__ (UIX). To be more more technical, UIX is your user talking back and forth via HTTP requests/responses with your server.

The result of UIX being the end goal of software is that having Twitter Bootstap version 2.2 may not enhance your HTTP request/reponse conversation as much as other site changes. Does Bootstrap/Rails/JS MVCs/NoSQL/\<other_buzz_words\> matter in software development matter? Heck yes, but only in proportion how those technical cores affect the quality of the conversation between your user and your server. Over engineering for engineering sake is research, not web app development. Web 3.0 (aka, Web App Development) is about delivering user centric products, not developer feel good tools.

Therefore, here's how I would think about the Bootstrap/Rails/etc buzzwords,

Bootstrap
+ Do we already have a technical CSS style guide we follow?
+ Where are we usng Bootstrap?
+ Where are we __not__ using Bootstrap?
+ Where do we override it? Why?

Rails
+ Are we current with security patches?
+ Slowest queries - where? - why? - how are we fixing them?
+ Where are we caching? Where are we not caching?
+ Do we have data on how the Rails app is responding?

JS MVCs
+ What UIX are we trying to support with a JS MVC?
+ Are we committed to testing our JS MVC?
+ How are we currently receiving JS events from the user?
+ What API end points do we want to tie into to leverage a JS MVC?

NoSQL
+ How many SQL specific operations will we need to change if we move to NoSQL?
+ What's the performance difference between SQL/NoSQL for our app?
+ What's leading use to bring in NoSQL solutions?
+ Can our development team to pull this off in the allotted time?
+ Realistically, how many people on our team already write NoSQL code?


These are my opinions, which could be wrong. I'd love to learn about yours. Either leave a comment or send me an email, westonplatter "at" google email system "dot" com.
