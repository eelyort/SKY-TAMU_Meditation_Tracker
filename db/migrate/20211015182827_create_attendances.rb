# frozen_string_literal: true

class CreateAttendances < ActiveRecord::Migration[6.1]
  def change
    create_table :attendances do |t|
      t.string :RSVP

      t.timestamps
    end
  end
end
