import { createContext } from "react";
import { getMetrics } from "../utils/data";

export const defaultAppContext = {
    loading: false,
    metrics: [],
    user: {
        authenticated: window.localStorage.getItem('token', false),
        username: window.localStorage.getItem('username', false),
    }
};

export const AppContext = createContext(defaultAppContext);

export const appReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, loading: action.value };
        case "GET_METRICS":
            return {
                ...state,
                metrics: action.value.map((el) => {
                    el.oldData = el.data instanceof Object ? { ...el.data } : el.data;
                    return el;
                }),
            };
        case "SET_METRIC":
            return {
                ...state,
                metrics: state.metrics.map((el) => {
                    if (el.id === action.id) {
                        if (el?.data.hasOwnProperty("options"))
                            el.data.currentOption = action.value;
                        else el.data = action.value;
                    }
                    return el;
                }),
            };
        case 'ADD_EVIDENCE':
            return {
                ...state,
                metrics: state.metrics.map((metric) => {
                    if (metric.id === action.id) {
                        if (!metric.evidences.find(el => el?.data?.name === action.file.name))
                            metric.evidences = [...metric.evidences, { id: action.file.name, data: action.file, action: 'UPLOAD' }]
                    }
                    return metric;
                }),
            }
        case 'REMOVE_EVIDENCE':
            return {
                ...state,
                metrics: state.metrics.map((metric) => {
                    if (metric.id === action.id) {
                        metric.evidences = metric.evidences.map((evidence) => {
                            if (evidence.id === action.evidenceId) {
                                return { ...evidence, data: null, action: 'DELETE' }
                            }
                            return evidence
                        })
                    }
                    return metric;
                }),
            }
        case "LOGOUT":
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('username')
            return {
                ...state,
                user: {
                    authenticated: false,
                    username: null,
                    token: null
                },
            };
        case "LOGIN":
            window.localStorage.setItem('token', action.token)
            window.localStorage.setItem('username', action.username)
            return {
                ...state,
                user: {
                    authenticated: true,
                    username: action.username,
                    token: action.token
                },
            };
        case "FORM_LOGIN":
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('username')
            return {
                ...state,
                user: {
                    authenticated: true,
                    username: null,
                    token: null
                },
            };
        default:
            return state;
    }
};

export const dispatchLoading = (loading) => ({
    type: "LOADING",
    value: loading,
});

export const dispatchLogin = ({ username, password, token }) => ({
    username,
    password,
    token,
    type: "LOGIN",
});

export const dispatchLogout = (user) => ({
    type: "LOGOUT",
});

export const dispatchFormLogin = () => ({
    type: "FORM_LOGIN",
});

export const dispatchStartGetMetrics = (dispatch) => {
    getMetrics().then(({ data }) => {
        dispatch(dispatchGetMetrics(data));
    });
};

export const dispatchGetMetrics = (metrics) => ({
    type: "GET_METRICS",
    value: metrics,
});

export const dispatchSetMetric = (id, value) => ({
    type: "SET_METRIC",
    id,
    value,
});


export const dispatchAddEvidence = (metricId, file) => ({
    type: 'ADD_EVIDENCE',
    id: metricId,
    file
})

export const dispatchRemoveEvidence = (metricId, evidenceId) => ({
    type: 'REMOVE_EVIDENCE',
    id: metricId,
    evidenceId
})