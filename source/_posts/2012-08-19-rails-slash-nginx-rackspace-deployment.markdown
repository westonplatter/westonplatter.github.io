---
layout: post
title: "Rails/Nginx Rackspace Deployment"
date: 2012-08-19 19:18
comments: true
categories: rails
published: true
---

**WARNING - this is still under review**

Tested with Ubuntu 12.04 LTS server from Rackspace

<br>
#### Create a server. 
Get  
- IP address    
- username (root if a brand new server)    
- password    

<br>
# Setup SSH

#### Install oh-my-zsh and git (oh-my-zsh makes terminal navigation much faster)
    ssh root@<IP_ADDRESS>
    apt-get update
    apt-get install git zsh curl
    curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh
	chsh -s /bin/zsh
	
	exit
	ssh root@<IP_ADDRESS>
    

<!--more-->

<br>
#### Add users to the server.
Create user, add to sudo group (so you run sudo commands)
    
    useradd -d /home/weston -m -s /bin/bash weston
    passwd weston
    usermod -aG sudo weston

Create deploy user,

    useradd -d /home/deploy -m -s /bin/bash deploy
    passwd deploy

<br>
####  Enable user login into server using public key

This allows you to log into the server using SSH validation and is more secure (because someone has to have your public/private SSH keys and know your secret passphrase).
On the server,
    
    mkdir /home/weston/.ssh
    mkdir /home/deploy/.ssh

From your local machine,
    
    scp ~/.ssh/id_rsa.pub root@_id_address_:/home/weston/.ssh
    scp ~/.ssh/id_rsa.pub root@_id_address_:/home/deploy/.ssh

On the server, user weston
    
    cd /home/weston/.ssh
    cat id_rsa.pub >> authorized_keys
    chmod 400 /home/weston/.ssh/authorized_keys
    chmod 700 /home/weston/.ssh
    chown -R weston:weston /home/weston

On the server, user deploy
    
    cd /home/deploy/.ssh
    cat id_rsa.pub >> authorized_keys
    chmod 400 /home/deploy/.ssh/authorized_keys
    chmod 700 /home/deploy/.ssh
    chown -R deploy:deploy /home/deploy

<br>
#### Change the SSH port for security reasons
(As root user, or other user with sudo access)
    
    vi /etc/ssh/sshd_config
    
    # port 22
    port 60022

Need to restart SSH service,
    
    service ssh restart

Since we did all the work getting the <code>weston</code> available for use, let's go ahead and SSH in as weston.
    
    ssh -p60022 weston@_ip_address_
    

And since we logged in, let's turn off root login (so no one can brute force their way into the server).
    sudo vi /etc/ssh/sshd_config
    
    # PermitRootLogin yes
    PermitRootLogin no

<br>
<br>
# Software

#### Software package installation.
We will need the following to install Ruby and run Rails.
    
    sudo apt-get install curl build-essential openssl libreadline6 libreadline6-dev curl git-core zlib1g zlib1g-dev libssl-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt-dev autoconf libc6-dev ncurses-dev automake libtool bison subversion pkg-config libgdbm-dev libffi-dev

System wide install RVM (for all users, rather than just the one executing the commands). This will install RVM into, ````/usr/local/rvm/````. We are installing 1.8.7 because our Ruby on Rails application needs 1.8.7
    
    curl -L https://get.rvm.io | bash -s stable
    rvmsudo install 1.8.7
	
	# enable users to use RVM
	sudo usermod -aG rvm weston
	sudo usermod -aG rvm deploy
	
    # in order to just install the source code for all future Ruby gems, but NOT the RI/Rdocs
    echo "gem: --no-ri --no-rdoc" >> ~/.gemrc 

Install MySQL in preparation for Rails application (remmeber the username and password you setup for mysql)
    
    sudo apt-get install libmysqlclient-dev mysql-server

