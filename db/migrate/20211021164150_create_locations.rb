# frozen_string_literal: true

class CreateLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :locations do |t|
      t.integer :event_id
      t.string :virtual_link
      t.string :building
      t.string :room
      t.string :city
      t.string :stateloc
      t.string :start_time
      t.string :end_time

      t.timestamps
    end
  end
end
