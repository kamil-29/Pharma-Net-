import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

const RadioForm = ({ values, errors, touched, field, setFieldValue, handleBlur }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControl>
                {/* <FormLabel id="demo-radio-buttons-group-label">{field.label}</FormLabel> */}
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name={field.name}
                    value={values[field.name]}
                    onChange={(event) => {
                        setFieldValue(field.name, event.target.value);
                    }}
                    onBlur={handleBlur}
                    style={{ display: 'flex', flexDirection: 'row' }}
                >
                    {field?.options?.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            value={option.value}
                            control={<Radio />}
                            label={option.label}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>

    )
}

export default RadioForm
