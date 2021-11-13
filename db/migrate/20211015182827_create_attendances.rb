# frozen_string_literal: true

class CreateAttendances < ActiveRecord::Migration[6.1]
  def change
    create_table :attendances do |t|
      t.string :RSVP
      t.int :user_id
      t.int :event_id

      t.timestamps
    end
  end
end
