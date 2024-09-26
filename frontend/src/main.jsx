import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";
import "@styles/index.css";
import "@styles/responsive.css";
import "@splidejs/react-splide/css/skyblue";
// import store, { persistor } from './redux/store.js'
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.js";
// import { PersistGate } from 'redux-persist/integration/react'
import { PersistGate } from "redux-persist/integration/react";
// import storefrom './path-to-your-store/store';

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>,
);
