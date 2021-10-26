import { Typography, CircularProgress, Select, Button, MenuItem, TextField, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";

const NewAttendancesPage = (props) => {
    const [attendance, setAttendance] = React.useState({'RSVP':'Yes'});
    const [isLoading, setIsLoading] = React.useState(false);
    const history = useHistory();

    // update
    const saveAttendance = (attendanceToSave, attendanceId) => {
      const url = `/attendances`;
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({'attendance': attendanceToSave})
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
                <Button variant={"contained"} color={"secondary"} aria-labelledby={"Save Changes"} onClick={() => {
                    setIsLoading(true);
                    saveAttendance({...attendance}, attendance.id);
                }}>
                    Save
                </Button>
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