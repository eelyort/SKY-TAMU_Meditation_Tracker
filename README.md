# README

# Introduction

This project was created by Texas A&M Students as part of CSCE 431.

This was created as a website for the student organization, SKY@TAMU.
SKY@TAMU is a meditation club, for the website, there are three main parts.

Firstly, the website allows members to register for accounts, view other members, and get in contact with other users via social media.

Secondly, the website allows club admins to post, edit, and delete events. These events are then displayed for everyone to see to allow anyone to get event details when needed.

Lastly, there is RSVP and Attendance tracking so the club officers can view how many people are attending each event and have a running total of "hours meditated."

All edit/deleting requires club officers to login as an admin via Google OAuth (Log in with Google).

# Requirements

This code has been run and tested on:

* Ruby - 3.0.2p107
* Rails - 6.1.4.1
* Ruby Gems - Listed in `Gemfile`
* PostgreSQL - 13.3
* Nodejs - v16.7.0
* Yarn - 1.22.11


# External Deps

* Docker - Download latest version at https://www.docker.com/products/docker-desktop
* Heroku CLI - Download latest version at https://devcenter.heroku.com/articles/heroku-cli
* Git - Downloat latest version at https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

# Installation

Download this code repository by using git:

 `git clone https://github.com/eelyort/SKY-TAMU_Meditation_Tracker.git`


# Tests

An RSpec test suite is available and can be ran using:

  * `rspec ./spec`
    * `rspec ./spec/unit/unit_spec.rb`
    * `rspec ./spec/controller/controller_spec.rb`
    * simplecov is run aswell during this.

Others:
  * rubocop: `rubocop -A`
  * brakeman: `brakeman`

# Execute Code

  https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend

  ## Getting Docker Ready ##
  * Run Docker Desktop
  * `docker run --rm -it --volume "$(pwd):/csce431" -e DATABASE_USER=test_app -e DATABASE_PASSWORD=test_password -p 3000:3000 dmartinez05/ruby_rails_postgresql:latest`

  ## "Home" Directory ##
  * Directory `rails_react_project`
  * All further commands should be run in this directory
  * ls: `Gemfile  Gemfile.lock  README.md  Rakefile  app  babel.config.js  bin  config  config.ru  db  lib  log  node_modules  package.json  postcss.config.js  public  storage  test  tmp  vendor  yarn.lock`

  ## Creating and Connecting to the Database ##
  * `bundle install`
  * create db options
    * redo all migrations
      * `rails db:create`
      * `rails db:migrate`
    * load old schema (you need to have done the above once before with the current version)
      * `rails db:schema:load`

  ## Starting the Application ##
  * `rails s --binding=0.0.0.0`
  * `http://localhost:3000/?pp=enable`
    * `http://localhost:3000/?pp=disable`
      * removes the small timing thing at the top

  ## Managing Frontend Dependecies ##
  * Using yarn
  * `yarn install`
    * this will install all frontend dependencies based on package.json
    * you will only need to do this once
  * `yarn add package_name`
    * should be in `rails_react_project` directory

  ## Generating Models/Controllers ##
  * `rails g model Model_Name model_params`
    * EX: `rails g model Recipe name:string ingredients:text instruction:text image:string`
    * generates a `.rb` file as normal
    * Manually??? write migration file
      * `rails_react_recipe/db/migrate/DATE_model_name`
  * `rails g controller Page_name action_name`
    * EX: `rails generate controller api/v1/Recipes index create show destroy -j=false -y=false --skip-template-engine --no-helper`
    * Will need to update `rails_react_recipe/config/routes.rb`

  ## React Code ##
  * `app/javascript/packs`
    * Nothing to do here
  * `app/javascript/components`
    * All frontend components/pages should go here
  * `app/assets/stylesheets`
    * put everthing into `application.css`
    * css stylesheets
    * might need to update `views/layouts/application.html.erb` when making a new file

  ## Seeding Data ##
  * `rails_react_recipe/db/seeds.rb`
    * `Model_Name.create(name: x, ...)`
  * `rails db:seed`

# Environmental Variables/Files

* Google API key required in Header.jsx
* Nothing else

# Deployment

* Automated CD will automatically deploy any changes on the client's github
  * Tracking the "main" branch

# CI/CD

Github actions will automatically run the test suite, a heroku pipeline manages deployment.

# Support

Admins looking for support should first look at the application help page.
Users looking for help seek out assistance from the customer.
