import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router";
import { Button, Typography, Card, CardContent,  CardHeader } from '@mui/material';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

const ShowEventPage = (props) => {
    const [event, setEvent] = useState([])
    var counter = 0

    const cardStyle = {
        backgroundColor: "#C8A2C8",
        color: "black",
        border: "2px solid black",
        margin: "5%",
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
                <Typography variant="h4" component="div" gutterBottom>
                    <strong>
                        {event.title}
                    </strong>
                </Typography>

                <div>
                    <div style={{margin: '10% 0%'}}>
                        <Typography variant="h5" component="div" gutterBottom>
                            <strong>
                                Description
                            </strong>
                        </Typography>

                        <Typography style={{whiteSpace: 'pre-line', textAlign: 'left'}} component="div" color="text.secondary" gutterBottom>
                            {event.description}
                        </Typography>

                        <Button component={Link} to={`/newattendance/${event.id}`} variant='contained' color='secondary'>RSVP to Event</Button>
                    </div>
                    
                    <div style={{marginTop: '5%'}}>
                        <Typography variant="h5" component="div" gutterBottom>
                            <strong>
                                Locations and Scheduling
                            </strong>
                        </Typography>
                        
                        {inputList.map((x, i) => {
                            if(x.event_id == props.match.params.id || !x.event_id){
                                counter++
                                return (
                                <div key={x.id}>
                                    <Card key={event.id} style={{border: "2px solid black", borderRadius: "25px", backgroundColor: "#C8A2C8", margin: "2% 10%"}}>

                                        <CardContent>
                                            <Typography variant="h6" component="div" gutterBottom>
                                                <strong>
                                                    {`Location ${counter}`}
                                                </strong>
                                            </Typography>

                                            <Typography 
                                                style={{whiteSpace: 'pre-line', textAlign: 'center', }} 
                                                color="text.secondary">

                                                {`Virtual Link: ${x.virtual_link}\n`}
                                                {`Building: ${x.building}\n`}
                                                {`Room: ${x.room}\n`}
                                                {`City: ${x.city}\n`}
                                                {`State: ${x.stateloc}\n`}
                                                {`Start Time: ${x.start_time}\n`}
                                                {`End Time: ${x.end_time}\n`}

                                            </Typography>
                                        </CardContent>

                                    </Card>
                                </div>
                                );
                            }
                            else{
                                return null;
                            }
                        })}
                    </div>
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