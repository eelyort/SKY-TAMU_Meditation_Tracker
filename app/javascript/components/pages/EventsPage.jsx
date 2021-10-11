import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import axios from 'axios'
import AddEventForm from './AddEventForm'



function renderForm(event) {
  
  return (
    <div> 
      <form id= "add-event" onSubmit="addEvent">

        <label>Event Title:</label>
        <input type="string"> </input>

        <label>Event Description:</label>
        <textarea type="text" />

        <label>Event Time:</label>
        <input type="string"></input>

        <button onClick={(e)=> {addEvent(e)}}>Create</button>
        <button>Cancel</button>

      </form>
    </div>
  );
}

const EventsPage = (props) => {
  const [events, setEvents] = useState([])
  const [addForm, setAddForm] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = window.confirm("are you sure?");
    if (answer) {
      // Save it!
      setAddForm(false)
      console.log("Thing was saved to the database.");
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };

  useEffect(()=>{
    axios.get('api/v1/events.json')
    .then( resp => {
      setEvents(resp.data)
    } )
    .catch(resp => console.log(resp) )
  }, [events.length])

  // if (events.length != 0){
  //   console.log(events)
  //   console.log("test")
  // }
  

  var cardStyle = {
      display: 'inline-block',
      width: '30vw',
      height: '50%',
      backgroundColor: "#89DAFF",
      margin: "10px 10px 10px 5px",
  }

  var headerStyle = {
    textAlign: 'center',
    fontWeight: '900',
    color: '#69306D'

  }

  // if (events.length != 0) {
  //   const eventsGrid = events.map( event => 
  //     <li key={event.event_id}>{event.title}</li>
  //   );
  //   return (
  //     <>
  //       <h1>Events</h1>
  //       <ul>{eventsGrid}</ul>
  //     </>
  //   );

  if (events.length != 0) {
    const eventCards = events.map( event => 
      <Card key={event.event_id} style={cardStyle}>
        <CardHeader
          style={headerStyle}
          title={event.title}
          subheader={event.time}
        />
        <CardContent>
          <Typography color="text.secondary">
            {event.description}
          </Typography>
        </CardContent>
      </Card>
    );

    return (
      <>
        <h1>Events</h1>
        
        {eventCards}
        
        <button onClick={() => setAddForm(true)}>New Event</button>

        <AddEventForm 
          comp="Event"
          func={handleSubmit}
          trigger={addForm} 
          setTrigger={setAddForm}>
        </AddEventForm>

      </>
    );

  } else {

    return (
        <>
            <h1>Events</h1>
            <Card style={cardStyle}>
              <CardHeader
                style={headerStyle}
                title={"Breath Breaks"}
                subheader={"Every Thursday | 6pm-6:30pm CST | FREE Entry"}
              />
              <CardContent>
                <Typography color="text.secondary">
                  A guided meditation, breathwork, & connection session (30 minutes)
                  tailored for small/large groups virtually every week led by a certified
                  meditation and breathwork instructor from SKY Campus Happiness.  All
                  of these instructors have offered to lead these free of charge.
                  Session is open to anyone and no meditation experience required.
                </Typography>
              </CardContent>
            </Card>
            <Card style={cardStyle}>
              <CardHeader
                style={headerStyle}
                title={"Online SKY Happiness Retreat"}
                subheader={"Sept 18-20 | Sat, Sun: 2pm-5pm Mon: 6-9pm CST"}
              />
              <CardContent>
                <Typography color="text.secondary">
                  3-session Retreat which trains participants in the evidence-based
                  SKY meditation practice, breathwork practices, yoga, social connection,
                  emotional intelligence, and mindful leadership. SKY Meditation has been
                  shown to significantly reduce anxiety and depression, lower stress
                  markers, and increase wellbeing, focus, and optimism. This is one of
                  the most powerful programs that we offer, and we support committed
                  students with scholarships also for the retreat.
                </Typography>
                <Typography color="text.secondary">
                  Instructor: Annelies Richmond (National Director of SKY)
                </Typography>
                <Typography color="text.secondary">
                  After Scholarship, Retreat Price: Students: $30, Staff/Faculty: $100
                </Typography>
                <Typography color="text.secondary">
                  Limited Spots | Register: bit.ly/skyretreatfall
                </Typography>
              </CardContent>
            </Card>
            <Card style={cardStyle}>
              <CardHeader
                style={headerStyle}
                title={"SKY @ TAMU Discord Server"}
                subheader={"https://discord.gg/fmxHPE9nck"}
              />

              <CardContent>
                <Typography color="text.secondary">
                  Join an informal discord community of like-minded people, share your thoughts, ask questions or any information.
                </Typography>
              </CardContent>
            </Card>
        </>
    );
  }
}

export default EventsPage;
