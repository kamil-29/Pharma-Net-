// store.js
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use the appropriate storage type for your platform
// import rootReducer from "./rootReducer";
import userSlice from "./slice/userSlice";
import timeSlice from "./slice/timeSlice";
import medicineSlice from "./slice/medicineSlice";
import CategorySlice from "./slice/CategorySlice";
import customerSlice from "./slice/customerSlice";

import { configureStore, combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root", // This key is used to store data in storage
  storage,
  whitelist: ["auth", "timer", "customer"],
};

const rootReducer = combineReducers({
  auth: userSlice,
  timer: timeSlice,
  medicine: medicineSlice,
  category: CategorySlice,
  customer: customerSlice,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
//   // Add any other middleware or enhancers you might need
// });

// export const persistor = persistStore(store);
// export default store;

// const store = configureStore({
//   reducer: {
//     auth: userSlice,
//     timer: timeSlice,
//     medicine: medicineSlice,
//     category: CategorySlice
//   }
// });

// export default store;
