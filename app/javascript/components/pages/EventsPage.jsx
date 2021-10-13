import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import AddEventForm from './AddEventForm'
import EditEvent from './EditEvent'

const EventsPage = (props) => {

  var state = {
    title: "",
    time: "",
    description: ""
  };

  const [events, setEvents] = useState([])
  const [addForm, setAddForm] = useState(false)
  const [editEvent, setEditEvent] = useState(false)
  const [eventIndex, setEventIndex] = useState(0)


  const onChange = (e) => {
    console.log(e.target.name)
    if (e.target.name == "title"){
      state.title = e.target.value
    } else if (e.target.name == "time") {
      state.time = e.target.value
    } else {
      state.description = e.target.value
    }
  }


  const databaseRequest = (method, body, event_id) => {
    var url = "/api/v1/events";

    if(method == "DELETE" || method == "PATCH") {
      url += "/"+String(event_id);
    }
    
    const token = document.querySelector('meta[name="csrf-token"]').content;
    console.log(JSON.stringify(body))

    fetch(url, {
      method: method,
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .catch(error => console.log(error.message));
  }


  const handleAdd = (e) => {
    e.preventDefault();
    const answer = window.confirm("Are you sure you would like to add this event?");

    if (answer) {
      const { title, time, description } = state;
      const event_id = events.length + 1
      const admin_id = 101

      const body = {
        event_id,
        admin_id,
        title,
        description,
        time
      };

      databaseRequest("POST", body, event_id);

      setAddForm(false)
      window.location.reload(true);
    }
  };


  const handleEdit = (e) => {
    e.preventDefault();

    const answer = window.confirm("Are you sure you would like to edit this event?");

      if (answer) {
        const event_id =  e.target.name
        const admin_id = 101

        const title = document.getElementById("edit-title"+String(event_id)).value;
        const time = document.getElementById("edit-time"+String(event_id)).value;
        const description = document.getElementById("edit-description"+String(event_id)).value;

        const body = {
          event_id,
          admin_id,
          title,
          description,
          time
        };

        databaseRequest("PATCH", body, event_id)
        
        setEditEvent(false)
        window.location.reload(true);
      }
  };


  const handleDelete = (e) => {
    e.preventDefault();
    
    const answer = window.confirm("WARNING! \n Are you sure you would like to delete this event?");

      if (answer) {
        const event_id =  e.target.name

        databaseRequest("DELETE", {}, event_id)

        setEditEvent(false)
        window.location.reload(true);
      }
  };


  const getEvents = () => {
    const url = "/api/v1/events";
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => setEvents( response ))
  }


  function loadEvents() {
    useEffect(() => {
      getEvents()
    }, []);
  } 


  loadEvents()
  console.log(events)


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

  if (events.length != 0) {
    const eventCards = events.map( (event, index) => 
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
        <button onClick={() => {setEventIndex(index); setEditEvent(true)} }>Edit Event</button>
      </Card>
    );

    return (
      <>
        <h1>Events</h1>
        
        {eventCards}
        
        <button onClick={() => setAddForm(true)}>New Event</button>

        <AddEventForm 
          comp="Event"
          submitFunc={handleAdd}
          changeFunc={onChange}
          trigger={addForm} 
          setTrigger={setAddForm}>
        </AddEventForm>

        <EditEvent
          submitFunc={handleEdit}
          changeFunc={onChange}
          event_ID={events[eventIndex].event_id}
          title={events[eventIndex].title}
          time={events[eventIndex].time}
          description= {events[eventIndex].description}
          deleteFunc={handleDelete}
          trigger={editEvent} 
          setTrigger={setEditEvent}>
        </EditEvent>
      </>
    );

  } else {

    return (
        <>
            <h1>Error Loading Events From Database</h1>
        </>
    );
  }
}

export default EventsPage;
