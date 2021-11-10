# frozen_string_literal: true

# location: spec/unit/unit_spec.rb
require 'rails_helper'

# Events
# Sunny day test
RSpec.describe Event, type: :model do
  subject do
    described_class.new(admin_id: 0, title: 'Meditation', description:'This is a test description')
  end

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end

  it 'is valid and created on database' do
    params = { admin_id: 0, title: 'Meditation', description: 'This is a test description' }
    one = Event.create!(params)
    expect(one).to be_valid
  end
end

# Rainy day test - Admin ID
RSpec.describe Event, type: :model do
  subject do
    described_class.new(admin_id: 0, title: 'Meditation', description:'This is a test description')
  end

  it 'admin ID is invalid (needs to be integer)' do
    subject.admin_id = 'test'
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
    described_class.new(admin_id: 0, title: 'Meditation', description:'This is a test description')
  end

  it 'title cannot be empty' do
    subject.title = nil
    expect(subject).not_to be_valid
  end
end

# Rainy day test - description
RSpec.describe Event, type: :model do
  subject do
    described_class.new(admin_id: 0, title: 'Meditation', description:'This is a test description')
  end

  it 'description cannot be empty' do
    subject.description = nil
    expect(subject).not_to be_valid
  end
end

# Users
# Sunny day test
RSpec.describe User, type: :model do
  subject do
    described_class.new(username: 'testemail@tamu.edu', firstname: 'firstName', lastname: 'lastName', user_type: 1)
  end

  it 'is valid with complete valid attributes' do
    expect(subject).to be_valid
  end

  it 'is valid with minimal valid attributes' do
    subject.firstname = nil
    subject.lastname = nil
    subject.user_type = nil
    expect(subject).to be_valid
  end

  it 'is valid and succesfully creates in database with complete attributes' do
    params = { username: 'testemail@tamu.edu', firstname: 'firstName', lastname: 'lastName', user_type: 1 }
    one = described_class.create!(params)
    expect(one).to be_valid
  end

  it 'is valid and succesfully creates in database with minimal attributes' do
    params = { username: 'testemail@tamu.edu' }
    one = described_class.create!(params)
    expect(one).to be_valid
  end

  it 'succesfully creates in database with correct default values' do
    params = { username: 'testemail@tamu.edu' }
    one = described_class.create!(params)
    expect(one).to have_attributes(user_type: 1)
  end
end
# Rainy Day Test: username
RSpec.describe User, type: :model do
  subject do
    described_class.new(username: 'testemail@tamu.edu', firstname: 'firstName', lastname: 'lastName', user_type: 1)
  end

  it 'is invalid with an empty username' do
    subject.username = nil
    expect(subject).not_to be_valid
  end
end

# Locations
# Sunny day test
RSpec.describe Location, type: :model do
  subject do
    described_class.new(event_id: 0, virtual_link: 'test link', building:'test building', room:'test room', city:'test city', stateloc:'test state', date:'11-11-2011', time:'17:53')
  end

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end


  it 'is valid and created on database' do
    params = {event_id: 0, virtual_link: 'test link', building:'test building', room:'test room', city:'test city', stateloc:'test state', date:'11-11-2011', time:'17:53'}
    one = Location.create!(params)
    expect(one).to be_valid
  end
 end

# Rainy day test - Event ID
RSpec.describe Location, type: :model do
  subject do
    described_class.new(event_id: 0, virtual_link: 'test link', building:'test building', room:'test room', city:'test city', stateloc:'test state', date:'11-11-2011', time:'17:53')
  end

  it 'event ID is invalid (needs to be integer)' do
    subject.event_id = "test"
    expect(subject).not_to be_valid
  end

  it 'event ID cannot be empty' do
    subject.event_id = nil
    expect(subject).not_to be_valid
  end

  it 'event ID cannot be a float (needs to be integer)' do
    subject.event_id = 1.567
    expect(subject).not_to be_valid
  end

  it 'event ID cannot be less than zero' do
    subject.event_id = -1
    expect(subject).not_to be_valid
  end
end
