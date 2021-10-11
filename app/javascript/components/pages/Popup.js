import React from 'react'

function Popup(props) {

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

    const confirmBtn = {
        backgroundColor: 'green',
        color: "white",
        bottom: "16px",
        left: "16px"
    }

    const cancelBtn = {
        backgroundColor: 'red',
        color: "white",
        position: 'absolute',
        bottom: '16px',
        right: '16px'
    }



    return (props.trigger) ? (
        <>
            <div style={popup}>
                <div style={popupInner}>
                    <h2>Are you sure you would like to add this {props.name}?</h2>
                    <button style={confirmBtn} onClick={() => props.func}>Confirm</button>
                    <button style={cancelBtn} onClick={() => props.setTrigger(false)}>Cancel</button>
                </div>
            </div>
        </>
    ) : "";
}

export default Popup