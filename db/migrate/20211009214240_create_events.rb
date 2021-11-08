# frozen_string_literal: true

class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.integer :admin_id
      t.string :title
      t.text :description
      t.string :time

      t.timestamps
    end
  end
end
