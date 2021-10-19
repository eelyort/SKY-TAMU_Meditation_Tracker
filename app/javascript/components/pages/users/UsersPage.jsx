
import { Typography, CircularProgress, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { Link } from "react-router-dom";

const userTypes = ["Admin", "Member"];

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

    return (
        <div className={'users-wrapper flex-spacer'}>
            <Typography variant={"h2"}>
                Members
            </Typography>
            {users ? (
                users.map((user, userIndex) => (
                    <div className={'user-div'}>
                        <Typography variant={"h5"}>
                            {`${user.firstname} ${user.lastname}`}
                        </Typography>
                        <div className={'flex-spacer'} />
                        {isAdmin ? (
                            <div className={'user-actions'}>
                                <Typography variant={"body1"}>
                                    {userTypes[user.user_type]}
                                </Typography>
                                {/* <IconButton color="secondary" aria-label={`edit user '${user.firstname} ${user.lastname}'`} component={Link} to={`/members/${user.user_id}`}>
                                    <EditIcon />
                                </IconButton> */}
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