import React, { useEffect, useState } from 'react';
import { Chip, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

export default function MultiSelect() {
    const [selectedValues, setSelectedValues] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
    const [filteredOptions, setFilteredOptions] = useState([...options])

    const handleChange = (event) => {
        let nlist = event.target.value
        updateOptions(nlist)
        setSelectedValues(event.target.value);

    };

    const handleDelete = (valueToDelete) => () => {
        let nlist = selectedValues.filter((value) => value !== valueToDelete)
        updateOptions(nlist)
        setSelectedValues(nlist);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const updateOptions = (listValues) => {
        let nOptions = options.filter((option) => !listValues.includes(option))
        console.log(nOptions)
        setFilteredOptions(nOptions)
    }





    return (
        <FormControl
            className="InputEx o_form_label"
            variant="standard"
            // sx={{ width: 150, maxWidth: 150 }}
            // error={errors[name] ? true : false}
            fullWidth>
            <InputLabel id="multi-select-label">Options</InputLabel>
            <Select
                labelId="multi-select-label"
                id="multi-select"
                multiple
                value={selectedValues}
                onChange={handleChange}
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                renderValue={(selected) => (
                    <div>
                        {selected.map((value) => (
                            <Chip key={value} label={value} onDelete={handleDelete(value)} onMouseDown={(event) => event.stopPropagation()} />
                        ))}
                    </div>
                )}>
                {filteredOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}