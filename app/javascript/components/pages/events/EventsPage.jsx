import React, { useState, useEffect } from 'react';
import { Button, Typography, Card, CardContent,  CardHeader, CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";
import AddEventForm from './AddEventForm'
import EditEvent from './EditEvent'
import Cookies from 'universal-cookie';
import useCookie from '../../UseCookie';

const EventsPage = (props) => {

  const [currentUserRaw, setCurrentUser, removeCurrentUser] = useCookie('currentUser', { path: '/' });
  const currentUser = (typeof currentUserRaw === 'string' || currentUserRaw instanceof String) ? JSON.parse(currentUserRaw) : currentUserRaw;
  const isAdmin = (currentUser?.user_type === 0) ?? false;
  //const email = currentUser?.username;
  //const userId = currentUser?.id;

  // console.log("Event Admin", isAdmin)
  // console.log("Event Email", email)
  // console.log("Event userId", userId)

  var state = {
    title: "",
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

	const handleAdd = (e, inputList=[]) => {
		e.preventDefault();
		const answer = window.confirm("Are you sure you would like to add this event?");

		if (answer) {
			const { title, description } = state;
			const admin_id = 101


			const body = {
				admin_id,
				title,
				description
			};

			databaseRequest("POST", body, 0);
      
      getEventID(body, inputList);

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
			const description = document.getElementById("edit-description"+String(event_id)).value;

			const body = {
				admin_id,
				title,
				description
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

  function saveNewInputList(event_id, inputList){
    for(let i = 0; i < inputList.length-1; i++){
      const { virtual_link, building, room, city, stateloc, start_time, end_time, id } = inputList[i] 

      const body = {
          event_id,
          virtual_link,
          building,
          room,
          city,
          stateloc,
          start_time,
          end_time
      };
      databaseRequest("POST", body, id, "/api/v1/locations", () => getInputList());
    }
  }

  function getEventID(body, inputList) {
    const url = "/api/v1/events";
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => {
          console.log(response);
          for(let i = response.length-1; i >= 0; i--){
            const { title, description, admin_id } = response[i];
            const { title: originalTitle, description: originalDesc, admin_id: originalAdminID } = body;
            if(title == originalTitle && description == originalDesc && admin_id == originalAdminID){
              saveNewInputList(response[i].id, inputList);
              break;
            }
          }
        })
        .catch(error => console.log(error));

    
  }

  function loadEvents() {
    useEffect(() => {
      getEvents()
    }, []);
  }


  loadEvents()
  //console.log(events)


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

  var cardStyle = {
    display: 'inline-block',
    backgroundColor: "white",
    margin: "10px 10px 10px 10px",
    borderRadius: '5px',
    gridColumn: "span 3",
    textAlign: "center"
  }

  var headerStyle = {
    textAlign: 'center',
    fontWeight: '900',
    backgroundColor: '#69306D',
    color: 'white'
  }

  var addBtnStyle = {
    position: "absolute",
    right: "1%",
    top: "10px"
  }

  if (events.length != 0) {
    const eventCards = events.map( (event, index) => 
      <Card key={event.id} style={cardStyle}>
        <CardActionArea onClick={() => {goToEvent(event.id)}}>
          <CardHeader
            style={headerStyle}
            title={event.title}
            subheader={<Typography style={headerStyle}>{"Click For More Details"}</Typography>}
          />

          <CardContent>
            <Typography style={{whiteSpace: 'pre-line', textAlign: 'center'}} color="text.secondary">
              {event.description}
            </Typography>
          </CardContent>
        
        </CardActionArea>
          
          {isAdmin ? (<Button variant='contained' color='secondary' onClick={() => {setEventIndex(index); setEditEvent(true)} }>Edit Event</Button>) : null} 
          <Button style={{margin: '1%'}} variant='contained' color='secondary' size='medium' onClick={() => {goToEvent(event.id)}} >View More Details and Locations</Button>
      </Card>
    );

    return (
      <>
      
      <div style={{position: "relative", marginBottom: '50px'}}>
        {isAdmin ? (<Button style={addBtnStyle} variant='contained' color='secondary' onClick={() => setAddForm(true)}>New Event</Button>) : null}
      </div>

      <div style={{position: "relative"}}>
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

            <div style={{position: "relative", margin: '5%', textAlign: 'center'}}>
              <h1>Loading Events...</h1>

              {isAdmin ? (<Button style={addBtnStyle} variant='contained' color='secondary' onClick={() => setAddForm(true)}>New Event</Button>) : null}
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
