import { Autocomplete } from "@mui/material";
import React from "react";
import { GlobalTextField } from "../../styles/styled";
import { IconButton } from "@mui/material";

const SelectForm = ({
  onChange = {},
  values = {},
  errors = {},
  touched = {},
  options = [],
  name = "text",
  label = "text",
  isLabel = false,
  isFeildArry = false,
  setFieldValue,
  disable = false,
  icon,
  value,
  isHelperText = false,
  isIcon = true,
}) => {
  return (
    <Autocomplete
      disableClearable
      autoComplete={false}
      value={isFeildArry ? value : values[name]}
      name={name}
      fullWidth
      size="small"
      icon
      placeholder={label}
      label={label}
      onChange={(event, value) => {
        console.log("selected value:", value);
        setFieldValue(value);
      }}
      options={options}
      renderInput={(params) => (
        <GlobalTextField
          {...params}
          disabled={disable}
          value={isFeildArry ? value : values[name]}
          margin="dense"
          placeholder={label}
          label={isLabel ? label : null}
          error={touched[name] && Boolean(errors[name])}
          helperText={isHelperText ? touched[name] && errors[name] : null}
          InputProps={{
            ...params.InputProps,
            startAdornment: isIcon && (
              <IconButton edge="start">
                <i
                  style={{ display: "block", marginLeft: "10px" }}
                  className={`fa-solid  fs-6 ${icon}`}
                ></i>
              </IconButton>
            ),
          }}
        />
      )}
    />
  );
};

export default SelectForm;
