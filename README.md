# README

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend

# Getting Docker Ready
* Run Docker Desktop
* `docker run --rm -it --volume "$(pwd):/csce431" -e DATABASE_USER=test_app -e DATABASE_PASSWORD=test_password -p 3000:3000 dmartinez05/ruby_rails_postgresql:latest`
  * (Troy): cd CSCE431Docker

# "Home" Directory
* Directory `rails_react_project`
* ls: `Gemfile  Gemfile.lock  README.md  Rakefile  app  babel.config.js  bin  config  config.ru  db  lib  log  node_modules  package.json  postcss.config.js  public  storage  test  tmp  vendor  yarn.lock`
  * (Troy): `cd csce431/Project/rails_react_project`

# Creating and Connecting to the Database
* `rails db:create`
* ??? `rails db:migrate` ???

# Starting the Application
* `rails s --binding=0.0.0.0`
* `http://localhost:3000`

# Managing Frontend Dependecies
* Using yarn
* `yarn add package_name`

# Generating New Pages/Controllers
* `rails g controller Page_name action_name`
  * EX: `rails g controller Homepage index`
* ...

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...