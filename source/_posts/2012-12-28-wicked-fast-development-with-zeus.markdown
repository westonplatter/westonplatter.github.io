---
layout: post
title: "Wicked Fast Development with Zeus"
date: 2012-12-28 16:13
comments: true
categories: tools
published: true
---

````rake routes```` = 4.69s  
````rake routes```` = 0.34s **using zeus gem**   

<!-- more  -->

#### problem
I work on a large Rails app for my full time gig. The startup time for the Rails stack is about 20 seconds (aka, 20 seconds too long). This was especially cumbersome when doing TDD-development.   

We tried leveraging **Spork** and **Watchr** (similar to **Rspec-Guard**) to more efficiently manage the Rails stack env. These were great tools. But our configuration required us to restart spork/watchr after we had changed a Rails environement constant or symbol (EG, Ruby class, FactoryGirl factory, spec file).

#### solution = zeus 
Then we found [**zeus**](https://github.com/burke/zeus).  

Zeus loads and re-loads your Rails environment as needed (like when Rails constants or symbols change) so you are guaranteed to have a fresh Rails environment ready at your command to run RSpec, migrations, rake tasks or etc.  

Here's [a wicked awesome video](http://vimeo.com/55184148) from [Burke Libbey](https://twitter.com/burkelibbey), the creator of zeus, explaining the deeper technical details.  

And here's an example app.  

	cd git
	gem install rails
	gem install spree   # spree requires rmagick (gem), which requires imagamagick (os)
						
    rails new example_zeus
    spree install example_zeus
    cd example_zeus
	
	time rake routes
	# rake routes  4.69s user 0.42s system 99% cpu 5.117 total
	### using a MacBook Pro, 16GB RAM, 256GB SSD

    echo "gem 'zeus'" >> Gemfile
    bundle install
    zeus init
    zeus start
	
	# in a new shell window
	cd git/example_zeus
	time zeus rake routes
	# zeus rake routes  0.34s user 0.03s system 32% cpu 1.136 total
	### while using a MacBook Pro, 16GB RAM, 256GB SSD


Happy zeus-ing :)


