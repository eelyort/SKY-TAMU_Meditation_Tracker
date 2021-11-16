import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

const ShowEventPage = (props) => {
    const [event, setEvent] = useState([])

    const cardStyle = {
        backgroundColor: "#C8A2C8",
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
            .then(response => setInputList(response))
    }

    function loadEvent() {
        useEffect(() => {
          getEvent()
        }, []);
    }
    
    function loadInputList() {
        useEffect(() => {
            getInputList()
        }, []);
        }
    
    loadInputList()

    loadEvent()
    console.log(event)

        

    if (event.length != 0) {
        return(
            <>
            <div style={cardStyle}>
                <h1>{event.title}</h1>
                <div>
                    <p>{event.description}</p>
                    <p>RSVP Link: <Link to={`/newattendance/${event.id}`}>CLICK</Link></p>
                    <p>Attendance: </p>
                    <p>Locations:</p>
                        {inputList.map((x, i) => {
                            if(x.event_id == props.match.params.id || !x.event_id){
                                return (
                                <div key={x.id}>
                                    <ul>
                                        <li>Virtual Link: {x.virtual_link}</li>
                                        <li>Building: {x.building}</li>
                                        <li>Room: {x.room}</li>
                                        <li>City: {x.city}</li>
                                        <li>State: {x.stateloc}</li>
                                        <li>
                                            <div>
                                                <TextField
                                                    disabled="true"
                                                    id="datetime-local"
                                                    name="start_time"
                                                    value={x.start_time}
                                                    label="Start Time: "
                                                    type="datetime-local"
                                                    sx={{ width: 250 }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <TextField
                                                    disabled="true"
                                                    id="datetime-local"
                                                    name="end_time"
                                                    value={x.end_time}
                                                    label="End Time: "
                                                    type="datetime-local"
                                                    sx={{ width: 250 }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                );
                            }
                            else{
                                return null;
                            }
                        })}
                </div>
            </div>
            </>
        );
    }

    return (
        <div style={cardStyle}>
            <h1>Event Not Found</h1>
        </div>
    );
}

export default withRouter(ShowEventPage);