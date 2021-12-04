import {
    Typography, CircularProgress, IconButton, Button,
    Dialog, DialogTitle, DialogActions, Tooltip,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Cookies from 'universal-cookie';
import useCookie from '../../UseCookie';
import AttendancePageTable from "./AttendancePageTable";

const AttendancePage = (props) => {
    const [attendances, setAttendances] = React.useState(undefined);
    const [events, setEvents] = React.useState(undefined);
    const [users, setUsers] = React.useState(undefined);
    const [locations, setLocations] = React.useState(undefined);

    // user stuff
    const [currentUserRaw, setCurrentUser, removeCurrentUser] = useCookie('currentUser', { path: '/' });
    const currentUser = (typeof currentUserRaw === 'string' || currentUserRaw instanceof String) ? JSON.parse(currentUserRaw) : currentUserRaw;
    const isAdmin = (currentUser?.user_type === 0) ?? false;
    const email = currentUser?.username;
    const userId = currentUser?.id;

    // componentDidMount
    const fetchAttendances = () => {
        const url = "/attendances";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                console.log(response);
                setAttendances(response);
            })
            .catch(err => console.log("Error: " + err));
    };
    const fetchEvents = () => {
        const url = "/api/v1/events_with_deleted";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => setEvents( response ))
            .catch(error => console.log(error));
    };
    const fetchUsers = () => {
        const url = "/users_with_deleted";
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
    };
    const fetchLoctions = () => {
        const url = "/api/v1/locations_with_deleted";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    //retData = response.json();
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                console.log(response);
                //setInputList(retData);
                setLocations([...response])
            })
            // .then(response => setInputList( response ))
            .catch(error => console.log(error));
    }
    React.useEffect(() => {
        fetchAttendances();
        fetchEvents();
        fetchUsers();
        fetchLoctions();
    }, []);

    // console.log(`Attendances:`);
    // console.log(attendances);
    // console.log(`Events:`);
    // console.log(events);
    // console.log(events?.filter(event => event.id === attendances?.event_id));
    // console.log(`Users:`);
    // console.log(users);
    // console.log(users?.filter(user => user.id === attendances?.user_id));

    // delete handler
    const [isLoading, setIsLoading] = React.useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
    const [attendancesToDelete, setAttendancesToDelete] = React.useState([]);
    const [attendencesPendingDeletion, setAttendencesPendingDeletion] = React.useState(0);
    // let use trigger a deletion by calling setAttendancesToDelete
    React.useEffect(() => {
        if (attendancesToDelete.length > 0) {
            setDeleteConfirmOpen(true);
        }
    }, [attendancesToDelete]);
    // let the loading symbol stick around until every async delete request is finished
    React.useEffect(() => {
        if (attendencesPendingDeletion === 0) {
            setDeleteConfirmOpen(false);
            setIsLoading(false);
            setAttendancesToDelete([]);
            fetchAttendances();
        }
    }, [attendencesPendingDeletion])
    const deleteConfirmationDialog = (
        <Dialog
            open={deleteConfirmOpen}
            onClose={() => setDeleteConfirmOpen(false)}
            aria-labelledby="delete-Attendance-confirmation-box"
        >
            <DialogTitle id="alert-dialog-title">
                {`Delete ${attendancesToDelete?.length} Attendance(s)?`}
            </DialogTitle>
            <DialogActions>
            <Button
                onClick={() => setDeleteConfirmOpen(false)}
                aria-labelledby={`Cancel Delete Attendance`}
            >
                Cancel
            </Button>
            <Button
                onClick={() => {
                    setIsLoading(true);
                    setAttendencesPendingDeletion(attendancesToDelete.length);
                    attendancesToDelete.forEach(attendanceToDelete => {
                        const id = attendanceToDelete;
                        const url = `/attendances/${id}`;
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
                                setAttendencesPendingDeletion(old => old-1);
                            })
                            .catch(error => console.log(error.message));
                    });
                }}
                aria-labelledby={`Confirm Delete Attendance(s)`}
                autoFocus
            >
                Yes, Delete
            </Button>
            </DialogActions>
        </Dialog>
    );

    console.log(attendances);

    const showLink = (attendance) => `/attendances/${attendance.id}`;
    const editLink = (attendance) => `/attendances/${attendance.id}/edit`;

    return (
        <div className={'users-wrapper flex-spacer'}>
            <Typography variant={"h2"}>
                Attendance
            </Typography>
            {attendances ? (
                <>
                    <AttendancePageTable
                        attendances={attendances}
                        events={events}
                        users={users}
                        locations={locations}
                        currentUser={currentUser}
                        isAdmin={isAdmin}
                        email={email}
                        userId={userId}
                        deleteAttendance={(attendances) => setAttendancesToDelete(attendances)}
                        showLink={showLink}
                        editLink={editLink}
                    />
                    {deleteConfirmationDialog}
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

export default AttendancePage;