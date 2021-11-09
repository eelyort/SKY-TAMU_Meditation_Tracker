import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, IconButton, Button, Typography, Toolbar, AppBar, MenuItem } from '@mui/material';
import { Link } from "react-router-dom";
import { GoogleAPI, GoogleLogin, GoogleLogout } from 'react-google-oauth';

const menuItems = [{'text': 'Events', 'url': '/events'}, {'text': 'Members', 'url': '/members'}, {'text': 'Social Media', 'url': '/socialmedia'}, {'text': 'Attendance', 'url': '/attendance'}];

const Header = () => {
    const [menuAnchor, setMenuAnchor] = React.useState(null);

    const responseGoogle = (response) => {
        console.log("\n----------------------------------------------\n" +
            "responseGoogle()\n" +
            "----------------------------------------------");
        console.log(response);

        var token = google_response.Zi;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${google_response.Zi.accessToken}`,
                'Content-Type': 'application/json',
                'access_token': `${google_response.Zi.accessToken}`
            },
            body: JSON.stringify(token)
        };

        return fetch(`backend rails api url to google sign in path`, requestOptions)
            .then(response => {
                Cookie.set('accesstoken', response.headers.get('access-token'), { expires: 7 });
                Cookie.set('client',response.headers.get('client'), { expires: 7 });
                Cookie.set('tokentype',response.headers.get('token-type'), { expires: 7 });
                Cookie.set('expiry',response.headers.get('expiry'), { expires: 7 });
                Cookie.set('uid', response.headers.get('uid'),{ expires: 7 });
            });
    }

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
                <Button color="inherit" component={Link} to={"/login"}>Login</Button>
                <GoogleAPI className="GoogleLogin" clientId="117887850590-ekck049bkcopmo0v73v5f7mt4b7afm5r.apps.googleusercontent.com">
                    <div>
                        <GoogleLogin height="10" width="500px" backgroundColor="#4285f4" access="offline" scope="email profile" onLoginSuccess={responseGoogle} onFailure={responseGoogle}/>
                    </div>
                </GoogleAPI>
            </Toolbar>
        </AppBar>
    );
};

export default Header;