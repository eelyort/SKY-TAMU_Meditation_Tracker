import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, IconButton, Button, Typography, Toolbar, AppBar, MenuItem } from '@mui/material';
import { Link } from "react-router-dom";
import { GoogleAPI, CustomGoogleLogin } from 'react-google-oauth';
import Cookies from 'universal-cookie';

const menuItems = [{'text': 'Events', 'url': '/events'}, {'text': 'Members', 'url': '/members'}, {'text': 'Social Media', 'url': '/socialmedia'}, {'text': 'Attendance', 'url': '/attendance'}];

const Header = () => {
    const [menuAnchor, setMenuAnchor] = React.useState(null);
    const [profileAnchor, setProfileAnchor] = React.useState(null);

    // OAuth
    const responseGoogle = (response) => {
        console.log("\n----------------------------------------------\n" +
            "responseGoogle()\n" +
            "----------------------------------------------");
        console.log(response);

        var token = response.Zb;
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        const requestOptions = {
            method: 'POST',
            headers: {
                "X-CSRF-Token": csrfToken,
                'Authorization': `Bearer ${response.Zb.accessToken}`,
                'Content-Type': 'application/json',
                'access_token': `${response.Zb.accessToken}`
            },
            body: JSON.stringify(token)
        };

        return fetch(`/auth/request`, requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                let cookie = new Cookies();
                cookie.set('currentUser', JSON.stringify(response), { path: '/' });
                console.log(`cookie set: ${cookie.get('currentUser')}`);
                console.log(cookie.get('currentUser'));
            });
    }
    const googleLogOut = () => {
        cookie.set('currentUser', JSON.stringify({}), { path: '/' });
    };

    const cookies = new Cookies();
    const currentUser, { email: username, id } = cookies.get('currentUser') ?? {};
    const isAdmin = currentUser.user_type === 0;

    const profileEditLink = (user) => `/members/${user.id}/edit`;

    return (
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
                </Menu>
                <Button color="inherit" component={Link} to={"/"}>
                    SKY@TAMU
                </Button>
                <div className="flex-spacer" />
                {(currentUser && email) ? (
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
                                component={Link}
                                to={profileEditLink(currentUser)}
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
                            My Profile
                        </Button>
                    </>
                ) : (
                    <GoogleAPI className="GoogleLogin" clientId="117887850590-ekck049bkcopmo0v73v5f7mt4b7afm5r.apps.googleusercontent.com">
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
    );
};

export default Header;