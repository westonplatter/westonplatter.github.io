---
layout: post
title: "Platform Building 1"
date: 2017-12-7 16:04:53 -0700
tags: platform-building
---

I've dabbled with building aggregator platforms a couple times (for LendingClub notes and Reactjs packages). When I started programming more in python, I found it hard to find great python packages. Since the python language has many wide ranging applications (web, data, OS, etc), I thought it would be particularly helpful to build a tool to help me find python packages to ship code faster.

And thus, http://python-toolbox.com was born.

Rather than work on the platform in the vacuum of my own solitude, I wanted to try blogging about the experience as it happens. As with most things in life, less is more.

My only goal right now is for 100 people to tell me the site helped them.

So, here's week 1.

I already built and deployed a very basic version of the site using Rails (because that's what I can ship products in the quickest at the moment). To get there, I relied on a free bootstrap template for the UI and used Let's Encrypt for free SSL. It felt really good to deploy the site even though it only does one thing, list python packages from PyPi and their cumulative download count.

Last week the google bot crawled my site (wicked awesome!) and found 100 or so pages that render HTTP 500s. I'll have to fix those at some time.

This week's focus is to upgrade to bootstrap 4 and release a feature to show releases for each python package and show how many times each release has been downloaded (yep, pretty simple).
