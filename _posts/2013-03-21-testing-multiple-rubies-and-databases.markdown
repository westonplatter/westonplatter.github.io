---
layout: post
title: "Testing Multiple Rubies and Databases on Travis CI"
date: 2013-03-21 02:06
tags:
- rails
- testing
---

[Why should I test multiple versions & databases](/blog/2013/testing-multiple-rubies-and-databases#why)
[Rspec tests for Rails project](/blog/2013/testing-multiple-rubies-and-databases#rspec-for-rails)
[Travis CI for Github public repo](/blog/2013/testing-multiple-rubies-and-databases#travis)
[Multiple ruby versions & database types](/blog/2013/testing-multiple-rubies-and-databases#multi)
[Credits](/blog/2013/testing-multiple-rubies-and-databases#credits)

<!-- more -->

<h3 id="why">Why should I test multiple versions & databases</h3>

In the Ruby community, it's expected that your open source projects should have automated testing. It gives other developers who use your code confidence that your code works as expected and rather than crashing their production app (as fun as that is to deal with). With the additional of free remote automated testing, testing and publishing results is __dead simple__.

This has been a huge leap forward for the open source community.

I think the next leap forward is to intentionally test against language versions and infrastructure components (databases) outside the scope of your initial project. Why? If I create and test a Ruby gem against MySQL but you want to use it with Postgresql, how do know the code is a solid solution for your Postgresql infrastructure? You don’t unless you dig through my the code.

__But, the purpose of being a developer is NOT coding or programming. Being a developer is about choosing how and when to leverage code & systems (for more on this view point, see [True Nature of Code](/blog/2013/true-nature-of-code/)).__

Let's setup testing within a Rails app and configure these 9 different setps.
[https://travis-ci.org/westonplatter/example_travisci_multi](https://travis-ci.org/westonplatter/example_travisci_multi)

<h3 id="rspec-for-rails">Rspec testing a Rails project</h3>

I use Rspec for testing Rails applications, but your actual testing framework could be anything. Thus, starting with a new rails project, let’s install the rspec-rails gem into our rails project.

    # create the rails app
    rails new example_travisci_multi
    cd example_travisci_multi

    # add rspec-rails to Gemfile
    echo 'gem "rspec-rails"' >> Gemfile
    bundle install
    rails generate rspec:install

    # create rails testable resource
    rails generate scaffold Post title:string

    # run rspec
    rake db:migrate
    rake db:test:preapre
    rake spec


How do we know which Ruby version and which database we are using?

    rake about

    # About your application's environment
    # Ruby version              1.9.3 (x86_64-darwin12.2.1)
    # ...
    # Database adapter          sqlite3
    # ...

Let's get Ruby 1.9.3 and Sqlite3 working with Travis CI before we expand to other Rubies and Databases.


<h3 id="travis">Travis CI for Github public repo</h3>

Having created a Rails project, configured your test framework, and confirmed your tests run, let’s configure it with Travis CI (free for open source projects). We’ll assume your code is hosted on Github as a public project.

<ol>
  <li>
    Go to the Github project admin panel, click on serivce hooks section, (EG, https://github.com/GITHUB_USERNAME/REPO_NAME/settings/hooks).
  </li>

  <li>
    If you haven’t setup a travis ci account, do so. Go to [https://travis-ci.org](https://travis-ci.org/), and click on “Sign in with Github”.
  </li>

  <li>
    Copy and paste your Travis CI token from here, https://travis-ci.org/profile/GITHUB_USERNAME/profile, into the Github Token text box.
  </li>

  <li>Check the Active check box.</li>

  <li>
    Add a .travis.yml file to the Rails root directory, <b>notice we are responsible for running the migrations</b>,
    <br>
      <pre>
# example_travisci_multi/.travis.yml

language: ruby

rvm:
  - 1.9.3

before_script:
  - rake db:migrate

# uncomment this line if your project needs to run something other than `rake`:
# script: bundle exec rspec spec
      </pre>
  </li>

  <li>
    Commit. Push to github. Travis CI will automatically run your tests.
  </li>

  <li>
    View your test status & results on Travis CI, https://travis-ci.org/GITHUB_USERNAME/REPO_NAME
  </li>
</ol>

<h3 id="multi">Multiple ruby versions & database types</h3>

Now for some Travis CI power. Let's test the Rails project against multiple databases and multiple ruby versions. We'll need to change the following files,

#### .travis.yml

    # example_travisci_multi/.travis.yml

    language: ruby

    # creates 3 variable build maxtix. 1 each for a different RVM version
    rvm:
      - 2.0.0
      - 1.9.3
      - jruby-19mode

    # adds 3 variables to each build matrix.
    env:
      - DB=sqlite
      - DB=mysql
      - DB=postgresql


    # the result, 9 different build matricies. more about this,
    # http://about.travis-ci.org/docs/user/build-configuration/#The-Build-Matrix


    # add the extra shell commands to ensure the db exits, the
    # migrations have ben run, and the development env schema has
    # been applied to the test database.
    #
    before_script:
      - rake db:create
      - rake db:migrate
      - rake db:test:prepare

    # uncomment this line if your project needs to run something other than `rake`:
    # script: bundle exec rspec spec



#### database.yml
We need to change how the database drivers are loaded to support MRI Ruby and JRuby database connectors. In brief, the database connector is decided by the travis shell variable, ````ENV['DB']````, defaulting to ````sqlite````. Notice the  ````mysql````  connection has double nested boolean logic to change the adapter name between 'mysql' for ruby and 'mysql2' for JRuby.

I copied most of this from [Matthew McEachen](http://matthew.mceachen.us/blog/about)'s [awsome travis ci post](http://matthew.mceachen.us/blog/howto-test-your-rails-application-with-travis-ci-on-different-database-engines-1220.html). We'll tweak the ````mysql```` group to account for JRuby.

    # example_travisci_multi/config/database.yml

    sqlite: &sqlite
    adapter: sqlite3

    mysql: &mysql
      adapter: mysql<%= "2" unless ( ENV["TRAVIS_RUBY_VERSION"].include? "j" if ENV["TRAVIS_RUBY_VERSION"] ) %>
      username: root
      password:

    postgresql: &postgresql
      adapter: postgresql
      username: postgres
      password:
      min_messages: ERROR

    defaults: &defaults
      pool: 5
      timeout: 5000
      host: localhost
      <<: *<%= ENV['DB'] || "sqlite" %>

    development:
      database: example_travisci_multi_dev
      <<: *defaults

    test:
      database: example_travisci_multi_test
      <<: *defaults

    production:
      database: example_travisci_multi_prod
      <<: *defaults


#### Gemfile

Since MRI Ruby and JRuby use different database drivers, we need to conditionally select the appropriate adapter for installation in the Gemfile.

    # example_travisci_multi/Gemfile

    source 'https://rubygems.org'

    gem 'rails', '3.2.13'

    group :assets do
      gem 'sass-rails',   '~> 3.2.3'
      gem 'coffee-rails', '~> 3.2.1'
      gem 'uglifier', '>= 1.0.3'
    end

    gem 'jquery-rails'

    gem "rspec-rails"



    ## AND ADD THIS
    #
    group :development, :test do
      platforms :jruby do
        gem 'activerecord-jdbcsqlite3-adapter'
        gem 'activerecord-jdbcmysql-adapter'
        gem 'activerecord-jdbcpostgresql-adapter'
        gem 'jruby-openssl'
      end

      platforms :mri do
        gem 'sqlite3'
        gem 'mysql2'
        gem 'pg'
      end
    end

<h3 id="credits">Credits</h3>

Rock star points to [Matthew McEachen](http://matthew.mceachen.us/blog/about) for [his blog post](http://matthew.mceachen.us/blog/howto-test-your-rails-application-with-travis-ci-on-different-database-engines-1220.html) about setting up Rails + Travis CI for multiple databases.

