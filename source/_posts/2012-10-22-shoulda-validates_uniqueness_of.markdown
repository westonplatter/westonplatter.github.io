---
layout: post
title: "Shoulda + 'validates_uniqueness_of'"
date: 2012-10-22 23:07
comments: true
categories: testing
---

At work I ran into a failing Rspec test using [**shoulda-matcher**](https://github.com/thoughtbot/shoulda-matchers)s.

    # app/models/some_person_model.rb

    SomePersonModel < ActiveRecord::Base
      validates_uniqueness_of :name
    end

    # spec/models/some_person_model_spec.rb

    require 'spec_helper'

    describe SomePersonModel do
      it { should validate_uniqueness_of(:name) }
    end

The issue is that the ````validates_uniqueness_of```` matcher requires an entry in the database. Therefore, I used FactoryGirl to create a database record,

    # spec/models/some_person_model_spec.rb

    require 'spec_helper'

    describe SomePersonModel do
      subject { FactoryGirl.create(:some_person_model) }

      it { should validate_uniqueness_of(:name) }
    end
