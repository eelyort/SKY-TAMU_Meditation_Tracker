class Admin < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
#  devise :database_authenticatable, :registerable,
#         :recoverable, :rememberable, :validatable

  devise :omniauthable, omniauth_providers: [:google_oauth2]
  def self.from_google(params) #email:, full_name:, uid:, avatar_url:)
      print params[:email]
      return nil unless params[:email] =~ /@mybusiness.com\z/
      create_with(uid: params[:uid], full_name: params[:full_name], avatar_url: params[:avatar_url].find_or_create_by!(email: params[:email]))
    end
end
