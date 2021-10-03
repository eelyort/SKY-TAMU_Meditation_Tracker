import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, IconButton, Button, Typography, Toolbar, AppBar, MenuItem } from '@mui/material';
import { Link } from "react-router-dom";

const menuItems = [{'text': 'Events', 'url': '/events'}, {'text': 'Members', 'url': '/members'}];

const Header = () => {
    const [menuAnchor, setMenuAnchor] = React.useState(null);

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
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;