# frozen_string_literal: true

class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events, id: false do |t|
      t.integer :event_id, primary_key: true
      t.integer :admin_id
      t.string :title
      t.text :description
      t.string :time

      t.timestamps
    end
  end
end
