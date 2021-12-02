import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, IconButton, Button, Typography, Toolbar, AppBar, MenuItem, Alert } from '@mui/material';
import { Link } from "react-router-dom";
import { GoogleAPI, CustomGoogleLogin } from 'react-google-oauth';
import Cookies from 'universal-cookie';
import useCookie from './UseCookie';

const menuItems = [{'text': 'About', 'url': '/about'}, {'text': 'Events', 'url': '/events'}, {'text': 'Members', 'url': '/members'}, {'text': 'Attendance', 'url': '/attendance'}];
const adminItems = [{'text': 'Help', 'url': '/help'}]

const Header = () => {
    const [loginSuccessAlertOpen, setLoginSuccessAlertOpen] = React.useState(false);
    const [menuAnchor, setMenuAnchor] = React.useState(null);
    const [profileAnchor, setProfileAnchor] = React.useState(null);

    // save user info in cookie
    const [currentUserRaw, setCurrentUser, removeCurrentUser] = useCookie('currentUser', { path: '/' });
    const currentUser = (typeof currentUserRaw === 'string' || currentUserRaw instanceof String) ? JSON.parse(currentUserRaw) : currentUserRaw;
    const isAdmin = (currentUser?.user_type === 0) ?? false;
    console.log(`currentUser:`);
    console.log(currentUser);
    console.log(JSON.stringify(currentUser));
    console.log(currentUser?.username);
    console.log(`(currentUser (${!!currentUser}) && currentUser.username (${!!currentUser?.username})) = ${(!!currentUser && !!currentUser?.username)}`);

    // OAuth
    const responseGoogle = (response) => {
        console.log("\n----------------------------------------------\n" +
            "responseGoogle()\n" +
            "----------------------------------------------");
        console.log(response);
        console.log(response.getAuthResponse());
        console.log(response.getBasicProfile());
        console.log(response.getId());

        var token = response.getAuthResponse().access_token;
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        const requestOptions = {
            method: 'POST',
            headers: {
                "X-CSRF-Token": csrfToken,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'access_token': `${token}`
            },
            body: JSON.stringify(response.getAuthResponse())
        };

        return fetch(`/auth/request`, requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setCurrentUser(JSON.stringify(response));
                setLoginSuccessAlertOpen(true);
                // let cookie = new Cookies();
                // cookie.set('currentUser', JSON.stringify(response), { path: '/' });
                // console.log(`cookie set: ${cookie.get('currentUser')}`);
                // console.log(cookie.get('currentUser'));
            });
    }
    const googleLogOut = () => {
        // cookie.set('currentUser', JSON.stringify({}), { path: '/' });
        setCurrentUser(JSON.stringify({}));
    };

    const profileEditLink = (user) => `/members/${user.id}/edit`;

    return (
        <>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <IconButton
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={menuAnchor ? 'true' : undefined}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={(event) => setMenuAnchor(event.currentTarget)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={() => setMenuAnchor(null)}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {menuItems.map((val, index) => (
                            <MenuItem onClick={() => setMenuAnchor(null)} key={index} component={Link} to={val.url}>
                                {val.text}
                            </MenuItem>
                        ))}

                        {isAdmin ? (adminItems.map((val, index) => (
                            <MenuItem onClick={() => setMenuAnchor(null)} key={index} component={Link} to={val.url}>
                                {val.text}
                            </MenuItem>
                        ))) : null}
                    </Menu>
                    
                    <Button color="inherit" component={Link} to={"/"}>
                        SKY@TAMU
                    </Button>
                    <div className="flex-spacer" />
                    {(currentUser && currentUser.username) ? (
                        <>
                            <Menu
                                id="basic-profile-menu"
                                anchorEl={profileAnchor}
                                open={Boolean(profileAnchor)}
                                onClose={() => setProfileAnchor(null)}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => setProfileAnchor(null)} component={Link} to={profileEditLink(currentUser)}>Edit Profile</MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        googleLogOut();
                                        setProfileAnchor(null);
                                    }}
                                >
                                    Log Out
                                </MenuItem>
                            </Menu>
                            <Button
                                color="inherit"
                                id="my-profile-button"
                                aria-controls="profile-menu"
                                aria-haspopup="true"
                                aria-expanded={profileAnchor ? 'true' : undefined}
                                aria-label="profile-menu"
                                onClick={(event) => setProfileAnchor(event.currentTarget)}
                            >
                                {currentUser.username}
                            </Button>
                        </>
                    ) : (
                        <GoogleAPI className="GoogleLogin" clientId="117887850590-2cuglpp4ufantojicnktl8aeclhmkpgs.apps.googleusercontent.com">
                            <div>
                                <CustomGoogleLogin
                                    access="offline"
                                    scope="email profile"
                                    onLoginSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    className={'custom-google-login'}
                                >
                                    <Button color="inherit">Login</Button>
                                </CustomGoogleLogin>
                            </div>
                        </GoogleAPI>
                    )}
                </Toolbar>
            </AppBar>
            {loginSuccessAlertOpen ? (
                <Alert onClose={() => setLoginSuccessAlertOpen(false)}>Login Successful!</Alert>
            ) : null}
        </>
    );
};

export default Header;