Now to install Phusion-Passenger, [instructions found here](http://www.modrails.com/install.html).
    
    sudo apt-get install libcurl4-openssl-dev
    rvmsudo gem install passenger
    

    rvmsudo passenger-install-nginx-module  # this is the NGINX passenger module
                                            # there is also an apache module, 
                                            # see passenger website


<br>
#### Configuring NGINX
By default NGINX is installed here, ````/opt/nginx/conf````. Most of the following is already in the file, so manually make the edits to get comfortable with the NGINX server configs,
    
    sudo vi /opt/nginx/conf/nginx.conf

	/opt/nginx/conf/nginx.conf

	#user  nobody;
	worker_processes  1;

	error_log  /var/log/nginx/error.log;
	#error_log  logs/error.log  notice;
	#error_log  logs/error.log  info;

	pid        /var/run/nginx.pid;

	events {
	    worker_connections  1024;
	}

	http {
    	passenger_root /home/weston/.rvm/gems/ruby-1.8.7-p370/gems/passenger-3.0.15;
	    passenger_ruby /home/weston/.rvm/wrappers/ruby-1.8.7-p370/ruby;
    
    	# weston added - options to consider
	    # client_max_body_size 0;
    	# passenger_use_global_queue on;
	    # passenger_ignore_client_abort on;
    	# passenger_max_pool_size 30;
	    # passenger_rolling_restarts on;
		# passenger_resist_deployment_errors on;    

	    include       mime.types;
	    default_type  application/octet-stream;

	    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

	    access_log  /var/log/nginx/access.log  main;

    	sendfile        on;
	    #tcp_nopush     on;

    	#keepalive_timeout  0;
	    keepalive_timeout  65;

    	#gzip  on;

	    include /opt/nginx/vhosts/*.conf;

	}

Make the log file directory and file,
    
    sudo mkdir /var/log/nginx
    sudo touch /var/log/nginx/error.log
    sudo touch /var/log/nginx/access.log
    sudo chown -R deploy:deploy /var/log/nginx
    sudo chmod 777 -R /var/log/nginx

Notice that the last line is a "nify hack" allowing us to include all files ending with ````.conf```` in an arbitrary folder, ````vhosts````. Let's make that folder,
    
    sudo mkdir /opt/nginx/vhosts

Let's setup a virtual host,
    
    sudo vi /opt/nginx/vhosts/default.conf

	/opt/nginx/vhosts/default.conf

	server {
	  listen 80;

	  server_name _id_address_ _domain_name_;
	  root /var/www/html/fedena/production/current/public;
	  rails_env production   # this is optional
	  passenger_enabled on;
	}



From the server, make the fedena folder
    
    sudo mkdir /var/www
    sudo mkdir /var/www/html
    sudo mkdir /var/www/html/fedena
    sudo mkdir /var/www/html/fedena/production
    sudo chown -R deploy:deploy /var/www/html/fedena

# Fedena Repository Work

#### Capistrano deploy configurations within the Ruby on Rails application.
On your local machine,
    
    # download the fedena repo
    cd ~/git
    git clone git://github.com/projectfedena/fedena.git
    cd fedena

    # capistrano operations
    sudo gem install capistrano
    capify .
                                # => [add] writing './Capfile'
                                # => [add] writing './config/deploy.rb'
                                # => [done] capified!

Let's configure the <code>config/deploy.rb</code> file specific the server we configured.

	#/config/deploy

	set :application, "fedena"
	set :repository,  "git://github.com/westonplatter/fedena.git"

	set :scm, :git
	set :deploy_to, '/var/www/html/fedena/production'

	set :port, 60022
	set :user, 'deploy'
	set :use_sudo, false

	# This gives the capistrano shell session access to Ruby resources on the server.
	# Determine your own shell variables by 'echo'ing the VARIABLE and putting the
	# below,
	set :default_environment, { 
	  'PATH' => '/home/weston/.rvm/gems/ruby-1.8.7-p370/bin:/home/weston/.rvm/gems/ruby-1.8.7-	  p370@global/bin:/home/weston/.rvm/rubies/ruby-1.8.7-p370/bin:/home/weston/.rvm/bin:/usr/local sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games',
	  'GEM_HOME' => '/home/weston/.rvm/gems/ruby-1.8.7-p370',
	  'GEM_PATH' => '/home/weston/.rvm/gems/ruby-1.8.7-p370:/home/weston/.rvm/gems/ruby-1.8.7-p370@global', 
	  'RUBY_VERSION' => 'ruby-1.8.7-p370'
	}

	# these values can be simple IP addresses, or URLs that resolve to an IP address
	set :my_server,   "11.55.987.234"
	role :web, my_server                      # Your HTTP server, Apache/etc
	role :app, my_server                      # This may be the same as your `Web` server
	role :db,  my_server, :primary => true    # This is where Rails migrations will run

	# extra database server if needed
	# set :my_server_2, "22.55.987.234"
	# role :db,  my_server_2

	# if you want to clean up old releases on each deploy uncomment this:
	# after "deploy:restart", "deploy:cleanup"

	# if you're still using the script/reaper helper you will need
	# these http://github.com/rails/irs_process_scripts

	# If you are using Passenger mod_rails uncomment this:
	namespace :deploy do
   	  task :start do ; end
	  task :stop do ; end
	  task :restart, :roles => :app, :except => { :no_release => true } do
	    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
	  end
	end

#### Rails application requires Rails version
Also, you won't know this until you try and deploy, but fedena has issues with certain versions of Rails. Therefore, we accept versions all versions greater or equal to Rails 2.3.x, by this,

    # /fedena/config/environment.rb

    # RAILS_GEM_VERSION = '2.3.5' unless defined? RAILS_GEM_VERSION
    RAILS_GEM_VERSION = '~>2.3.5' unless defined? RAILS_GEM_VERSION


<br>
#### Database setup
On the server,

    mysql -uroot -p
    create database fedena_ultimate;
    create database fedena_two_new;
    exit

File fill in your <code>/fedena/cofig/database.yml</code> file with something like this,
	
	# database.yml

	development:
      host: localhost
      adapter: mysql
      database: fedena_ultimate
      port: 3306
      username: root
      password: root

	test: &test
      host: localhost
      adapter: mysql
      database: fedena_two_new
      port: 3306
      username: root
      password: root

	production:
      host: localhost
      adapter: mysql
      database: fedena_ultimate
      port: 3306
      username: root
      password: root
	cucumber:
	  <<: *test

#### Gems before bundler  
Bundler makes managing gems really easy. But without it, you need to manually install the gems on in Ruby Gemset used on your server. And specifically for <code>fedena</code>, we need to install these,

    gem update --system 1.7.2
    gem install mysql
    gem install rails -v=2.3.11
    gem install i18n -v=0.4.0
    gem install test-unit -v=1.2.3
    gem install rspec -v=1.3.0
    gem install paperclip -v=2.4.1
    gem install declarative_authorization
    gem install searchlogic  -v=2.4.27

#### Deploy
Now we are set to get ready to deploy,
   
	# cap -T shows all available comands

    cap deploy:setup    # creates the necessary folders within the /var/www/html/fedena/production folder
    
    cap deploy:check

    cap deploy:cold
