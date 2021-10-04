import React from 'react';

const ShowEventPage = (props) => {

    const cardStyle = {
        backgroundColor: "dodgerblue",
        color: "white",
        border: "2px solid black",
        marginLeft: "25%",
        marginRight: "25%",
        marginTop: "5%",
        marginBottom: "5%",
        padding: "10%",
        textAlign: "center"
      };

    return (
        <div>
            <h1>Event Title</h1>
            <div>
                <p>Event Description</p>
                <p>Event Location: | Event Date: </p>
                <p>RSVP Link: </p>
                <p>Attendance: </p>
            </div>
        </div>
    );
}

export default ShowEventPage;
