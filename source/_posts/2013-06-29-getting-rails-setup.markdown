---
layout: post
title: "Installing Rails on Mac"
date: 2013-06-29 21:17
comments: true
categories: rails teaching
published: true
---

How to setup a Mac with OSX 10 for Ruby on Rails development.

<!-- more -->

### 1. Getting a C Compiler
Since Ruby is a C based programming language, you'll need a C compiler to write and execute Ruby code. You can get one through Apple's XCode. Let's install it.

Open the Apple App store, and search for "XCode." Install it. It's a huge application, so don't be surprised when it takes a long time to install.

After it installs, open XCode, and on the upper left hand bar, click on XCode > Preferences. Go to the Downloads tab (see picture), and download the Command Line Tools package by clicking "Install".

{% img center /images/2013/installing-rails/xcode_command_line_tools.png 600 600 'image' 'images' %}

### 2. Install Homebrew
Homebrew is a package management system for Mac similar to apt-get for Linux.

To install, go to [Homebrew](http://mxcl.github.com/homebrew) and follow their instructions.


### 3. Install Sqlite and MySQL
You want to be able to use both Sqlite and MySQL are your Rails Database, so let's install them both. We'll use __homebrew__ to do this.

    brew install sqlite

    brew install mysql

Note: For MySQL on your personal development machine, I'd suggest keeping the defauly root MySQL username ```root``` and no password. It makes development configs simpler and easier in my opinion.


### 4. Install git
You'll need to install ```git``` to use another tool we're going to install. Again, we'll use Homebrew to install ```git```.

    brew install git


### 5. Install RVM to install Ruby
RVM (Ruby Version Manager) is a tool to manage which Ruby verion you're using. The beauty of RVM is that you can upgrade between Major/Minor/Patch Level releases no problem.

To install RVM, enter this in the terminal,

    \curl -L https://get.rvm.io | bash


### 6. Install Rails
Now install rails via the ```gem``` command line tool,

    sudo gem install rails


### 7. Generate a Rails app
Now you're all ready to create a rails application from scratch.

    rails new my_application
