import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MondayProvider } from "./context/MondayContext";



const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <MondayProvider>
            <App />
        </MondayProvider>ß
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
