import React from 'react';
import { Link } from "react-router-dom";

const LoginPage = (props) => {
    return (
        <>
            <h1>Login</h1>
            <br></br>
            <h3>User name:</h3>
            <input type="text" placeholder="Username " id="inputUsername"></input>
            <h3>Password</h3>
            <input type="text" placeholder="Password " id="inputPassword"></input>
            <br></br>
            <button type="button" onclick="alert('Hello world!')">Log in</button>
            
            {/*
            Get text input for username field, will be used later on once database is implemented
            document.getElementById("inputUsername").value;

            Get text input for password field, will be used later on once database is implemented
            document.getElementById("inputPassword").value;
            */}
        </>
    );
}

export default LoginPage;