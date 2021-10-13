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

                    <h1>Edit {props.title}</h1>

                    <div>
                        <form id= "add-event" name={String(props.event_ID)} onSubmit={props.submitFunc}> 

                        <label>Event Title:</label>
                        <input required style={inputStyle} id={"edit-title"+String(props.event_ID)} defaultValue={props.title}  type="string" onChange={props.changeFunc}/>

                        <label>Event Time:</label>
                        <input required style={inputStyle} id={"edit-time"+String(props.event_ID)} defaultValue={props.time}  type="string" onChange={props.changeFunc}/>

                        <label>Event Description:</label>
                        <textarea required style={inputStyle} id={"edit-description"+String(props.event_ID)} defaultValue={props.description}  type="text" onChange={props.changeFunc}/>

                        <input style={confirmStyle} type="submit" value="Confirm Edit" />
                        <button style={deleteStyle} type="button" name={String(props.event_ID)} onClick={props.deleteFunc}>Delete Event</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    ) : "";
}

export default EditEvent