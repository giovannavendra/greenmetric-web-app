import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AppContainer from "../components/AppContainer";
import PageEditForms from "../pages/PageEditForms";
import PageEditMetric from "../pages/PageEditMetric";
import PageForms from "../pages/PageForms";
import Login from "../pages/Login";
import Logout from "../components/Logout";
import Home from "../pages/Home";
import { PageFormsToken } from "../pages/PageFormsToken";
import Dashboard from "../pages/Dashboard";
import ListDashboard from "../pages/ListDashboard";
import CreateDashboard from "../pages/CreateDashboard";
import urls from "../utils/urls";

export const AppRouter = () => {
    useEffect(() => {
        window.localStorage.removeItem('formsToken')
    }, [])

    return (
        <Router>
            <AppContainer>
                <Switch>
                    <Route path="/home"><Home /></Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/logout">
                        <Logout />
                    </Route>
                    <Route path="/greenmetric" exact>
                        <PageForms />
                    </Route>
                    <Route path="/forms" exact>
                        <PageEditForms />
                    </Route>
                    <Route path="/forms/:formsToken">
                        <PageFormsToken />
                    </Route>
                    <Route path="/metrics" exact>
                        <PageEditMetric />
                    </Route>
                    <Route path={urls.dashboardCreation} exact>
                        <CreateDashboard />
                    </Route>
                    <Route path={urls.dashboards} exact>
                        <ListDashboard />
                    </Route>
                    <Route path={`${urls.dashboardDetails}/:id`} exact>
                      {({ match }) => (
                        <Dashboard id={match.params.id} />
                      )}
                    </Route>
                    <Route path='/*'><Login /></Route>
                </Switch>
            </AppContainer>
        </Router>
    );
};

export default AppRouter;
