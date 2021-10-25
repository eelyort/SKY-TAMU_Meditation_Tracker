# location: spec/unit/unit_spec.rb
require 'rails_helper'

# Sunny day test
RSpec.describe Event, type: :model do
  subject do
    described_class.new(event_id: 0, admin_id: 0, title: 'Meditation', description:'This is a test description', time:"October 01, 2021")
  end

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end


  it 'is valid and created on database' do
    params = {event_id: 15, admin_id: 0, title: 'Meditation', description:'This is a test description', time:"October 01, 2021"}
    one = Event.create!(params)
    expect(one).to be_valid
  end
 end

# Rainy day test - Event ID
RSpec.describe Event, type: :model do
  subject do
    described_class.new(event_id: 0, admin_id: 0, title: 'Meditation', description:'This is a test description', time:"October 01, 2021")
  end

  it 'ID is invalid (needs to be integer)' do
    subject.event_id = "test"
    expect(subject).not_to be_valid
  end

  it 'ID cannot be empty' do
    subject.event_id = nil
		expect(subject).not_to be_valid
	end

  it 'ID cannot be a float (needs to be integer)' do
    subject.event_id = 1.567
		expect(subject).not_to be_valid
	end

  it 'ID cannot be less than zero' do
    subject.event_id = -1
		expect(subject).not_to be_valid
	end
end

# Rainy day test - Admin ID
RSpec.describe Event, type: :model do
  subject do
    described_class.new(event_id: 0, admin_id: 0, title: 'Meditation', description:'This is a test description', time:"October 01, 2021")
  end

  it 'admin ID is invalid (needs to be integer)' do
    subject.admin_id = "test"
    expect(subject).not_to be_valid
  end

  it 'admin ID cannot be empty' do
    subject.admin_id = nil
		expect(subject).not_to be_valid
	end

  it 'admin ID cannot be a float (needs to be integer)' do
    subject.admin_id = 1.567
		expect(subject).not_to be_valid
	end

  it 'admin ID cannot be less than zero' do
    subject.admin_id = -1
		expect(subject).not_to be_valid
	end
end

# Rainy day test - title
RSpec.describe Event, type: :model do
  subject do
    described_class.new(event_id: 0, admin_id: 0, title: 'Meditation', description:'This is a test description', time:"October 01, 2021")
  end

  it 'title cannot be empty' do
    subject.title = nil
    expect(subject).not_to be_valid
  end
end

# Rainy day test - description
RSpec.describe Event, type: :model do
  subject do
    described_class.new(event_id: 0, admin_id: 0, title: 'Meditation', description:'This is a test description', time:"October 01, 2021")
  end

  it 'description cannot be empty' do
    subject.description = nil
    expect(subject).not_to be_valid
  end
end

# Rainy day test - time
RSpec.describe Event, type: :model do
  subject do
    described_class.new(event_id: 0, admin_id: 0, title: 'Meditation', description:'This is a test description', time:"October 01, 2021")
  end

  it 'time cannot be empty' do
    subject.time = nil
    expect(subject).not_to be_valid
  end
end