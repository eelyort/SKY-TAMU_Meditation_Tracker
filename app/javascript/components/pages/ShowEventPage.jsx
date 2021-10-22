import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router";

const ShowEventPage = (props) => {
    const [event, setEvent] = useState([])

    const cardStyle = {
        backgroundColor: "dodgerblue",
        color: "black",
        border: "2px solid black",
        margin: "5% 10% 0% 10%",
        borderRadius: "25px",
        padding: "5%",
        textAlign: "center"
    };
    
    
    const getEvent = () => {
        const event_id = props.match.params.id;
        const url = "/api/v1/events/" + String(event_id);
        
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => setEvent( response ))
    }


    function loadEvent() {
        useEffect(() => {
          getEvent()
        }, []);
    }
    
    
    loadEvent()
    console.log(event)


    if (event.length != 0) {
        return(
            <>
            <div style={cardStyle}>
                <h1>{event.title}</h1>
                <p style={{borderBottom: "1px solid black", marginBottom: "5%"}}>Event Location: | {event.time} </p>
                <div>
                    <p>{event.description}</p>
                    <p>RSVP Link: </p>
                    <p>Attendance: </p>
                </div>
            </div>
            </>
        );
    }

    return (
        <div style={cardStyle}>
            <h1>Event Static Title</h1>
            <div>
                <p>Event Description</p>
                <p>Event Location: | Event Date: </p>
                <p>RSVP Link: </p>
                <p>Attendance: </p>
            </div>
        </div>
    );
}

export default withRouter(ShowEventPage);