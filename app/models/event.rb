# frozen_string_literal: true

class Event < ApplicationRecord
  validates :event_id, presence: true, numericality: { greater_than_or_equal_to: 0, only_integer: true },
                       uniqueness: true
  validates :admin_id, presence: true, numericality: { greater_than_or_equal_to: 0, only_integer: true }
  validates :title, presence: true
  validates :time, presence: true
  validates :description, presence: true
end
