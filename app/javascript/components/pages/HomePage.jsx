import React, { useState, useEffect }from 'react';
import HeroImage from 'images/iStock-1161561165.jpg';
import Carousel from 'react-material-ui-carousel'
import { Button, Typography, Paper } from '@mui/material';
import { Link } from "react-router-dom";
import { Card, CardContent,  CardHeader, CardActionArea } from '@mui/material';
import AddEventForm from './events/AddEventForm'
import EditEvent from './events/EditEvent'
import AttendancePage from './AttendancePage'
//import DateTime from DateTime;
//import DateTime from 'react-datetime';


var tot_time = 0
var count1 = 0
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
   var retData;
  const [inputList, setInputList] = useState([{ virtual_link: "", building: "", room: "", city: "", stateloc: "", start_time: "", end_time: "" }]);
  const getInputList = () => {
      const url = "/api/v1/locations";
      fetch(url)
          .then(response => {
              if (response.ok) {
                 //retData = response.json();
                  return response.json();
              }
              throw new Error("Network response was not ok.");
          })
          .then(response => {
            console.log(response);
            //setInputList(retData);
            setInputList([...response, { virtual_link: "", building: "", room: "", city: "", stateloc: "", start_time: "", end_time: "" }])
          })
         // .then(response => setInputList( response ))
         .catch(error => console.log(error));
  }

/*  function loadInputList() {
    useEffect(() => {
      getInputList()
    }, []);
  }*/


// const [attendances, setAttendances] = React.useState(undefined);
const [attendances, setAttendances] = useState([]);
console.log("Here")

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
            setAttendances(response);

        })
        .catch(err => console.log("Error: " + err));
}

/* const fetchAttendance = () => {
    const url = "/attendances";
    const response = fetch(url);
    const json = response.json;
    setAttendances(json.data);
    console.log(attendances);
  }
  */

React.useEffect(() => {
    fetchAttendance();
    getInputList();
    console.log(attendances);
}, []);



const getTimeTracker = () => {
    count1 = 0;
    tot_time = 0;
    var time_difference;
    console.log("Length of Locations " + inputList.length);
    inputList.forEach(location => {
        let count = attendences?.filter(attendance => {
            return (attendances.RSVP = 'Yes') && (attendance.location_id == location.id && attendance.event_id == location.event_id);
        }).length ?? 0;

        if(location?.start_time && location?.end_time){
            var start = new Date(location.start_time);
            var end = new Date(location.end_time);
            // date - date returns milliseconds
            time_difference = (end - start) / (1000 * 60 * 60);
        }
        console.log("start time " + location.start_time);
        console.log("end time " + location.end_time);
        console.log("time difference " + time_difference);
        count1 += count;
        tot_time += count * time_difference;
   });
//   return tot_time;
}
//React.useEffect(() => {
    getTimeTracker();
//    console.log(tot_time);
//}, []);
    var CarouselItems = [
        {
            name: (Math.round(number * 10) / 10).toFixed(1) + " Hours Meditated Total",

            description: count1 + " of people expected at next session",
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
    ];

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

export default HomePage;
