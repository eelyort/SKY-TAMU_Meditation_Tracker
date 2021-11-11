# frozen_string_literal: true

# location: spec/unit/unit_spec.rb
require 'rails_helper'

# Users
RSpec.describe UsersController, :type => :controller do

    describe 'create' do
      it 'successfully creates a new user' do
        user = User.create(username: 'testemail@tamu.edu', firstname: 'firstName', lastname: 'lastName', user_type: 1)

        expect(User.last.username).to eq("testemail@tamu.edu")

      end
    end

    describe 'update firstname' do
      it 'successfully updates a user firstname' do
        user = User.create(username: 'testemail@tamu.edu', firstname: 'firstName', lastname: 'lastName', user_type: 1)
        user = User.update(username: 'testemail@tamu.edu', firstname: "firstname1", lastname: 'lastName', user_type: 1)

        expect(User.last.firstname).to eq("firstname1")

    end
  end

    describe 'update lastname' do
      it 'successfully updates a user lastname' do
        user = User.create(username: 'testemail@tamu.edu', firstname: 'firstName', lastname: 'lastName', user_type: 1)
        user = User.update(username: 'testemail@tamu.edu', firstname: "firstName", lastname: 'lastName1', user_type: 1)

        expect(User.last.lastname).to eq("lastName1")

    end
  end

    describe 'update type' do
      it 'successfully updates a usertype' do
        user = User.create(username: 'testemail@tamu.edu', firstname: 'firstName', lastname: 'lastName', user_type: 1)
        user = User.update(username: 'testemail@tamu.edu', firstname: "firstName", lastname: 'lastName', user_type: 2)

        expect(User.last.user_type).to eq(2)

    end
  end

    describe 'delete' do
      it 'successfully deletes a user' do
        user = User.create(username: 'testemail@tamu.edu', firstname: 'firstName', lastname: 'lastName', user_type: 1)
        user.destroy()

        expect(response).to be_successful
  #      expect(response).to have_http_status(:redirect)
    end
  end

#    describe "GET index" do
#      it 'returns a successful response' do
#        get :index
#        expect(response).to be_successful
#      end
#     end
#       it "returns json" do
#           get :index
#           print response
#           expect(response.content_type).to eq "application/json"
#       end
#   end
end
