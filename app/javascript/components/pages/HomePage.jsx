import React, { useState, useEffect }from 'react';
import Carousel from 'react-material-ui-carousel'
import { Button, Typography, Paper } from '@mui/material';
import { Link } from "react-router-dom";
import { Card, CardContent,  CardHeader, CardActionArea } from '@mui/material';
import AddEventForm from './events/AddEventForm'
import EditEvent from './events/EditEvent'

import CarouselImage1 from 'images/iStock-1161561165.jpg';
import CarouselImage2 from 'images/iStock-1161561165.jpg';
import CarouselImage3 from 'images/iStock-1161561165.jpg';
//import DateTime from DateTime;
//import DateTime from 'react-datetime';


function Item(props)
{
    return (
        <Paper elevation={6}>
            <div className="wrapper homepage">
                <div className="homepage-hero">
                    <div className='overlay'>
                        <img src={props.item.image} width={"100%"} height={"100%"}/>
                        {/* <div style={{backgroundImage: 'url(images/iStock-1161561165.jpg)'}}></div> */}
                    </div>

                    <div className='shading overlay'></div>

                    <div className='text'>
                        <Typography variant="h2">
                            {props.item.name}
                        </Typography>

                        <Typography variant="h5">
                            {props.item.description}
                        </Typography>

                        <Button
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to={String('/'+ props.item.link)}
                            //onClick={ () => {console.log(String('/'+ props.item.link), "button clicked.")} }
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
    const [locations, setLocations] = useState([{ virtual_link: "", building: "", room: "", city: "", stateloc: "", start_time: "", end_time: "" }]);
    const getLoctions = () => {
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
                setLocations([...response])
            })
            // .then(response => setInputList( response ))
            .catch(error => console.log(error));
    }

    // const [attendances, setAttendances] = React.useState(undefined);
    const [attendances, setAttendances] = useState([]);

    // componentDidMount
    const fetchAttendance = () => {
        console.log("Fetching attendances...");
        const url = "/attendances";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                console.log("fetched attendances:");
                console.log(response);
                setAttendances(response);
            })
            .catch(err => console.log("Error: " + err));
    }

    React.useEffect(() => {
        fetchAttendance();
        getLoctions();
    }, []);

    const [timeTrackerState, setTimeTrackerState] = useState([0, 0]);

    const getTimeTracker = () => {
        let count1 = 0;
        let tot_time = 0;
        let time_difference = 0;
        //console.log("Length of Locations " + locations.length);
        //console.log(attendances);
        locations.forEach((location, index) => {
            let count = attendances?.filter(attendance => {
                return (attendance.RSVP == 'Yes') && (attendance.location_id == location.id && attendance.event_id == location.event_id);
            }).length ?? 0;
            //console.log(`Location ${index} count: ${count}`);

            if(location?.start_time && location?.end_time){
                let start = new Date(location.start_time);
                let end = new Date(location.end_time);
                // date - date returns milliseconds
                time_difference = (end - start) / (1000 * 60 * 60);
            }
            // console.log("start time " + location.start_time);
            // console.log("end time " + location.end_time);
            // console.log("time difference " + time_difference);
            count1 += count;
            tot_time += count * time_difference;
        });
        return [count1, tot_time];
    }

    React.useEffect(() => {
        //console.log("Attendances/Locations updated:");
        //console.log(attendances);
        //console.log(locations);
        setTimeTrackerState(getTimeTracker);
    }, [attendances, locations]);

    //React.useEffect(() => {
    //    console.log(tot_time);
    //}, []);
    const [nextSessionAttendance, totalTime] = timeTrackerState;
    const pluralHour = (Math.round(totalTime) == 1) ? "Hour" : "Hours" 
    const pluralPerson = (nextSessionAttendance == 1) ? "person" : "people" 
    const CarouselItems = [
        {
            name: `${Math.round(totalTime)} ${pluralHour} Meditated`,
            description: `${nextSessionAttendance} ${pluralPerson} expected at next session`,
            button: "See Events",
            link: "events",
            image: CarouselImage1
        },
        {
            name: "About SKY@TAMU",
            description: "Learn all about SKY@TAMU",
            button: "Learn More",
            link: "about",
            image: CarouselImage2
        },
        {
            name: "Testimonials",
            description: "View community testimonials",
            button: "See Testimonials",
            link: "about#testimonials",
            image: CarouselImage3
        }
    ];

    return (
        <>
            <div draggable="false" className="carousel-swipe" style={{backgroundColor: "#c8a2c8ff"}}>
                <Carousel
                    swipe = {true}
                    autoPlay = {true}
                    interval = {4000}
                    animation = {"slide"}
                    //navButtonsAlwaysVisible = {true}
                    // next={ (next, active) => { console.log(`we left ${active}, and are now at ${next}`); } }
                    // prev={ (prev, active) => { console.log(`we left ${active}, and are now at ${prev}`); } }
                >
                    { CarouselItems.map( (item, i) => <Item key={i} item={item} /> ) }
                </Carousel>
            </div>
        </>
    );
}

export default HomePage;
