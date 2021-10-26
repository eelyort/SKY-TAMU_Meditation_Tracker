import {
    Typography, CircularProgress, IconButton, Button,
    Dialog, DialogTitle, DialogActions,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AttendancePage = (props) => {
    const { isAdmin = true } = props
    const [attendance, setAttendance] = React.useState(undefined);

    // componentDidMount
    const fetchAttendance = () => {
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
                setAttendance(response);
            })
            .catch(err => console.log("Error: " + err));
    }
    React.useEffect(() => {
        fetchAttendance();
    }, []);

    // delete handler
    const [isLoading, setIsLoading] = React.useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
    const [deleteAttendanceIndex, setDeleteAttendanceIndex] = React.useState(0);
    const deleteConfirmationDialog = (attendanceToDelete, attendanceToDeleteIndex) => (
        <Dialog
            open={deleteConfirmOpen}
            onClose={() => setDeleteConfirmOpen(false)}
            aria-labelledby="delete-Attendance-confirmation-box"
        >
            <DialogTitle id="alert-dialog-title">
                {`Delete this Attendance?`}
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
                    const {
                        id
                    } = attendanceToDelete;
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
                            setIsLoading(false);
                            setDeleteConfirmOpen(false);
                            setDeleteAttendanceIndex(0);
                            fetchAttendance();
                        })
                        .catch(error => console.log(error.message));
                }}
                aria-labelledby={`Confirm Delete Attendance`}
                autoFocus
            >
                Yes, Delete
            </Button>
            </DialogActions>
        </Dialog>
    );
    const deleteAttendance = (attendanceIndex) => {
        console.log("hello")
        setDeleteAttendanceIndex(attendanceIndex);
        setDeleteConfirmOpen(true);
    };

    console.log(attendance);

    const showLink = (attendance) => `/attendances/${attendance.id}`;
    const editLink = (attendance) => `/attendances/${attendance.id}/edit`;

    return (
        <div className={'users-wrapper flex-spacer'}>
            <Typography variant={"h2"}>
                Attendance
            </Typography>
            {attendance ? (
                <>
                    {attendance.map((attendance, attendanceIndex) => (
                        <div className={'user-div'} key={`user ${attendance.id}`}>
                            <Typography variant={"h5"} className={'user-text-center'} component={Link} to={showLink(attendance)}>
                                {`${attendance.RSVP}`}
                            </Typography>
                            <div className={'flex-spacer'} />
                            {isAdmin ? (
                                <div className={'user-actions'}>
                                    <IconButton color="secondary" aria-labelledby={`Delete Attendance`} onClick={() => deleteAttendance(attendanceIndex)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ) : (null)}
                        </div>
                    ))}
                    {deleteConfirmationDialog(attendance[deleteAttendanceIndex], deleteAttendanceIndex)}
                </>
            ) : (<CircularProgress />)}
            <IconButton color="secondary" aria-labelledby={`New Attendance`} component={Link} to={'/newAttendance'}>
                <AddCircleOutlineIcon />
            </IconButton>
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