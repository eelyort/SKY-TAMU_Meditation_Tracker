# frozen_string_literal: true

class Location < ApplicationRecord
  validates :location_id, presence: true, numericality: { greater_than_or_equal_to: 0, only_integer: true },
                          uniqueness: true
  validates :event_id, presence: true, numericality: { greater_than_or_equal_to: 0, only_integer: true }
end
