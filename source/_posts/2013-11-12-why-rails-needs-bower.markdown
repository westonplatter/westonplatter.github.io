---
layout: post
title: "Why Rails Needs Bower"
date: 2013-11-12 12:36
comments: true
categories: 
published: false
---

__Summary: We should use Bower to manage JS/CSS assets and never again create asset focused Rails Engine.__

I bet you're probably thinking I'm some ultra hipster dev who is drinking his second organic wheat grass shake of the morning. :P. Here's the back story and why I think Bower is superior to Rails Engines. 

During the Rails 3.2.x era, I spent 3 months transforming a Rails 2 plugin  into a Rails Engine ([github repo here](https://github.com/CruGlobal/qe)). In additional to packaging Rails MVC components, Engines allow you to include javascript, css, and images. This is really handy since you can then reference and extend these js/css/images in the Main Rails App. Many prominent Rails Engines (devise, spree, backbone-rails) use this package setup to pull their required assets. From a generalist's perspective, I loved it. I could pull in SOA Rails components, complete a feature, and also borrow any elegant frontend styling. Related to the Rails Engine I worked on, defining the assets in the Rails Engine was the best solution at the time.

But Rails Engines were also frustration on 2 main fonts:  
1. Rails engines relied on different `jquery-rails` versions. 
2. Only the popular Frontend Tooling had Rails Engine gems, and it wasn't "dead simple" for frontend devs "engininze".

__Side question:__ You might ask, "Why did you want asset files in an Engine? All you need is the js/css/images in the assets folder and you're good." From a technical perspective, yes, copy and pasting the assets into your app works, but the mere existence of these files does not explain their purpose or what other asset files may depend on them. This becomes deadly for a 10 person dev team. Unexplained architectural decisions create enormous technical debt.

Fast forward 17 months. Javascript frameworks have become effective tools for building rich UIs. __Translated more accurately, Javascript frameworks are no longer just a hipster thing.__ Or maybe I'm the person who's late to the Javascript framework homebrew party. Probably a little of both.

The result, we're adding even more javascript and css to our Rails apps with more stringent dependencies. 

The good thing is this is exactly where Bower excels. It handles Javascript and CSS dependencies like a boss. The only transition we need to make is package the rails' portions of jquery-rails and turbolinks into a Bower packages and add bower_components to the asset compilation path. But more importantly, we need to be embrace multi-dimensional dependency management with open arms.
