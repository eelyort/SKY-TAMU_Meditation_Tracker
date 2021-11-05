import React from 'react';


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
        fontFamily: "Arial, Helvetica, sans-serif",
        borderRadius: "20px",
        position: 'relative',
        padding: '16px',
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
        fontFamily: "Arial, Helvetica, sans-serif",
        textIndent: "1em",
        width: "100%",
        padding: "12px 0px",
        margin: "5px 0px 15px 0px",
        display: "inline-block"
    }
    
    const textAreaStyle = {
        inputStyle,
        minHeight: "100px",
        minWidth: "100%",
        maxWidth: "100%",
        fontFamily: "Arial, Helvetica, sans-serif",
        textIndent: "1em",
        padding: "12px 0px"
    }

    const submitStyle = {
        backgroundColor: "DodgerBlue",
        width: "100%",
        padding: "12px 20px",
        margin: "8px 0",
        display: "inline-block",
        color: "white"
    }

    return (props.trigger) ? (
        <>
            <div style={popup}>
                <div style={popupInner}>
                    <button style={closeBtn} onClick={() => props.setTrigger(false)}>Cancel</button>
                    {props.children}

                    <h1>Add New {props.comp}</h1>

                    <div>
                        <form 
                            id= "add-event" 
                            onSubmit={props.submitFunc}> 

                        <label>Event Title:</label>
                        <input 
                            name="title" 
                            style={inputStyle} 
                            type="string" 
                            placeholder="Event Title" 
                            onChange={props.changeFunc} 
                            required/>

                        <label>Event Time:</label>
                        <input 
                            name="time" 
                            style={inputStyle} 
                            type="string" 
                            placeholder="Event Time" 
                            onChange={props.changeFunc} 
                            required/>

                        <label>Event Description:</label>
                        <textarea 
                            name="description" 
                            style={textAreaStyle} 
                            type="text" 
                            placeholder="Event Description..." 
                            onChange={props.changeFunc} 
                            required/>

                        <input 
                            style={submitStyle} 
                            type="submit" 
                            value="Submit" />

                        </form>
                    </div>
                </div>
            </div>
        </>
    ) : "";
}

export default AddEventForm