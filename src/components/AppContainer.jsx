import React, { useEffect, useReducer } from "react";
import {
    AppContext,
    appReducer,
    defaultAppContext,
    dispatchStartGetMetrics,
} from "../context/AppContext";
import Header from "./Header";

const AppContainer = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, defaultAppContext);

    useEffect(() => {
        const formsToken = window.localStorage.getItem('formsToken', false)
        if (!formsToken)
            dispatchStartGetMetrics(dispatch);
    }, []);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {state.loading && (
                <div className="loader centered">
                    <div />
                </div>
            )}
            <Header />
            <div className="app-container">{children}</div>
        </AppContext.Provider>
    );
};

export default AppContainer;
