---
layout: post
title: "How to setup Bower within Rails"
date: 2013-12-28 19:21
comments: true
categories: 
published: false
---

After arguing for a Bower/Rails integration in [Why Rails needs Bower](/blog/2013/why-rails-needs-bower/), I want to show how Bower can be integrated within Rails.

The objective is for all JS/CSS tooling and libraries to be manageed by Bower while still holding to a standard Rails MVC.  In other words, we'll still use Rails to render the view templates rather than moving to a Rails-API/Javascript templated frontend. All we're doing is using Bower to govern the CSS and JS dependencies.

### 1. Create a new Rails and Controller/View
Create a new Rails app with a controller and view to test that JS/CSS files are properly included.

    rails new Simple
    cd simple 
    rails generate controller home index

Add this in `simple/app/views/home/index.html.erb` view to test that Bootstrap is properly setup.

    <h1>Hello, <span class="glyphicon glyphicon-globe"></span> !</h1>

### 2. Setup Bower
Install node if you haven't already. Joynet has [awesome install instructions](https://github.com/joyent/node/wiki/installation).

Use NPM to setup `package.json`. 
    
    npm init

Install Bower and save as a development dependency. 
    
    npm install --save-dev bower
    
User bower to setup the `bower.json`.
    
    bower init

By default, Bower installs packages into `simple/app/bower_components`.  In my opinion, it simplifies the codebase to install Bower components in the root directory, `simple/bower_modules`. We'll have Bower install components there by adding a `.bowerrc` file.
    
    {
      "directory": "bower_components"
    }

Instruct Bower to to install `jQuery`, `jquery-ujs`, and `bootstrap`.
    
    bower install --save jquery jquery-ujs bootstrap

Looking in `simple/bower_components` reveals that Bower installed all of [jquery's project ](https://github.com/jquery/jquery) into `simple/bower_components`. This is a problem. All we need and want is the `jquery.js` file.

### 3. Use bower-install to copy files into `vendor/assets`
We can use [bower-installer](https://github.com/blittle/bower-installer) to copy specific files from `simple/bower_components` into the `simple/vendor/assets` folder for them to be included during the Rails' AssetPipeline compilation process.

Install `bower-installer` and save as development dependency,
    
    npm install --save-dev bower-installer

Modify the `bower.json` according to `bower-installer` [README](https://github.com/blittle/bower-installer#bower-installer) telling `bower-installer` where to copy files, 
    
    {{ diff bower.json }}
    {{ diff application.rb }}

Run bower-installer
    
    bower-install
    
### 4. Modify Gemfile and application.js files
Remove jquery-rails and jquery-ujs from the Gemfile.  
    
    {{ diff Gemfile && no diff Gemfile.lock }}

Run `bundle install`.
    
Modify the application.js file. __Notice that the javascript file associated with `jquery-ujs ` is actually named `rails.js`.__
    
    {{ applicaiton.js diff && applcation.css diff }}

### 5. Test this out.
Boot up rails and test this out by going to, [http://localhost:3000/home/index](localhost:3000/home/index).

We have an issue. The Bootstrap font-face is not coming through since we do not see a world image. Why? [`bootstrap.css#LL2356`](https://github.com/twbs/bootstrap/blob/master/dist/css/bootstrap.css#L2356) expects fonts to be available at `../fonts` but Rails makes this available at `/assets`. :(

### 6. Fix the font-face issue.
Here's my solution. It is by no means right, and I'm 200% open to feedback. 

Override the `@font-face` declaration in the applicaiton.css file, 
    
    {{ diff application.css }}

Remove the `@font-face` declaration from Boostrap source code so you don't have HTTP 404s when the page loads. You'll have to remove the `@font-face` each time you run `bower-installer`, but it's not cool to HTTP 404s showing up in the browser console.
    
    {{ diff bootstrap.css }}

## Please provide feedback
I'm hopeful that the dev community embraces better tools for wholistically managing our dependencies. 
