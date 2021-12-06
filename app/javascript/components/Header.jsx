import React, { useState, useEffect }from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, IconButton, Button, Typography, Toolbar, AppBar, MenuItem, Alert } from '@mui/material';
import { Link } from "react-router-dom";
import { GoogleAPI, CustomGoogleLogin } from 'react-google-oauth';
import Cookies from 'universal-cookie';
import useCookie from './UseCookie';
import Logo from 'images/SkyLogo.png';

const menuItems = [ {'text': 'Home', 'url': '/'}, 
                    {'text': 'About', 'url': '/about'},
                    {'text': 'Events', 'url': '/events'}, 
                    {'text': 'Members', 'url': '/members'}, 
                    {'text': 'Attendance', 'url': '/attendance'}
                  ];

const adminItems = [{'text': 'Help', 'url': '/help'}];


const Header = () => {
    const [loginSuccessAlertOpen, setLoginSuccessAlertOpen] = React.useState(false);
    const [logoutSuccessAlertOpen, setLogOutSuccessAlertOpen] = React.useState(false);
    const [menuAnchor, setMenuAnchor] = React.useState(null);
    const [profileAnchor, setProfileAnchor] = React.useState(null);

    // save user info in cookie
    const [currentUserRaw, setCurrentUser, removeCurrentUser] = useCookie('currentUser', { path: '/' });
    const currentUser = (typeof currentUserRaw === 'string' || currentUserRaw instanceof String) ? JSON.parse(currentUserRaw) : currentUserRaw;
    const isAdmin = (currentUser?.user_type === 0) ?? false;



    //console.log(`currentUser:`);
    //console.log(currentUser);
    //console.log(JSON.stringify(currentUser));
    //console.log(currentUser?.username);
    //console.log(`(currentUser (${!!currentUser}) && currentUser.username (${!!currentUser?.username})) = ${(!!currentUser && !!currentUser?.username)}`);

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
        setLogOutSuccessAlertOpen(true)
    };

    const profileEditLink = (user) => `/members/${user.id}/edit`;

    //Mobile Friendly Header
    const [state, setState] = useState({
        mobileView: false,
    });

    const { mobileView } = state;

    useEffect(() => {
    const setResponsiveness = () => {
        return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
        window.removeEventListener("resize", () => setResponsiveness());
    }
    }, []);

    const displayDesktop = () => {
        return (
            <>
                {menuItems.map((val, index) => (
                    <Button key={index} color="inherit" component={Link} to={val.url}>
                        {val.text}
                    </Button>
                ))}
                
                {(isAdmin) ? 
                    (adminItems.map( (val, index) =>
                        (<Button key={index} color="inherit" component={Link} to={val.url}>
                            {val.text}
                        </Button>) )
                    ) : null}
                    
                <Button
                    color="inherit"
                    id="my-profile-button"
                    aria-controls="profile-menu"
                    aria-haspopup="true"
                    aria-expanded={profileAnchor ? 'true' : undefined}
                    aria-label="profile-menu"
                    onClick={(event) => setProfileAnchor(event.currentTarget)}
                >Profile</Button>

                <Menu
                    id="basic-profile-menu"
                    anchorEl={profileAnchor}
                    open={Boolean(profileAnchor)}
                    onClose={() => setProfileAnchor(null)}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    >
                    {(currentUser && currentUser.username) ? profileMenuItems() : loginBtn()}    
                </Menu> 
            </>
        ); 
    };

    const displayMobile = () => {
        return (
            [
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
            </IconButton>,

            <Menu
                id="basic-menu"
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >   
                {(currentUser && currentUser.username) ? profileMenuItems() : 
                    loginBtn()}

                {menuItems.map((val, index) => (
                    <MenuItem onClick={() => {setProfileAnchor(null); setMenuAnchor(null)}} key={index} component={Link} to={val.url}>
                        {val.text}
                    </MenuItem>
                ))}

                {isAdmin ? (adminItems.map((val, index) => (
                    <MenuItem onClick={() => setMenuAnchor(null)} key={index+10} component={Link} to={val.url}>
                        {val.text}
                    </MenuItem>
                ))) : null}
            </Menu>
            ]
        );
    };

    const profileMenuItems = () => {
        return(
            [            
            <MenuItem key={"editProfileMenu"} onClick={() => setProfileAnchor(null)} component={Link} to={profileEditLink(currentUser)}>{currentUser.username}</MenuItem>,
            
            <MenuItem key={"logOutMenu"} onClick={() => {googleLogOut(); setProfileAnchor(null);}}>
                Log Out
            </MenuItem>
            ]
        );
    }

    const loginBtn = () => {
        return(
            <MenuItem>
                <Typography>
                    <GoogleAPI className="GoogleLogin" clientId="117887850590-2cuglpp4ufantojicnktl8aeclhmkpgs.apps.googleusercontent.com">
                        <div>
                            <CustomGoogleLogin
                                access="offline"
                                scope="email profile"
                                onLoginSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                className={'custom-google-login'}
                            >
                                Login
                            </CustomGoogleLogin>
                        </div>
                    </GoogleAPI>
                </Typography>
            </MenuItem>
        );

    }

    const displayLogo = () => {
        return(
            (mobileView) ? 
            <Button key='homeBtn' color="inherit" component={Link} to={'/'} style={{maxHeight: "75"}}>
                <img src={Logo} alt="logo" width="225" height="175"/>
            </Button>
            : 
            <Button key='homeBtn' color="inherit" component={Link} to={'/'} style={{maxHeight: "125px"}}>
                <img src={Logo} alt="logo" width="360" height="300"/>
            </Button>

        );
    }

    return (
        <>
            <AppBar key={"appBar"} position="static" color="primary" style={{maxHeight: "125px", paddingTop: "1%", color: "white"}}>
                <Toolbar key={"toolBar"}>
                    {displayLogo()}

                    <div className="flex-spacer" />

                    {mobileView ? displayMobile() : displayDesktop()}
                </Toolbar>
            </AppBar>

            {loginSuccessAlertOpen ? (
                <Alert onClose={() => setLoginSuccessAlertOpen(false)}>Login Successful!{isAdmin ? ` Please refresh the page to get Admin Priviledges` : null}</Alert>
            ) : null}
            {logoutSuccessAlertOpen ? (
                <Alert onClose={() => setLogOutSuccessAlertOpen(false)}>Logout Successful!{isAdmin ? ` You will no longer have access to Admin Priviledges` : null}</Alert>
            ) : null}
        </>
    );
};

export default Header;
