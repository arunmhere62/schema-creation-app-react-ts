import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Paper } from '@mui/material';

interface ValueProps {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  options: ValueProps[];
  labelText?: string;
  value?: ValueProps | null;
  onChange: (value: ValueProps | null) => void;
  error?: boolean | undefined;
  helperText?: string | undefined | boolean;
  width?: string;
  button?: boolean;
  onOptionSelect?: (option: ValueProps | null) => void; // Add this prop
  defaultValue?: any;
  applySmallSizeStyle?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export default function SelectDropdown({
  applySmallSizeStyle = false,
  defaultValue,
  disabled,
  button,
  width,
  error,
  helperText,
  options,
  value,
  labelText,
  required,
  onChange,
  onOptionSelect, // Add this prop
}: SelectDropdownProps) {
  return (
    <Autocomplete
      sx={{
        ...(applySmallSizeStyle && {
          "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
            paddingTop: "0px",
            paddingBottom: "1px",
            paddingLeft: "6px",
            width: "130px",
          },
        }),
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
        '& .MuiAutocomplete-input': {
          fontSize: "12px"
        },
        '& .css-144qjki-MuiFormLabel-root-MuiInputLabel-root': {
          fontSize: "12px"
        },
      }}
      disabled={disabled}
      defaultValue={defaultValue}
      size='small'
      disablePortal
      id="combo-box-demo"
      options={options}
      value={value || null}
      onChange={(event, newValue) => {
        onChange(newValue);
        if (onOptionSelect) {
          onOptionSelect(newValue); // Trigger additional action on option select
        }
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => <TextField error={error} helperText={helperText} required={required} sx={{ fontSize: "12px !important" }} variant='outlined' {...params} label={labelText} />}
      PaperComponent={({ children }) => (
        <Paper>
          {children}
          {button && (
            <Button
              color="primary"
              fullWidth
              sx={{ justifyContent: "flex-start", pl: 2 }}
            >
              + Add New
            </Button>
          )}
        </Paper>
      )}
    />
  );
}
