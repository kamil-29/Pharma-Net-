import React, { useState } from "react";
import { GlobalTextField } from "../../styles/styled";
import { IconButton, TextField } from "@mui/material";

const InputForm = ({
  onChange = {},
  values = {},
  errors = {},
  touched = {},
  type = "text",
  name = "text",
  placeholder = "text",
  disable = false,
  label = "text",
  isLabel = false,
  isFeildArry = false,
  handleBlur,
  value,
  isHelperText = false,
  multiline = false,
  isPassword = false,
  props,
  required = false,
  icon = "",
  isIcon = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return (
    <>
      <GlobalTextField
        {...props}
        onChange={onChange}
        required
        variant="outlined"
        size="small"
        fullWidth
        multiline={multiline}
        rows={4}
        margin="dense"
        disabled={disable}
        type={isPassword === true ? (showPassword ? "text" : "password") : type}
        name={name}
        label={isLabel ? label : null}
        placeholder={placeholder}
        value={isFeildArry ? value : values[name]}
        error={touched[name] && Boolean(errors[name])}
        helperText={isHelperText ? touched[name] && errors[name] : null}
        id={name}
        InputProps={{
          endAdornment: isPassword == true && (
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? (
                <i className="fa-regular fa-eye-slash fs-6 m-1"></i>
              ) : (
                <i className="fa-regular fa-eye fs-6 m-1"></i>
              )}
            </IconButton>
          ),
          startAdornment: isIcon == true && (
            <IconButton
              // onClick={() => setShowPassword(!showPassword)}
              edge="start"
            >
              <i className={`fa-solid  fs-6 m-1 ${icon}`}></i>
            </IconButton>
          ),
          inputProps: {
            max: formatDate(new Date()), // Function to format date to 'YYYY-MM-DD' format
          },
        }}
        onBlur={handleBlur}
      />
    </>
  );
};

export default InputForm;
