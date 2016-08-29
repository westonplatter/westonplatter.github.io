---
layout: post
title: "Rails Lesson 1"
date: 2012-09-10 21:59
comments: true
categories: rails
published: true
---

When we skyped, we created  
+ rails applicaiton  
+ configured a MySQL database  
+ created a scaffold object  
+ created and migrated the database  
+ tested that the applicaiton worked  
  
<!--more-->

The list of commands run in the terminal,
		rails new my_device_inventory_manager -d mysql
		cd my_device_inventory_manager
		rails generate scaffold Device name:string status:integer
		bundle install
		rake db:create
		rake db:migrate
		rails server

We focused on looking at the different Model-View-Controller (MVC) elements that were created by rails by the <code>rails generate scaffold MODEL_NAME</code> command. In summary,  

**Model**  
+ inherits from <code>ActiveRecord::Base</code>  
+ implements model specific logic  

**Controller**  
+ inherits from ApplicationController (which inherits from <code>ActionController::Base</code>)  
+ helps respond to HTTP URL requests  
+ controller actions (IE, the <code>def ... end</code> code blocks) to URL arguments

**View**  
+ files do not inherit from a class
+ can utilize various templating and markup languages. The most common is _filename_.html.erb, which uses standard HTML syntax with Embedded RuBy (ERB) to dynamically reference server side variables.
 
The important connection to make with Rails' MVC nature is that the following are connected.

		app/controllerbs/devices_controllers.rb
		app/models/device.rb
		app/views/_format.html.erb
		app/views/edit.html.erb
		app/views/index.html.erb
		app/views/new.html.erb
		app/views/show.html.erb
		app/views/update.html.erb


So after creating the devices scaffold (allows you to create a list of devices on this page, [localhost:3000/devices](http://localhost:3000/devices)), try to work through these exercises,  

### Exercise 1 - Create a simple About page  
Files you will need to edit/create  
+ config/routues.rb  
+ app/controllers/about_controller.rb  
+ app/views/about/index.html  


### Exercise 2 - Craete an MVC scaffold for Customers
You should create the database migration and model object by executing this in the terminal,
		rails g model Customer name:string email:string phone:string
		rake db:migrate

Files you will need to edit/create  
+ config/routes.rb  
+ db/migrate/\*  
+ app/assets/\*  
+ app/controllers/customers_controller.rb  
+ app/models/cusomter.rb  
+ app/views/customers/\*  
  
Note: the <code>*</code> means more than file file. Follow the patterns already established by the devices scaffold, and you should get it.  


