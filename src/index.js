import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./router/AppRouter";
import "./css/index.css";
import "semantic-ui-css/semantic.min.css";
import './config'

ReactDOM.render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>,
    document.getElementById("root")
);
