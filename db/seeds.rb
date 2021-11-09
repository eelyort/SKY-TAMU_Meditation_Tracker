# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Example:
9.times do |i|
  Attendance.create(
    RSVP: 'Yes'
  )
end

# users
9.times do |i|
  User.create(
    username: "username #{i}",
    firstname: "firstname #{i}",
    lastname: "lastname #{i}",
    user_type: 1
  )
end
Event.create([
  {
    # event_id: 1,
    admin_id: 101,
    title: "Online SKY Happiness Retreat",
    description: "3-session Retreat which trains participants in the evidence-based SKY meditation practice, breathwork practices, yoga, social connection, emotional intelligence, and mindful leadership. SKY Meditation has been shown to significantly reduce anxiety and depression, lower stress markers, and increase wellbeing, focus, and optimism. This is one of the most powerful programs that we offer, and we support committed students with scholarships also for the retreat."
  },
  {
    # event_id: 2,
    admin_id: 101,
    title: "SKY @ TAMU Discord Server",
    description: "Join an informal discord community of like-minded people, share your thoughts, ask questions or any information."
  },
  {
    # event_id: 3,
    admin_id: 101,
    title: "Breath Breaks",
    description: "A guided meditation, breathwork, & connection session (30 minutes) tailored for small/large groups virtually every week led by a certified 
                  meditation and breathwork instructor from SKY Campus Happiness. All of these instructors have offered to lead these free of charge. 
                  Session is open to anyone and no meditation experience required."
  }
])

Location.create([
  {
    # location_id: 1,
    event_id: 2,
    virtual_link: "google.com",
    building: "Zachry",
    room: "244",
    city: "College Station",
    stateloc: "Texas",
    date: "11-11-2011",
    time: "17:53"
  },
  {
    # location_id: 2,
    event_id: 2,
    virtual_link: "bing.com",
    building: "MSC",
    room: "598",
    city: "College Station",
    stateloc: "Texas",
    date: "11-11-2011",
    time: "17:53"
  }
])
