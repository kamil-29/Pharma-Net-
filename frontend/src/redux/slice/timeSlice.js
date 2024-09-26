// timerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  minutes: 0,
  seconds: 60,
  isRunning: false, // Track if the timer is running
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    decrementSecond: (state) => {
      if (state.seconds === 0) {
        // if (state.minutes === 0) {
        //   return { ...state, isRunning: false }; // Timer has reached 0, stop the timer
        // }
        return { ...state, seconds: 60 , isRunning: false  };
      }
      return { ...state, seconds: state.seconds - 1 };
    },
    setTimer: (state, action) => {
      return { ...state, minutes: action.payload.minutes, seconds: action.payload.seconds };
    },
    resetTimer: (state) => {
      return { ...state, minutes: 0, seconds: 0, isRunning: false }; // Reset the timer
    },
    startTimer: (state) => {
      return { ...state, isRunning: true }; // Start the timer
    },
    stopTimer: (state) => {
      return { ...state, isRunning: false }; // Stop the timer
    },
  },
});

export const {
  decrementSecond,
  setTimer,
  resetTimer,
  startTimer,
  stopTimer,
} = timerSlice.actions;

export default timerSlice.reducer;