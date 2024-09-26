import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const feildStyle = {
  size: "small",
  fullWidth: true,
  margin: "dense",
};

export const GlobalTextField = styled(TextField)`
  /* Style for the root TextField component */
  .MuiOutlinedInput-root {
    line-height: 1.4375em;
    font-size: 1rem;
    font-family: "Public Sans", sans-serif;
    font-weight: 400;
    color: rgb(33, 43, 54);
    box-sizing: border-box;
    cursor: text;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    position: relative;
    min-height: 48px;
    /* border-radius: 5px; */
    border-radius: 8px;
    /* background-color: #f0f0f0; */
  }

  /* Style for the input field */
  .MuiInputBase-input {
    color: #333 !important; /* Text color */
    font-size: 14px; /* Font size */
  }

  /* Style for the input label */
  .MuiInputLabel-root {
    color: rgb(77, 95, 116);
    font-size: 15px;
    margin-top: 5px;
    border-color: red !important;
  }

  /* Style for the placeholder text */
  .MuiInputLabel-outlined.MuiInputLabel-shrink {
    transform: translate(14px, -11px) scale(0.75); /* Adjust placeholder position */
  }

  /* Style for the focused input field */
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid var(--dark-blue) !important;
  }

  /* Style for the error state */
  .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
    border: 1px solid red !important;
  }
  .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
    border-color: rgb(89 89 89 / 23%);
  }

  /* Style for helper text */
  .MuiFormHelperText-root {
    color: green; /* Helper text color */
  }
`;
export const SearchTextBox = styled(TextField)`
  /* Style for the root TextField component */
  .MuiOutlinedInput-root {
    line-height: 1.4375em;
    font-size: 1rem;
    font-family: "Public Sans", sans-serif;
    font-weight: 400;
    color: rgb(33, 43, 54);
    box-sizing: border-box;
    cursor: text;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    position: relative;
    // min-height: 48px;
    /* border-radius: 5px; */
    border-radius: 8px;
    /* background-color: #f0f0f0; */
  }

  /* Style for the input field */
  .MuiInputBase-input {
    color: #333 !important; /* Text color */
    font-size: 14px; /* Font size */
  }

  /* Style for the input label */
  .MuiInputLabel-root {
    color: rgb(77, 95, 116);
    font-size: 15px;
    margin-top: 5px;
    border-color: red !important;
  }

  /* Style for the placeholder text */
  .MuiInputLabel-outlined.MuiInputLabel-shrink {
    transform: translate(14px, -11px) scale(0.75); /* Adjust placeholder position */
  }

  /* Style for the focused input field */
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid var(--dark-blue) !important;
  }

  /* Style for the error state */
  .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
    border: 1px solid red !important;
  }
  .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
    border-color: rgb(89 89 89 / 23%);
  }

  /* Style for helper text */
  .MuiFormHelperText-root {
    color: green; /* Helper text color */
  }
`;
