---
layout: post
title: "Better iOS Environment Variables"
date: 2013-09-17 14:54
comments: true
categories: ios solutions
published: false
---

After crossing into iOS development after 18 months of intermediate/complex Rails work, I wanted a __extremely simple__ way to configure iOS environment variables. EG, Access the below variables based on build configuration,

    Debug:
      apiUrl:         'http://localhost:3000/api/'
      oauthClientId:  'OAuth 2 Client ID'
      oauthSecret:    'OAuth 2 Secret'
    
    Staging:
      apiUrl:         'http://staging.example.com/api/'
      oauthClientId:  'OAuth 2 Client ID'
      oauthSecret:    'OAuth 2 Secret'
    
    Release:
      apiUrl:         'http://example.com/api/'
      oauthClientId:  'OAuth 2 Client ID'
      oauthSecret:    'OAuth 2 Secret'
      

I pieced together a couple examples (see credits section) and came up with an ARC compliant Enviroment Variables setup. __Feedback encouraged.__

1. add envriment on the build section.
- screen shot before add
- screen shot after add

2. add configuration to the plist.
- screen shot before add
- screen shot after add

3. create env.plist
https://gist.github.com/westonplatter/6445784#file-env-plist

4. add Evironment.h and Environment.m
https://gist.github.com/westonplatter/6445784#file-environment-h
https://gist.github.com/westonplatter/6445784#file-environment-m

5. use in example
https://gist.github.com/westonplatter/6445784#file-loginviewcontroller-m


## Credits

[Rob Pak's](http://www.carbonfive.com/employee/rob-pak) Carbon Five blog post, "[Managing iOS Configurations per Environment in Xcode 4](http://blog.carbonfive.com/2011/06/20/managing-ios-configurations-per-environment-in-xcode-4/)"
