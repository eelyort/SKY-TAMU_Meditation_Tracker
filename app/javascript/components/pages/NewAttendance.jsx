import { Typography, CircularProgress, Select, Button, MenuItem, TextField, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import Cookies from 'universal-cookie';
import useCookie from '../UseCookie'; 
import { Link, useParams, useLocation, useHistory } from "react-router-dom";




const NewAttendancesPage = (props) => {
    const { eventId } = useParams();
    const [attendance, setAttendance] = React.useState({'RSVP':'Yes'});
    const [isLoading, setIsLoading] = React.useState(false);
    const history = useHistory();

    const [currentUserRaw, setCurrentUser, removeCurrentUser] = useCookie('currentUser', { path: '/' });
    const currentUser = (typeof currentUserRaw === 'string' || currentUserRaw instanceof String) ? JSON.parse(currentUserRaw) : currentUserRaw;
    const isAdmin = currentUser?.user_type === 0;
    const email = currentUser?.username;
    const userId = currentUser?.id;
    // update
    const saveAttendance = (attendanceToSave, attendanceId) => {
      const url = `/attendances`;
      let body = {
         ...attendanceToSave,
         "event_id": parseInt(eventId),
         "user_id": userId
      }
      const token = document.querySelector('meta[name="csrf-token"]').content;
      console.log(JSON.stringify({'attendance': attendanceToSave, 'event_id': eventId, 'user_id': userId})      )
      fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({'attendance': body})
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
          history.push('/attendance');
        })
      .catch(error => console.log(error.message));
    }

    let showEdit = null;
    if (attendance) {
        showEdit = (
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 2, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
                <Select
                    value={attendance.RSVP}
                    label="Attendance Type"
                    aria-labelledby={`Select Attendance Type`}
                    onChange={e => setAttendance(old => ({
                        ...old,
                        RSVP: e.target.value,
                    }))}
                >
                <MenuItem value={'Yes'} key={`Attendance Type RSVP`} aria-labelledby={'Attendance Type'}>{'Yes'}</MenuItem>
                <MenuItem value={'No'} key={`Attendance Type Neg-RSVP`} aria-labelledby={'Attendance Type'}>{'No'}</MenuItem>
                </Select>
                <br/>
                <Button disabled={!userId} variant={"contained"} color={"secondary"} aria-labelledby={"Save Changes"} onClick={() => {
                    setIsLoading(true);
                    saveAttendance({...attendance}, attendance.id);
                }}>
                    Save
                </Button>
                {!userId ? (<h1>Please Login and Refresh Page</h1>) : null}
            </Box>
        );
    }

    return (
        <div className={'users-wrapper flex-spacer'}>
            {attendance ? (
                <>
                    <Typography variant={"h2"}>
                        New RSVP
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

export default NewAttendancesPage;