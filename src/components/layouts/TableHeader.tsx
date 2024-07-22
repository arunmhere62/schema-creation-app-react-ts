import { Box, Typography } from '@mui/material';
import React from 'react';
import ButtonUi from '../ui/Button';

interface TableHeaderProps {
    headerName?: string;
    buttons?: {
        label: string;
        icon?: React.ElementType;
        onClick: any;
        disabled?: boolean;
    }[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headerName, buttons }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <Typography variant="subtitle2" color="initial">{headerName}</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
                {buttons?.map((button, index) => (
                    <ButtonUi key={index} sx={{
                        borderRadius: "5px",
                        marginTop: "0px",
                        marginBottom: "0px",
                        padding: "3px 10px",
                        display: "flex",
                        fontSize: "11px",
                        boxShadow: "none",
                        alignItems: "center",
                    }} fullWidth={false} disabled={button.disabled} variant='contained' size='small' label={button.label} onClick={button.onClick} startIcon={button.icon ? <button.icon /> : null} />
                ))}
            </Box>
        </Box>
    )
}

export default TableHeader;
