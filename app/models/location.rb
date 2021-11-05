class Location < ApplicationRecord
  validates :event_id, presence: true, numericality: { greater_than_or_equal_to: 0, only_integer: true }
end
