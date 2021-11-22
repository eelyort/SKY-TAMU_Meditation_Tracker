import React from 'react';

const HelpPage = (props) => {

    const HelpHeader = {
        textAlign: "center",
        fontFamily: "Arial, Helvetica, sans-serif"
    }

    const HelpBody = {
        margin: "auto",
        width: "80%",
        padding: "10px",
        fontSize: "1.25em",
        fontFamily: "Arial, Helvetica, sans-serif"
    }

    return (
        <>
            <div style={HelpHeader}>
                <h1>Help Page</h1>
            </div>

            <div style={HelpBody}>
                <h4>Website Maintenance</h4>
                <a 
                    href="https://docs.google.com/document/d/e/2PACX-1vSJXsEdBxtx1-Ovi5itfrcOokQ4eZ0nfhN9PJj3lC-HLXDwUDqFl2pyQwHR8s34Bg/pub?embedded=true" 
                    target="_blank"> Maintenance Documentation
                </a>
                
                <h4>Members Page</h4>
                <p> The members page is a hub for users to see other users. 
                    Each user who has an account is able to modify their own profile. 
                    They can do this by clicking their username at the top right then selecting "Edit Profile".
                    They can change their first name, last name, and bio information and save it by clicking "Save".

                    <br></br> <br></br> 
                    Admins are able to do everything normal users can, but can also change the roles of users. 
                    An admin can change a user's role by clicking the dropdown and selecting the either "Admin", "Member", or "Guest".
                </p>

                <h4>Event Page</h4>
                <p>Event information can be expanded by clicking on an event card, which takes you to another page for that specific event. 
                    That page will contain an RSVP link and show the title, description, and locations for the event. 
                    If you want to share an event's information, you can use that URL to quickly direct someone to a specific event.
                    The URL will be in the form of ...herokuapp.com/event/1 where 1 is the event ID.

                    <br></br> <br></br> 
                    Only admins are allowed to create, edit, or delete events. There are only two buttons for these features. 
                    The first is at the top right corner labeled "Add Event", while the "Edit Event" button is attached to each event card.
                    The "Edit Event" button is where can you change details about an event or delete it entirely.
                    
                    <br></br> <br></br> 
                    After clicking on "Add Event" there will be dialog boxes where you fill out the title, description, and locations of the new event. 
                    *Note: When adding location, make sure to click the "add" button at the bottom before you click "Submit"*
                    For more information about adding a location, please read the "Location" section of this page.
                    When submitting the event, there will be a confirmation button that appears asking if you want to confirm the submission. Click "OK" in order to finally submit the event.
                    There is also a "Cancel" button that cancels the newly planned event and deletes any saved progress of the event.

                    <br></br> <br></br> 
                    When editing an event, there is an option to change the title, description, and each location.
                    For more information about adding a location, please read the "Location" section of this page.
                    <br></br>
                    *Note: The location panel is scrollable, so if you do not see the location you are looking for, try scrolling down while hovering over the locations.*
                    <br></br>
                    There is also an option to delete an event within the "Edit Event" button. 
                    This will permanently delete the event from the database and the page linked to that event. Please use this carefully.

                </p>
                
                <h4>Locations</h4>
                <p>When entering locations into event, there are options for a virtual link, building, room, city, state, start time, and end time. 
                    Not all of these boxes need to be filled, but more information would be better for the users.
                    <br></br>
                    After filling out a location, make sure to hit the "Add" button below the location to properly add it to the database. 
                    After a location has been added, it can be deleted by clicking the "Remove" button below the location.
                    *Note: You need to make sure to click either "Remove" or "Add" location rather than clicking the "Confirm Edit" when editing an event or "Submit" button when adding an event. 
                </p> 

                <h4>Attendance Page</h4>
                <p>The attendance page is used to show users who is showing up to upcoming events.
                    Users can RSVP for events by clicking on event cards or using a URL for a specific event, and there they will find an RSVP link to the event. 
                    After clicking the RSVP link, users need to be logged in order to RSVP for an event.
                    Users can respond "Yes" or "No" to an event and location. After filling out their response, click "Save" in order finalize the RSVP into the database.

                    <br></br> <br></br>
                    Admins can delete a user's RSVP to an upcoming event by going to the attendance page an clicking the trashcan.   
                </p>
            </div>
        </>
    );
}

export default HelpPage;