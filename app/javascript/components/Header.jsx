import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, IconButton, Button, Typography, Toolbar, AppBar, MenuItem } from '@mui/material';
import { Link } from "react-router-dom";

const menuItems = [{'text': 'Events', 'url': '/events'}, {'text': 'Members', 'url': '/members'}, {'text': 'Social Media', 'url': '/socialmedia'}, {'text': 'Attendance', 'url': '/attendance'}];

const Header = () => {
    const [menuAnchor, setMenuAnchor] = React.useState(null);

    const oauthLogin = () => {
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch('/admins/auth/google_oauth2', {
            mode: "no-cors",
            method: "GET",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
        })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              console.log(response);
              throw new Error("Network response was not ok.");
            })
            .then(response => this.props.history.push(`/recipe/${response.id}`))
            .catch(error => console.log(error.message));
    };

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
                <Button color="inherit" onClick={() => oauthLogin()}>Login</Button>
                {/* <Button color="inherit" component={Link} to={"/login"}>Login</Button> */}
            </Toolbar>
        </AppBar>
    );
};

export default Header;