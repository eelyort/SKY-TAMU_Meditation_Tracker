
import { Typography, CircularProgress, Select, Button, MenuItem, TextField, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import EditableTextField from "../../EditableTextField";

import { userTypes } from "./UsersConstants";

const UsersShowEditPage = (props) => {
    const { userId } = useParams();
    const isEdit = useLocation().pathname.includes('/edit');
    const [user, setUser] = React.useState(undefined);
    const [isLoading, setIsLoading] = React.useState(false);
    const history = useHistory();

    // componentDidMount
    React.useEffect(() => {
        const url = `/users/${userId}`;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                setUser(response);
            })
            .catch(err => console.log("Error: " + err));
    }, []);

    // update
    const saveUser = (userToSave, userId) => {
        const url = `/users/${userId}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;
        delete userToSave['id'];
        fetch(url, {
            method: "PUT",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: userToSave,
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => {
            console.log(response);
            setIsLoading(false);
            history.push('/members');
        })
        .catch(error => console.log(error.message));
    }

    let showEdit = null;
    if (user) {
        showEdit = (
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 2, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
                <TextField
                    variant={"outlined"}
                    label={"Username"}
                    value={user.username}
                    onChange={e => {}}
                    disabled
                    aria-labelledby={`Uneditable Username/Email`}
                />
                <Select
                    value={user.user_type}
                    label="User Privileges"
                    aria-labelledby={`Select User Privileges`}
                    onChange={e => setUser(old => ({
                        ...old,
                        user_type: e.target.value,
                    }))}
                >
                    {userTypes.map((label, index) => (
                        <MenuItem value={index} key={`User Type ${label}`} aria-labelledby={label}>{label}</MenuItem>
                    ))}
                </Select>
                <TextField
                    variant={"outlined"}
                    label={"First Name"}
                    aria-labelledby={"Enter First Name"}
                    value={user.firstname}
                    onChange={e => setUser(old => ({
                        ...old,
                        firstname: e.target.value,
                    }))}
                />
                <TextField
                    variant={"outlined"}
                    label={"Last Name"}
                    aria-labelledby={"Enter Last Name"}
                    value={user.lastname}
                    onChange={e => setUser(old => ({
                        ...old,
                        lastname: e.target.value,
                    }))}
                />
                <TextField
                    variant={"outlined"}
                    label={"Bio Information"}
                    aria-labelledby={"Enter Last Name"}
                    value={user.bio}
                    onChange={e => setUser(old => ({
                        ...old,
                        bio: e.target.value,
                    }))}
                />
                <br/>
                <Button variant={"contained"} color={"secondary"} aria-labelledby={"Back To All Users"} component={Link} to={'/members'}>
                    Back
                </Button>
                <Button variant={"contained"} color={"secondary"} aria-labelledby={"Save Changes"} onClick={() => {
                    setIsLoading(true);
                    saveUser({...user}, userId);
                }}>
                    Save
                </Button>
            </Box>
        );
    }

    return (
        <div className={'users-wrapper flex-spacer'}>
            {user ? (
                <>
                    <Typography variant={"h2"}>
                        User '{user.firstname} {user.lastname}'
                    </Typography>
                    {showEdit}
                </>
            ) : (<CircularProgress />)}
            {isLoading ? (
                <div className="users-is-loading">
                    <div className="users-loading-circle">
                        <CircularProgress />
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default UsersShowEditPage;
