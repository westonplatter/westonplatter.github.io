---
layout: post
title: "How to setup Bower within Rails"
date: 2013-12-28 19:21
comments: true
categories: rails tools
published: true
---

After arguing for a Bower/Rails integration in [Why Rails needs Bower](/blog/2013/why-rails-needs-bower/), I want to show how Bower can be integrated within Rails.

The objective is for all JS/CSS tooling and libraries to be managed by Bower while still holding to a standard Rails MVC.  In other words, we'll still use Rails to render the view templates rather than moving to a Rails-API/Javascript templated frontend. All we're doing is using Bower to govern the CSS and JS dependencies.

[Example Rails app on Github](https://github.com/westonplatter/example_rails_bower)

[Commits](https://github.com/westonplatter/example_rails_bower/commits/master)


### 1. Create a new Rails and Controller/View

Create a new Rails app with a controller and view to test that JS/CSS files are properly included.
```sh
rails new simple
cd simple 
rails generate controller home index
```

Add this in `simple/app/views/home/index.html.erb` view to test that Bootstrap is properly setup.
```html
<h1>Hello, <span class="glyphicon glyphicon-globe"></span> !</h1>
```
    

### 2. Setup Bower

Install node if you haven't already. Joynet has [great NodeJS install instructions](https://github.com/joyent/node/wiki/installation).

Use NPM to setup `package.json`.     
```sh
npm init
```
    
Install Bower, save as a development dependency. I chose to ignore the `node_modules` directory, but you can decide that for yourself.
```sh
npm install --save-dev bower
```
    
User bower to setup the `bower.json`.    
```sh
bower init
```
    
By default, Bower installs packages into `simple/app/bower_components`.  In my opinion, it simplifies the codebase to install Bower components in the root directory, `simple/bower_modules`. We'll have Bower install components there by adding a `.bowerrc` file.    
```json
{
  "directory": "bower_components"
}
```

Instruct Bower to to install `jQuery`, `jquery-ujs`, and `bootstrap`.    
```sh
bower install --save jquery jquery-ujs bootstrap
```

Looking in `simple/bower_components` reveals that Bower installed all of [jquery's project ](https://github.com/jquery/jquery) into `simple/bower_components`. This is a problem. All we need and want is the `jquery.js` file.


### 3. Use `bower-install` to copy files into `vendor/assets`

We can use [bower-installer](https://github.com/blittle/bower-installer) to copy specific files from `simple/bower_components` into the `simple/vendor/assets` folder for them to be included during the Rails' AssetPipeline compilation process.

Install `bower-installer` and save as development dependency,    
```sh
npm install --save-dev bower-installer
```
    
Modify the `bower.json` according to `bower-installer` [README](https://github.com/blittle/bower-installer#bower-installer) telling `bower-installer` to install the js, css, and random font files into the vendor assets directory. Since Rails by default does not pickup the `vendor/assets/fonts` directory, we'll add this to the Rails asset path too.
```diff
// =========== bower.json

    "test",
    "tests"
  ],
+  "install": {
+    "path": {
+      "css": "vendor/assets/stylesheets",
+      "js": "vendor/assets/javascripts",
+      "eot": "vendor/assets/fonts",
+      "svg": "vendor/assets/fonts",
+      "ttf": "vendor/assets/fonts",
+      "woff": "vendor/assets/fonts"
+    }
+  },
  "dependencies": {
    "jquery": "~2.0.3",
    "jquery-ujs": "*",
```
```diff
# ======== application.rb

module Simple
  class Application < Rails::Application
    
    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de
+    
+    config.assets.paths << Rails.root.join('vendor', 'assets', 'fonts')
  end
end
```

Run bower-installer. You should see the asset source files appear in the vendor folders.
```sh
bower-installer
```
    
### 4. Modify Gemfile and application.js files
Remove jquery-rails and jquery-ujs from the Gemfile. Run `bundle install`.
    
Modify the `application.js` and `application.css` files to reflect changes and bootstrap inclusion. __Notice that the javascript file associated with `jquery-ujs ` is actually named `rails.js`.__
```diff 
// ========== application.js

//= require jquery
-//= require jquery_ujs
+//= require rails
//= require turbolinks
+//= require bootstrap
//= require_tree .
```
```diff
// ========== application.css

 *
 *= require_self
+ *= require bootstrap
 *= require_tree .
 */
```

### 5. Test this out.

Boot up rails and test this up by going to, [localhost:3000/home/index](http://localhost:3000/home/index).

We have an issue. The Bootstrap font-face is not coming through since we do not see a world image. And if you look in the Javascript console, you're see the we have 3 HTTP 404s. Why? [`Bootstrap v3.0.3 bootstrap.css#LL2356`](https://github.com/twbs/bootstrap/blob/1c83d68ca45adce77d8eca9bb5643db7b57b9ef7/dist/css/bootstrap.css#L2356-L2361) expects fonts to be available at `../fonts` but Rails makes this available at `/assets`. :disappointed:


### 6. Fix the font-face issue.

My solution resolves the HTTP 404s, but I'm content nor happy with it. I'd love to hear how others have conquered this issue and update this post with a better solution. Here's what I'm doing to fix the HTTP 404s.

Add `@font-face` declaration in the application.css file and substitute `../fonts` for `/assets` since this is how the Rails Asset Pipeline makes them available.
```diff    
// ========== application.css

+
+ @font-face {
+  font-family: 'Glyphicons Halflings';
+  src: url('/assets/glyphicons-halflings-regular.eot');
+  src: url('/assets/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), 
+    url('/assets/glyphicons-halflings-regular.woff') format('woff'), 
+    url('/assets/glyphicons-halflings-regular.ttf') format('truetype'), 
+    url('/assets/glyphicons-halflings-regular.svg#glyphicons-halflingsregular') format('svg');
+}
```

Remove the `@font-face` declaration from the `bootstrap.css` file in `vendor/assets/stylesheets`. 
```diff
// ========== bootstrap.css

-@font-face {
-  font-family: 'Glyphicons Halflings';
-  src: url('../fonts/glyphicons-halflings-regular.eot');
-  src: url('../fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), url('../fonts/glyphicons-halflings-regular.woff') format('woff'), url('../fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('../fonts/glyphicons-halflings-regular.svg#glyphicons-halflingsregular') format('svg');
-}
-
```

This will stop the HTTP 404s during page loads, but I find this unsatisfactory because `bower-installer` will copy over the original `bootstrap.css` file every time it's run. I still advocate for this since it stops the HTTP 404s. I believe HTTP 404s should never, __never__ show up in production.


## Please provide feedback

I'm hopeful that we embrace better tools to holistically manage frontend dependencies so we focus on creating beautiful UIs.
