import React from "react";
import { Typography, TextField } from "@mui/material";

const EditableTextField = (props) => {
    const { value, startFocused=false } = props;
    const [focused, setFocused] = React.useState(startFocused);

    return (
        <>
            {focused ? (
                <TextField
                    {...props}
                    autoFocus
                    value={value}
                    onBlur={() => setFocused(false)}
                />
            ) : (
                <Typography
                    {...props}
                    onClick={() => setFocused(true)}
                >{value}</Typography>
            )}
        </>
    );
}

export default EditableTextField;