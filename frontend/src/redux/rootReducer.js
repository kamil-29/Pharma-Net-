// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';
import timeSlice from './slice/timeSlice';
import medicineSlice from './slice/medicineSlice';
import CategorySlice from './slice/CategorySlice';

const rootReducer = combineReducers({
  auth: userSlice,
  timer: timeSlice,
  medicine: medicineSlice,
  category: CategorySlice
  // Add more reducers here
});

export default rootReducer;
