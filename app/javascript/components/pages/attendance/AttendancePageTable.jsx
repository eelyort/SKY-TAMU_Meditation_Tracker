import {
    Typography, CircularProgress, IconButton, Button,
    Dialog, DialogTitle, DialogActions, Tooltip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Cookies from 'universal-cookie';
import useCookie from '../../UseCookie';

import { GenerateObject, headCells } from './AttendanceTableDetails';
import EnhancedTable from "../../EnhancedTable/EnhancedTable";

const AttendancePageTable = (props) => {
    const {
        attendances, events, users, locations,
        currentUser, isAdmin, email, userId,
        deleteAttendance, showLink, editLink
    } = props;

    const data = attendances?.map(attendance => GenerateObject(attendance, events, users, locations));
    console.log("AttendacePageTable Top:");
    console.log(data);

    return (
        <>
            <EnhancedTable
                title={"Attendance"}
                rows={data}
                headCells={headCells}
                deleteItems={(items) => deleteAttendance(items)}
            />
        </>
    );
}

export default AttendancePageTable;