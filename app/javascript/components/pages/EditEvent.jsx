import { PortraitSharp } from '@mui/icons-material';
import { display, maxWidth, padding } from '@mui/system';
import React, { useState } from 'react';



function EditEvent(props) {

    const popup = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100vh',
        backgroundColor: "gray",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const popupInner = {
        borderRadius: "20px",
        position: 'relative',
        padding: '32px',
        width: '100%',
        maxWidth: '640px',
        backgroundColor: 'white'
    }

    const closeBtn = {
        position: 'absolute',
        top: '16px',
        right: '16px'
    }

   const inputStyle = {
        width: "100%",
        padding: "12px 20px",
        margin: "8px 0",
        display: "inline-block"
    }

    const confirmStyle = {
        width: "100%",
        padding: "12px 20px",
        margin: "8px 0",
        display: "inline-block",
        backgroundColor: "DodgerBlue",
        color: "white"
    }

    const deleteStyle = {
        width: "100%",
        padding: "12px 20px",
        margin: "8px 0",
        display: "inline-block",
        backgroundColor: "red",
        color: "white"
    }

    return (props.trigger) ? (
        <>
            <div style={popup}>
                <div style={popupInner}>
                    <button style={closeBtn} onClick={() => props.setTrigger(false)}>Cancel</button>
                    {props.children}

                    <h1>Edit {props.event.title}</h1>

                    <div>
                        <form id= "add-event" name={String(props.event.event_id)} onSubmit={props.submitFunc}> 

                        <label>Event Title:</label>
                        <input required style={inputStyle} id={"edit-title"+String(props.event.event_id)} defaultValue={props.event.title}  type="string" onChange={props.changeFunc}/>

                        <label>Event Time:</label>
                        <input required style={inputStyle} id={"edit-time"+String(props.event.event_id)} defaultValue={props.event.time}  type="string" onChange={props.changeFunc}/>

                        <label>Event Description:</label>
                        <textarea required style={inputStyle} id={"edit-description"+String(props.event.event_id)} defaultValue={props.event.description}  type="text" onChange={props.changeFunc}/>

                        <input style={confirmStyle} type="submit" value="Confirm Edit" />
                        <button style={deleteStyle} type="button" name={String(props.event.event_id)} onClick={props.deleteFunc}>Delete Event</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    ) : "";
}

export default EditEvent