# frozen_string_literal: true

class Attendance < ApplicationRecord
	validates :RSVP, presence: true
end
