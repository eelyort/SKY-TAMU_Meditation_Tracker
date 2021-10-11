import { PortraitSharp } from '@mui/icons-material';
import { display, maxWidth, padding } from '@mui/system';
import React, { useState } from 'react';
import Popup from './Popup'



function AddEventForm(props) {

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

    const [popupState, setPopupState] = useState(false)

    return (props.trigger) ? (
        <>
            <div style={popup}>
                <div style={popupInner}>
                    <button style={closeBtn} onClick={() => props.setTrigger(false)}>Cancel</button>
                    {props.children}

                    <h1>Add New {props.comp}</h1>

                    <div>
                        <form id= "add-event" onSubmit={props.func}> 

                        <label>Event Title:</label>
                        <input style={inputStyle} type="string" />

                        <label>Event Description:</label>
                        <input style={inputStyle} type="text" />

                        <label>Event Time:</label>
                        <input style={inputStyle} type="string" />

                        <input style={inputStyle} type="submit" value="Submit" />

                        {
                        //<button type="button" onClick={ () => {setPopupState(true)} }>Submit-Test</button>}
                        }

                        </form>
                    </div>
                </div>
            </div>

            <Popup 
                name={props.comp}
                func={props.func}
                trigger={popupState} 
                setTrigger={setPopupState}>
            </Popup>

        </>
    ) : "";
}

export default AddEventForm