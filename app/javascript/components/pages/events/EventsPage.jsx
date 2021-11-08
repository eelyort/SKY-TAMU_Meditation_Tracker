import React, { useState, useEffect } from 'react';
import { Button, Typography, Card, CardContent,  CardHeader, CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";
import AddEventForm from './AddEventForm'
import EditEvent from './EditEvent'

const EventsPage = (props) => {
  const { isAdmin = true } = props;

  var state = {
    title: "",
    time: "",
    description: ""
  };

  const [events, setEvents] = useState([])
  const [addForm, setAddForm] = useState(false)
  const [editEvent, setEditEvent] = useState(false)
  const [eventIndex, setEventIndex] = useState(0)
  //const [eventsEmpty, setEventsEmpty] = useState(false)


  const onChange = (e) => {
    if (e.target.name == "title"){
      state.title = e.target.value
    } else if (e.target.name == "time") {
      state.time = e.target.value
    } else {
      state.description = e.target.value
    }
  }

  const databaseRequest = (method, body, id, url = "/api/v1/events", callback = () => NULL) => {

    if(method == "DELETE" || method == "PATCH") {
      url += "/" + String(id);
    }
    
    const token = document.querySelector('meta[name="csrf-token"]').content;

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
        callback();
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
			const admin_id = 101


			const body = {
				admin_id,
				title,
				description,
				time
			};

			databaseRequest("POST", body, 0);

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
        .catch(error => console.log(error));
  }

  function loadEvents() {
    useEffect(() => {
      getEvents()
    }, []);
  }


  loadEvents()
  console.log(events)


  const goToEvent = (event_id) => {
    const path = `/event/${event_id}`;
    console.log("Path", path);
    window.location = path;
  }

  var cardContainer = {
    display: 'grid',
    gridTemplateColumns: "repeat(3, 1fr)",
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: "5% 15% 5% 15%"
  }

  var cardStyle0 = {
    display: 'inline-block',
    backgroundColor: "white",
    margin: "10px 10px 10px 10px",
    borderRadius: '5px',
    gridColumn: "span 3"
  }

  var cardStyle1 = {
    display: 'inline-block',
    backgroundColor: "white",
    margin: "10px 10px 10px 10px",
    borderRadius: '5px'
  }

  var headerStyle = {
    textAlign: 'center',
    fontWeight: '900',
    backgroundColor: '#69306D',
    color: 'white'
  }

  var addBtnStyle = {
    position: "absolute",
    top: "2%",
    right: "2%",
    borderRadius: "5px"
  }

  if (events.length != 0) {
    const eventCards = events.map( (event, index) => 
      <Card key={event.id} style={index == 0 ? cardStyle0 : cardStyle0}>
        <CardActionArea onClick={() => {goToEvent(event.id)}}>
          <CardHeader
            style={headerStyle}
            title={event.title}
            subheader={<Typography style={headerStyle}>{event.time}</Typography>}
          />
          </CardActionArea>

          <CardContent>
            <Typography style={{whiteSpace: 'pre-line', textAlign: 'center'}} color="text.secondary">
              {event.description}
            </Typography>
          </CardContent>

          <button onClick={() => {setEventIndex(index); setEditEvent(true)} }>Edit Event</button>
      </Card>
      
    );

    return (
      <>
      <div style={{position: "relative"}}>
        <button style={addBtnStyle} onClick={() => setAddForm(true)}>New Event</button>

        <div style={cardContainer}>
				{eventCards}
        </div>
      </div>

      <AddEventForm 
        comp="Event"
        submitFunc={handleAdd}
        changeFunc={onChange}
        trigger={addForm} 
        setTrigger={setAddForm}>
      </AddEventForm>

      <EditEvent
        event={events[eventIndex]}
        submitFunc={handleEdit}
        deleteFunc={handleDelete}
        changeFunc={onChange}
        trigger={editEvent} 
        setTrigger={setEditEvent}
        databaseRequest={databaseRequest}>
      </EditEvent>
      </>
    );

  } else {

    return (
        <>  

            <div style={{position: "relative"}}>
              <h1>Loading Events...</h1>

              <button style={addBtnStyle} onClick={() => setAddForm(true)}>New Event</button>
            </div>

            <AddEventForm
              comp="Event"
              submitFunc={handleAdd}
              changeFunc={onChange}
              trigger={addForm} 
              setTrigger={setAddForm}>
            </AddEventForm>
        </>
    );
  }
}

export default EventsPage;
