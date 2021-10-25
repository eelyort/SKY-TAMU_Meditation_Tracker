#location spec/unit/unit_spec.rb
require 'rails_helper'

RSpec.describe Attendance, type: :model do
	subject do
		described_class.new(RSVP: 'Yes')
	end

	it 'is valid with valid attributes' do
		expect(subject).to be_valid
	end

	it 'is incorrect value' do
		subject.RSVP = nil
		expect(subject).not_to be_valid
	end
end