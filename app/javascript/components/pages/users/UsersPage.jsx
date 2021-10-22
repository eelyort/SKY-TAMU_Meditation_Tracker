
import {
    Typography, CircularProgress, IconButton, Button,
    Dialog, DialogTitle, DialogActions,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { Link } from "react-router-dom";

import { userTypes } from "./UsersConstants";

const UsersPage = (props) => {
    const { isAdmin = true } = props
    const [users, setUsers] = React.useState(undefined);

    // componentDidMount
    const fetchUsers = () => {
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
    }
    React.useEffect(() => {
        fetchUsers();
    }, []);

    // delete handler
    const [isLoading, setIsLoading] = React.useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
    const [deleteUserIndex, setDeleteUserIndex] = React.useState(0);
    const deleteConfirmationDialog = (userToDelete, userToDeleteIndex) => (
        <Dialog
            open={deleteConfirmOpen}
            onClose={() => setDeleteConfirmOpen(false)}
            aria-labelledby="delete-user-confirmation-box"
        >
            <DialogTitle id="alert-dialog-title">
                {`Delete User ${userToDelete.firstname} ${userToDelete.lastname}?`}
            </DialogTitle>
            <DialogActions>
            <Button
                onClick={() => setDeleteConfirmOpen(false)}
                aria-labelledby={`Cancel Delete User ${userToDelete.firstname} ${userToDelete.lastname}`}
            >
                Cancel
            </Button>
            <Button
                onClick={() => {
                    setIsLoading(true);
                    const {
                        id
                    } = userToDelete;
                    const url = `/users/${id}`;
                    const token = document.querySelector('meta[name="csrf-token"]').content;

                    fetch(url, {
                        method: "DELETE",
                        headers: {
                            "X-CSRF-Token": token,
                            "Content-Type": "application/json"
                        }
                    })
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            }
                            throw new Error("Network response was not ok.");
                        })
                        .then(() => {
                            setIsLoading(false);
                            setDeleteConfirmOpen(false);
                            setDeleteUserIndex(0);
                            fetchUsers();
                        })
                        .catch(error => console.log(error.message));
                }}
                aria-labelledby={`Confirm Delete User ${userToDelete.firstname} ${userToDelete.lastname}`}
                autoFocus
            >
                Yes, Delete
            </Button>
            </DialogActions>
        </Dialog>
    );
    const deleteUser = (userIndex) => {
        setDeleteUserIndex(userIndex);
        setDeleteConfirmOpen(true);
    };

    console.log(users);

    const showLink = (user) => `/members/${user.id}`;
    const editLink = (user) => `/members/${user.id}/edit`;

    return (
        <div className={'users-wrapper flex-spacer'}>
            <Typography variant={"h2"}>
                Members
            </Typography>
            {users ? (
                <>
                    {users.map((user, userIndex) => (
                        <div className={'user-div'} key={`user ${user.id}`}>
                            <Typography variant={"h5"} className={'user-text-center'} component={Link} to={showLink(user)}>
                                {`${user.firstname} ${user.lastname}`}
                            </Typography>
                            <div className={'flex-spacer'} />
                            {isAdmin ? (
                                <div className={'user-actions'}>
                                    <Button variant={"outlined"} color='secondary' component={Link} to={editLink(user)} aria-labelledby={`Edit User ${user.firstname} ${user.firstname}`}>
                                        {userTypes[user.user_type]}
                                    </Button>
                                    <IconButton color="secondary" aria-labelledby={`Edit user '${user.firstname} ${user.lastname}'`} component={Link} to={editLink(user)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" aria-labelledby={`Delete user '${user.firstname} ${user.lastname}'`} onClick={() => deleteUser(userIndex)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ) : (null)}
                        </div>
                    ))}
                    {deleteConfirmationDialog(users[deleteUserIndex], deleteUserIndex)}
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

export default UsersPage;