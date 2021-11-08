import React from 'react';


function AddEventForm(props) {

    return (props.trigger) ? (
        <>
            <div className='popup'>
                <div className='popupInner'>
                    <button className='closeBtn' onClick={() => props.setTrigger(false)}>Cancel</button>
                    {props.children}

                    <h1>Add New {props.comp}</h1>

                    <div>
                        <form 
                            id= "add-event" 
                            onSubmit={props.submitFunc}> 

                        <label>Event Title:</label>
                        <input 
                            name="title" 
                            className='inputStyle'
                            type="string" 
                            placeholder="Event Title" 
                            onChange={props.changeFunc} 
                            required/>

                        <label>Event Time:</label>
                        <input 
                            name="time" 
                            className='inputStyle'
                            type="string" 
                            placeholder="Event Time" 
                            onChange={props.changeFunc} 
                            required/>

                        <label>Event Description:</label>
                        <textarea 
                            name="description" 
                            className='textAreaStyle'
                            type="text" 
                            placeholder="Event Description..." 
                            onChange={props.changeFunc} 
                            required/>

                        <input 
                            className='submitStyle'
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