import React from 'react';
import HeroImage from 'images/iStock-1161561165.jpg';
import { Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";

const HomePage = (props) => {
    return (
        <>
            <div className="homepage-hero">
                <div className={'overlay'}>
                    <img src={HeroImage} />
                </div>
                <div className={'shading overlay'}>
                </div>
                <div className={'text'}>
                    <Typography variant="h1">
                        1000 Hours Meditated Total
                    </Typography>
                    <Button variant="contained" color="secondary" component={Link} to={'/events'}>See Events</Button>
                </div>
            </div>
            <div className="homepage-content-wrapper">
                <Typography variant="subtitle1">
                    About
                </Typography>
                <Typography variant="body1">
                    SKY@TAMU is a Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </div>
        </>
    );
}

export default HomePage;