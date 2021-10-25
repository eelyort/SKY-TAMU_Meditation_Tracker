class Attendance < ApplicationRecord
	validates :RSVP, presence: true
end
