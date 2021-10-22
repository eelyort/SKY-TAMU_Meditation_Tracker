# location: spec/unit/unit_spec.rb
require 'rails_helper'

# Sunny day test
RSpec.describe Event, type: :model do
  subject do
    described_class.new(event_id: "1", admin_id: "101", title: 'Meditation', Description:'This is a test description', time:"October 01, 2021")
  end

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end
 end

# Rainy day test - Event ID
RSpec.describe Event, type: :model do
  subject do
    described_class.new(event_id: "1", admin_id: "101", title: 'Meditation', Description:'This is a test description', time:"October 01, 2021")
  end

  it 'Event ID is invalid (needs to be integer)' do
    subject.event_id = "test"
    expect(subject).not_to be_valid
  end

  it 'Event ID cannot be empty' do
    subject.event_id = nil
		expect(subject).not_to be_valid
	end
end

# Rainy day test - Admin ID
RSpec.describe Event, type: :model do
  subject do
    described_class.new(event_id: "1", admin_id: "101", title: 'Meditation', Description:'This is a test description', time:"October 01, 2021")
  end

  it 'Admin ID is invalid (needs to be integer)' do
    subject.admin_id = "test"
    expect(subject).not_to be_valid
  end

  it 'Admin ID cannot be empty' do
    subject.admin_id = nil
		expect(subject).not_to be_valid
	end
end

# Rainy day test - title
RSpec.describe Event, type: :model do
  subject do
    described_class.new(event_id: "1", admin_id: "101", Description:'This is a test description', time:"October 01, 2021")
  end

	it 'Title is invalid (needs to be string)' do
    subject.title = 31
    expect(subject).not_to be_valid
  end

  it 'Title cant be empty' do
    subject.title = nil
    expect(subject).not_to be_valid
  end
end

# Rainy day test - authdescriptionor
RSpec.describe Event, type: :model do
  subject do
    described_class.new(event_id: "1", admin_id: "101", title: 'Meditation', Description:'This is a test description', time:"October 01, 2021")
  end

  it 'Author cant be empty' do
    subject.author = nil
    expect(subject).not_to be_valid
  end
end