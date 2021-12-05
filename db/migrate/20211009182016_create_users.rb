
# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :firstname
      t.string :lastname
      t.string :bio, default: 'Please enter a bio'
      t.integer :user_type, default: 1

      t.timestamps
    end
end

