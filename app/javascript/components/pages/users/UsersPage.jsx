
import { Typography, CircularProgress, IconButton, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { Link } from "react-router-dom";

import { userTypes } from "./UsersConstants";

const UsersPage = (props) => {
    const { isAdmin = true } = props
    const [users, setUsers] = React.useState(undefined);

    // componentDidMount
    React.useEffect(() => {
        const url = "/users";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                setUsers(response);
            })
            .catch(err => console.log("Error: " + err));
    }, []);

    console.log(users);

    const showLink = (user) => `/members/${user.id}`;
    const editLink = (user) => `/members/${user.id}/edit`;

    return (
        <div className={'users-wrapper flex-spacer'}>
            <Typography variant={"h2"}>
                Members
            </Typography>
            {users ? (
                users.map((user, userIndex) => (
                    <div className={'user-div'} key={`user ${user.id}`}>
                        <Typography variant={"h5"} className={'user-text-center'} component={Link} to={showLink(user)}>
                            {`${user.firstname} ${user.lastname}`}
                        </Typography>
                        <div className={'flex-spacer'} />
                        {isAdmin ? (
                            <div className={'user-actions'}>
                                <Button variant={"outlined"} color='secondary' component={Link} to={editLink(user)}>
                                    {userTypes[user.user_type]}
                                </Button>
                                <IconButton color="secondary" aria-label={`edit user '${user.firstname} ${user.lastname}'`} component={Link} to={editLink(user)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" aria-label={`delete user '${user.firstname} ${user.lastname}'`}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        ) : (null)}
                    </div>
                ))
            ) : (<CircularProgress />)}
        </div>
    );
}

export default UsersPage;