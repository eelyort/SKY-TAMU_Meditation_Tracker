# README

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend

# Getting Docker Ready
* Run Docker Desktop
* `docker run --rm -it --volume "$(pwd):/csce431" -e DATABASE_USER=test_app -e DATABASE_PASSWORD=test_password -p 3000:3000 dmartinez05/ruby_rails_postgresql:latest`
  * (Troy): cd CSCE431Docker

# "Home" Directory
* Directory `rails_react_project`
* All further commands should be run in this directory
* ls: `Gemfile  Gemfile.lock  README.md  Rakefile  app  babel.config.js  bin  config  config.ru  db  lib  log  node_modules  package.json  postcss.config.js  public  storage  test  tmp  vendor  yarn.lock`
  * (Troy): `cd csce431/Project/rails_react_project`

# Creating and Connecting to the Database
* `bundle install`
* create db options
  * redo all migrations
    * `rails db:create`
    * `rails db:migrate`
  * load old schema (you need to have done the above once before with the current version)
    * `rails db:schema:load`

# Starting the Application
* `rails s --binding=0.0.0.0`
* `http://localhost:3000/?pp=enable`
  * `http://localhost:3000/?pp=disable`
    * removes the small timing thing at the top

# Managing Frontend Dependecies
* Using yarn
* `yarn add package_name`
  * should be in `rails_react_project` directory

# Generating Models/Controllers
* `rails g model Model_Name model_params`
  * EX: `rails g model Recipe name:string ingredients:text instruction:text image:string`
  * generates a `.rb` file as normal
  * Manually??? write migration file
    * `rails_react_recipe/db/migrate/DATE_model_name`
* `rails g controller Page_name action_name`
  * EX: `rails generate controller api/v1/Recipes index create show destroy -j=false -y=false --skip-template-engine --no-helper`
  * Will need to update `rails_react_recipe/config/routes.rb`

# React Code
* `app/javascript/packs`
  * Nothing to do here
* `app/javascript/components`
  * All frontend components/pages should go here
* `app/assets/stylesheets`
  * put everthing into `application.css`
  * css stylesheets
  * might need to update `views/layouts/application.html.erb` when making a new file

# Seeding Data
* `rails_react_recipe/db/seeds.rb`
  * `Model_Name.create(name: x, ...)`
* `rails db:seed`

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