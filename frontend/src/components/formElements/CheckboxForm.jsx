import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxForm({ values, errors, touched, field, handleChange, setFieldValue, handleBlur }) {
    const handleCheckboxChange = (event) => {
        const { name, value, checked } = event.target;
        const fieldValue = values[field.name] || [];

        // Find the index of the checkbox value in the fieldValue array
        const index = fieldValue.findIndex(item => item.name === value);

        if (checked) {
            if (index === -1) {
                // If the checkbox is checked and the value doesn't exist in the array, add it with default properties
                setFieldValue(name, [...fieldValue, { name: value, isEdit: true, isView: true, isPrint: true }]);
            } else {
                // If the checkbox is checked and the value already exists, update its isEdit property to true
                const updatedValue = [...fieldValue];
                updatedValue[index] = { ...updatedValue[index], isEdit: true };
                setFieldValue(name, updatedValue);
            }
        } else {
            // If the checkbox is unchecked, update its isEdit property to false
            if (index !== -1) {
                const updatedValue = [...fieldValue];
                updatedValue[index] = { ...updatedValue[index], isEdit: false };
                setFieldValue(name, updatedValue);
            }
        }
    };


    return (

        <FormControl component="fieldset" variant="standard">
            {/* <FormLabel component="legend">{field?.label}</FormLabel> */}
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                {
                    field.options?.map((options, i) => {
                        return (
                            <FormControlLabel
                                sx={{
                                    textTransform: 'capitalize'
                                }}
                                key={i}
                                control={
                                    // <Checkbox
                                    //     checked={values[field.name]?.includes(options.label)}
                                    //     // onChange={handleChange}
                                    //     onChange={handleCheckboxChange}
                                    //     name={field.name}
                                    //     value={options.label}
                                    // />
                                    <Checkbox
                                        checked={(values[field.name] || []).some(item => item.name === options.label && item.isEdit)}
                                        onChange={handleCheckboxChange}
                                        name={field.name}
                                        value={options.label}
                                    />
                                }
                                label={options.label}
                            />
                        )
                    })
                }

            </FormGroup>
        </FormControl>

        // </Box>
    );
}