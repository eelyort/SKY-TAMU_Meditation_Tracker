# frozen_string_literal: true

require 'httparty'
require 'json'
# controls OAuth
class AuthorizationController < ApplicationController
  # include HTTParty

  def do_authorization
    url = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=#{params['id_token']}"
    response = HTTParty.get(url)
    print "get_authorization called\n"
    print response
    @user = User.create_user_for_google(response.parsed_response)
    # tokens = @user.create_new_auth_token
    @user.save
    # set_headers(tokens)
    render json: @user
    #    render json: { status: 'Signed in successfully with google'}
  end
end
