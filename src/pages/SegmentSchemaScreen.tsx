import React, { useState, ChangeEvent } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TextFieldUi from '../components/ui/TextField';
import SelectDropdown from '../components/ui/SelectDropdown';
import ButtonUi from '../components/ui/Button';
import SnackBarUi from '../components/ui/snackbarUi';
import { postData } from '../utils/apiUtils';
import { ValueProps } from '../types/types';
import { initialOptions } from '../data';
import { BASE_URL } from '../apiUrls';
import TableHeader from '../components/layouts/TableHeader';

const SegmentScreen: React.FC = () => {
    const [segmentName, setSegmentName] = useState<string>('');
    const [schema, setSchema] = useState<ValueProps[]>([]);
    const [selectedOption, setSelectedOption] = useState<ValueProps | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const [availableOptions, setAvailableOptions] = useState<ValueProps[]>(initialOptions);

    const handleAddSchema = (option: ValueProps | null) => {
        if (option && segmentName) {
            setSchema(prevSchema => {
                const updatedSchema = [...prevSchema, option];
                const updatedOptions = availableOptions.filter(opt => opt.value !== option.value);
                setAvailableOptions(updatedOptions);
                return updatedSchema;
            });
            setSelectedOption(null);
        }
    };

    const handleRemoveSchema = (index: number) => {
        setSchema(prevSchema => {
            const removedSchema = prevSchema[index];
            const updatedSchema = prevSchema.filter((_, i) => i !== index);
            setAvailableOptions(prevOptions => [...prevOptions, removedSchema].sort((a, b) => a.label.localeCompare(b.label)));
            return updatedSchema;
        });
    };

    const handleChangeSchema = (index: number, newValue: ValueProps | null) => {
        if (newValue) {
            setSchema(prevSchema => {
                const updatedSchema = prevSchema.map((item, idx) => (idx === index ? newValue : item));
                const updatedOptions = availableOptions.concat(prevSchema.filter(item => item.value !== newValue.value));
                setAvailableOptions(updatedOptions);
                return updatedSchema;
            });
        }
    };

    const handleSaveSegment = async () => {
        if (segmentName === '') {
            setSnackbarMessage('Please provide a segment name before saving.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const data = {
            segment_name: segmentName,
            schema: schema.map(s => ({ [s.value]: s.label }))
        };

        try {
            await postData(BASE_URL, data);
            // console.log(response);
            setSchema([]);
            setSegmentName('');
            setAvailableOptions(initialOptions);
            setSnackbarMessage('Segment saved successfully!');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage('Failed to save segment.');
            setSnackbarSeverity('error');
        }

        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleButtonClick = () => {
        handleSaveSegment().catch(console.error);
    };

    return (
        <Box mt={4} component="form" sx={{ flexGrow: 1 }}>
            <TableHeader headerName="Segment Management" />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextFieldUi
                        label="Segment Name"
                        value={segmentName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSegmentName(e.target.value)}
                        type="text"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <SelectDropdown
                        options={availableOptions}
                        value={selectedOption}
                        onChange={setSelectedOption}
                        onOptionSelect={handleAddSchema}
                        labelText="Add schema to segment"
                        disabled={!segmentName}
                    />
                </Grid>
            </Grid>
            <Grid mt={2} container spacing={2}>
                {schema.map((s, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} container alignItems="center">
                        <Grid item xs={10}>
                            <SelectDropdown
                                options={availableOptions.concat(schema.filter(option => option.value !== s.value))}
                                value={s}
                                onChange={(newValue: any) => handleChangeSchema(index, newValue)}
                                labelText={`Schema ${index + 1}`}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton onClick={() => handleRemoveSchema(index)} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Grid mt={1} container spacing={2}>
                <Grid item xs={12}>
                    <ButtonUi smallButtonCss type='button' label='Save Segment' onClick={handleButtonClick} variant="contained" color="primary" />
                </Grid>
            </Grid>
            <SnackBarUi
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleCloseSnackbar}
            />
        </Box>
    );
};

export default SegmentScreen;
