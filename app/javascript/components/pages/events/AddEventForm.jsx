import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


function AddEventForm(props) {

    const [inputList, setInputList] = useState([{ virtual_link: "", building: "", room: "", city: "", stateloc: "", start_time: "", end_time: "" }]);

    /*
    const getInputList = () => {
        const url = "/api/v1/locations";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => setInputList([...response, { virtual_link: "", building: "", room: "", city: "", stateloc: "", start_time: "", end_time: "" }]))
    }
    */

    // handle input change
    const handleInputChange = (e, index) => {
        e.preventDefault();
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);

        if(index != inputList.length-1){
            const { virtual_link, building, room, city, stateloc, start_time, end_time, id } = inputList[index];
            const event_id = 0

            const body = {
                event_id,
                virtual_link,
                building,
                room,
                city,
                stateloc,
                start_time,
                end_time
            };

            // props.databaseRequest("PATCH", body, id, "/api/v1/locations", () => getInputList());
        }
    };

    // handle click event of the Remove button
    const handleRemoveClick = (e, index) => {
        e.preventDefault();
        const answer = window.confirm("WARNING! \n Are you sure you would like to delete this location?");

        if (answer) {
            const location_id = inputList[index].id

            // props.databaseRequest("DELETE", {}, location_id, "/api/v1/locations", () => getInputList())

            const list = [...inputList];
            list.splice(index, 1);
            setInputList(list);
        }
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        const answer = window.confirm("Are you sure you would like to add this location?");
        if (answer) {
            const { virtual_link, building, room, city, stateloc, start_time, end_time, id } = inputList[inputList.length-1];
            const event_id = 0

            const body = {
                event_id,
                virtual_link,
                building,
                room,
                city,
                stateloc,
                start_time,
                end_time
            };
            // props.databaseRequest("POST", body, id, "/api/v1/locations", () => getInputList());
        }
        setInputList([...inputList, { virtual_link: "", building: "", room: "", city: "", stateloc: "", start_time: "", end_time: "" }]);
    };

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
                            onSubmit={(e)=>props.submitFunc(e, inputList)}>

                        <label>Event Title:</label>
                        <input
                            name="title"
                            className='inputStyle'
                            type="string"
                            placeholder="Event Title"
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

                        <label>Locations</label>
                        {inputList.map((x, i) => {
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
                                    <div>
                                    <TextField
                                        id="datetime-local"
                                        name="start_time"
                                        value={x.start_time}
                                        label="Start Time"
                                        type="datetime-local"
                                        sx={{ width: 250 }}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        onChange={e => handleInputChange(e, i)}
                                    />
                                    <TextField
                                        id="datetime-local"
                                        name="end_time"
                                        value={x.end_time}
                                        label="End Time"
                                        type="datetime-local"
                                        sx={{ width: 250 }}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        onChange={e => handleInputChange(e, i)}
                                    />
                                    </div>
                                    <div className="btn-box">
                                    {inputList.length !== 1 && <button
                                        className="mr10"
                                        onClick={e => handleRemoveClick(e, i)}>Remove</button>}
                                    {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                                    </div>
                                </div>
                                );
                            }
                        )}

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
