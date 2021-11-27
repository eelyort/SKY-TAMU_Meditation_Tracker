import React, { useState, useEffect } from 'react';

/* Added */
import { Card, CardContent,  CardHeader, CardActionArea } from '@mui/material';
import AddEventForm from './events/AddEventForm'
import EditEvent from './events/EditEvent'

import React from 'react';
import HeroImage from 'images/iStock-1161561165.jpg';
import Carousel from 'react-material-ui-carousel'
import { Button, Typography, Paper } from '@mui/material';
import { Link } from "react-router-dom";


function Item(props)
{
    return (
        <Paper elevation={6}>
            <div className="wrapper homepage">
                <div className="homepage-hero">
                    <div className='overlay'>
                        <img src={props.item.image} />
                    </div>

                    <div className='shading overlay'></div>

                    <div className='text'>
                        <Typography variant="h1">
                            {props.item.name}
                        </Typography>

                        <Typography variant="h4">
                            {props.item.description}
                        </Typography>

                        <Button
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to={String('/'+ props.item.link)}
                            onClick={ () => {console.log(String('/'+ props.item.link), "button clicked.")} }
                        >
                            {props.item.button}
                        </Button>
                    </div>
                </div>
            </div>
        </Paper>
    )
}


const HomePage = (props) => {

/* const [events, setEvents] = useState([])
var totTime = 0
var tot_time = 0;
var i = 0;
const databaseRequest = (method, body, event_id, url = "/api/v1/events", callback = () => NULL) => {

  if(method == "DELETE" || method == "PATCH") {
    url += "/"+String(event_id);
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
} */

/* New add */

/* const getEvents = () => {
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

const getEventIndex = (event_id) => {
events.forEach(event => {
  if(event.event_id == event_id) {
    return i;
      }
  });
}

const [inputList, setInputList] = useState([{ virtual_link: "", building: "", room: "", city: "", stateloc: "", start_time: "", end_time: "" }]);
const getInputList = () => {
    const url = "/api/v1/locations";
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
      //  .then(response => setInputList([...response, { virtual_link: "", building: "", room: "", city: "", stateloc: "", start_time: "", end_time: "" }]))
       .then(response => setInputList( response ))
       .catch(error => console.log(error));
}

function loadInputList() {
  useEffect(() => {
    getInputList()
}, []);
}
const [attendance, setAttendance] = React.useState(undefined);

// componentDidMount
const fetchAttendance = () => {
    const url = "/attendances";
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => {
            console.log(response);
            setAttendance(response);
        })
        .catch(err => console.log("Error: " + err));
}
React.useEffect(() => {
    fetchAttendance();
}, []);

/*const getEventTimes = () => {
  events.forEach(event => {
     totTime = totTime + event.time;
  });
}
*/

/* const getTimeTracker = () => {

 var count = 0;

 inputList.forEach(location => {
   attendance.forEach(attendance => {
     if((attendance.RSVP = "Yes") && (attendance.event_id == inputList.event_id))
         count++;
    });

    tot_time += count;
 });
  /* tot_time = count * (event.time) */
  // tot_time = count * 16;
/* } */

/* function loadEvents() {
  useEffect(() => {
  //  getEvents()
//    getEventTimes()
    //getTimeTracker()
  }, []);
} */


/* loadEvents()
console.log(events) */


function Item(props)
{
    return (
        <Paper elevation={6}>
            <div className="wrapper homepage">
                <div className="homepage-hero">
                    <div className='overlay'>
                        <img src={props.item.image} />
                    </div>

                    <div className='shading overlay'></div>

                    <div className='text'>
                        <Typography variant="h1">
                            {props.item.name}
                        </Typography>

                        <Typography variant="h4">
                            {props.item.description}
                        </Typography>

                        <Button
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to={String('/'+ props.item.link)}
                            onClick={ () => {console.log(String('/'+ props.item.link), "button clicked.")} }
                        >
                            {props.item.button}
                        </Button>
                    </div>
                </div>
            </div>
        </Paper>
    )
}

const HomePage = (props) => {

    var CarouselItems = [
        {
            name: "1000 Hours Meditated Total",
            description: "# of people expected at next session",
            button: "See Events",
            link: "events",
            image: HeroImage
        },
        {
            name: "About SKY@TAMU",
            description: "Learn all about SKY@TAMU",
            button: "Learn More",
            link: "members",
            image: HeroImage
        },
        {
            name: "User Testimonials",
            description: "View community testimonials",
            button: "See Testimonials",
            link: "home",
            image: HeroImage
        }
    ]

    return (
        <>
            <div draggable="false" className="carousel-swipe" style={{backgroundColor: "#c8a2c8ff"}}>
                <Carousel
                    swipe = {true}
                    autoPlay = {false}
                    interval = {false}
                    animation = {"slide"}
                    navButtonsAlwaysVisible = {true}
                    next={ (next, active) => { console.log(`we left ${active}, and are now at ${next}`); } }
                    prev={ (prev, active) => { console.log(`we left ${active}, and are now at ${prev}`); } }

                >
                    { CarouselItems.map( (item, i) => <Item key={i} item={item} /> ) }
                </Carousel>
            </div>

            {/* <div className="wrapper homepage">
                <div className="homepage-hero">
                    <div className={'overlay'}>
                        <img src={HeroImage} />
                    </div>
                    <div className={'shading overlay'}>
                    </div>
                    <div className={'text'}>
                        <Typography variant="h1">
                            1000 Hours Meditated Total
                        </Typography>
                        <Button variant="contained" color="secondary" component={Link} to={'/events'}>See Events</Button>
                    </div>
                </div>
            </div> */}

            <div className="homepage-content-wrapper">
                <Typography variant="h5">
                    About
                </Typography>
                <Typography variant="body1">
                    SKY@TAMU is a Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </div>
            <div className="homepage-content-wrapper">
                <Typography variant="h5">
                    Members
                </Typography>
                <Typography variant="body1">
                    SKY@TAMU is a Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </div>
        </>
    );
}
}

export default HomePage;
