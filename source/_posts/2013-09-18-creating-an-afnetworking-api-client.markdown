---
layout: post
title: "Creating an AFNetworking API Client"
date: 2013-09-18 08:43
comments: true
categories: 
published: false
---

My 2013 Summer has been a whirlwind of "how do I do this in iOS". I'm far from having iOS dev chops, but I made a significant leap forward by understanding how singletons can be used as "API Service Liaisons". 

example app - You're creating an iOS Twitter client. 

simple JSON request - show this.

cons of simple JSON request - show this.

how do we solve this? - [AFNetworking](https://github.com/AFNetworking/AFNetworking) is one option. auth support. various request types. GC background process. it's tested, built, used by others - CTO likes this.

pull it in.

could create instances - too much work.

Singletons! 

singleton example.

done.

go forth and conquer!
