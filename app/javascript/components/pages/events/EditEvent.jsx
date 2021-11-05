import { PortraitSharp } from '@mui/icons-material';
import { display, maxWidth, padding } from '@mui/system';
import React, { useState, useEffect } from 'react';



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

    const [inputList, setInputList] = useState([{ virtual_link: "", building: "", room: "", city: "", stateloc: "" }]);

    const getInputList = () => {
        const url = "/api/v1/locations";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => setInputList([...response, { virtual_link: "", building: "", room: "", city: "", stateloc: "" }]))
    }

    // handle input change
    const handleInputChange = (e, index) => {
        e.preventDefault();
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);

        if(index != inputList.length-1){
            const { virtual_link, building, room, city, stateloc, id } = inputList[index];
            const event_id = props.event.event_id

            const body = {
                event_id,
                virtual_link,
                building,
                room,
                city,
                stateloc
            };

            props.databaseRequest("PATCH", body, id, "/api/v1/locations", () => getInputList());
        }
    };

    // handle click event of the Remove button
    const handleRemoveClick = (e, index) => {
        e.preventDefault();
        const answer = window.confirm("WARNING! \n Are you sure you would like to delete this location?");

        if (answer) {
            const location_id = inputList[index].id

            props.databaseRequest("DELETE", {}, location_id, "/api/v1/locations", () => getInputList())
        }

        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        const answer = window.confirm("Are you sure you would like to add this location?");

        if (answer) {
            const { virtual_link, building, room, city, stateloc, id } = inputList[inputList.length-1];
            const event_id = props.event.event_id
    
            const body = {
                event_id,
                virtual_link,
                building,
                room,
                city,
                stateloc
            };
    
            props.databaseRequest("POST", body, id, "/api/v1/locations", () => getInputList());
        }

        setInputList([...inputList, { virtual_link: "", building: "", room: "", city: "", stateloc: "" }]);
    };

    function loadInputList() {
    useEffect(() => {
        getInputList()
    }, []);
    }


    loadInputList()

    return (props.trigger) ? (
        <>
            <div style={popup}>
                <div style={popupInner}>
                    <button style={closeBtn} onClick={() => props.setTrigger(false)}>Cancel</button>
                    {props.children}

                    <h1>Editing {"\"" + props.event.title + "\""}</h1>

                    <div>
                        <form 
                            id= "add-event" 
                            name={String(props.event.event_id)} 
                            onSubmit={props.submitFunc}> 

                        <label>Event Title:</label>
                        <input 
                            required 
                            style={inputStyle} 
                            id={"edit-title"+String(props.event.event_id)} 
                            defaultValue={props.event.title}  
                            type="string" onChange={props.changeFunc}/>

                        <label>Event Time:</label>
                        <input 
                            required 
                            style={inputStyle} 
                            id={"edit-time"+String(props.event.event_id)} 
                            defaultValue={props.event.time} 
                            type="string" 
                            onChange={props.changeFunc}/>

                        <label>Event Description:</label>
                        <textarea   
                            required style={textAreaStyle} 
                            id={"edit-description"+String(props.event.event_id)} 
                            defaultValue={props.event.description}  
                            type="text" 
                            onChange={props.changeFunc}/>

                        <label>Locations</label>
                        {inputList.map((x, i) => {
                            console.log(x.event_id, props.event.id);
                            if(x.event_id == props.event.event_id || !x.event_id){
                                return (
                                <div className="box">
                                    <input
                                    name="virtual_link"
                                    placeholder="Enter Virtual Link"
                                    value={x.virtual_link}
                                    onChange={e => handleInputChange(e, i)}
                                    />
                                    <input
                                    name="building"
                                    placeholder="Enter Building"
                                    value={x.building}
                                    onChange={e => handleInputChange(e, i)}
                                    />
                                    <input
                                    name="room"
                                    placeholder="Enter Room"
                                    value={x.room}
                                    onChange={e => handleInputChange(e, i)}
                                    />
                                    <input
                                    name="city"
                                    placeholder="Enter City"
                                    value={x.city}
                                    onChange={e => handleInputChange(e, i)}
                                    />
                                    <input
                                    name="stateloc"
                                    placeholder="Enter State"
                                    value={x.stateloc}
                                    onChange={e => handleInputChange(e, i)}
                                    />
                                    <div className="btn-box">
                                    {inputList.length !== 1 && <button
                                        className="mr10"
                                        onClick={e => handleRemoveClick(e, i)}>Remove</button>}
                                    {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                                    </div>
                                </div>
                                );
                            }
                            else{
                                return null;
                            }
                        })}

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