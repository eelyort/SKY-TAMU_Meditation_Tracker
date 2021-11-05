class CreateLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :locations do |t|
      t.integer :location_id
      t.integer :event_id
      t.string :virtual_link
      t.string :building
      t.string :room
      t.string :city
      t.string :stateloc
      t.date :date
      t.datetime :time

      t.timestamps
    end
  end
end
