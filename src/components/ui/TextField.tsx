import { InputAdornment, TextField, filledInputClasses, inputLabelClasses, outlinedInputClasses } from "@mui/material";
import React, { } from "react";

interface TextFieldProps {
    label?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    error?: boolean | undefined;
    helperText?: string | undefined | boolean;
    name?: string;
    type: "text" | "password" | "number" | "email" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week" | "color";
    fullWidth?: boolean;
    required?: boolean;
    width?: string;
}

const TextFieldUi = ({ width, required, label, value, onChange, disabled, endAdornment, startAdornment, error, helperText, name, type, fullWidth }: TextFieldProps) => {

    return (
        <TextField
            required={required}
            variant="outlined"
            size="small"
            label={label}
            value={value}
            onChange={onChange}
            disabled={disabled}
            error={error}
            helperText={helperText}
            name={name}
            type={type}
            fullWidth={fullWidth || true}
            InputProps={{
                startAdornment: startAdornment ? (
                    <InputAdornment position='start'>{startAdornment}</InputAdornment>
                ) : undefined,
                endAdornment: endAdornment ? (
                    <InputAdornment position='end'>{endAdornment}</InputAdornment>
                ) : undefined,
            }}
            sx={{
                width: `${width}`,
                borderRadius: "8px !important",
                '& .MuiOutlinedInput-root': {
                    borderRadius: "8px !important",
                    overflow: "hidden",
                    borderColor: `action.active`,
                    transition: `muiTheme.transitions.create(["border-color", "box-shadow"])`,
                    '&:hover': {
                        backgroundColor: `action.hover`,
                    },
                },
                " & .MuiFormLabel-root": {
                    fontSize: "12px"
                },
                " & .MuiOutlinedInput-root": {
                    fontSize: "12px"
                },
                "& .css-1o5h54k-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                    fontSize: "13px",
                }

            }}


        />

    );
};

export default TextFieldUi;
