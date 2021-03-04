import axios from "axios";
import { servAddr } from "../utils/constants";

export const putMetricData = (id, value) => {
    if (window.localStorage.getItem('token')) {
        return axios.put(`${servAddr}/metrics/${id.replace(/\//g, '-')}`, {
            data: isNaN(value) ? value : parseInt(value, 10),
            formsToken: window.localStorage.getItem('formsToken')
        });
    } else {
        return axios.put(`${servAddr}/submit/metrics/${id.replace(/\//g, '-')}`, {
            data: isNaN(value) ? value : parseInt(value, 10),
            formsToken: window.localStorage.getItem('formsToken')
        });
    }
};

export const postForms = (title, metrics) => {
    return axios.post(`${servAddr}/forms`, {
        title,
        metrics,
    });
};

export const putForms = (id, title, metrics) => {
    return axios.put(`${servAddr}/forms`, {
        id,
        title,
        metrics,
    });
};

export const getForms = () => {
    return axios.get(`${servAddr}/forms`);
};

export const postEvidence = (metricId, file) => {

    let formData = new FormData();

    formData.append("data", file, file.name);
    formData.append("formsToken", window.localStorage.getItem('formsToken'));

    if (window.localStorage.getItem('token')) {
        return axios.post(`${servAddr}/metrics/${metricId.replace(/\//g, '-')}/evidence`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } else {
        return axios.post(`${servAddr}/submit/metrics/${metricId.replace(/\//g, '-')}/evidence`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const getMetricbyId = (metricId) => {
    return axios.get(`${servAddr}/metrics/${metricId.replace(/\//g, '-')}`)
}

export const deleteEvidence = (metricId, evidenceId) => {
    return axios.delete(`${servAddr}/metrics/${metricId.replace(/\//g, '-')}/evidence/${evidenceId}`)
}

export const getMetrics = () => {
    return axios.get(`${servAddr}/metrics`)
}

export const deleteForms = (formsId) => {
    return axios.delete(`${servAddr}/forms/${formsId}`)
}

export const getFormsByToken = (token) => {
    return axios.get(`${servAddr}/api/auth/forms/${token}`)
}

export const refreshTokenForm = (formsId) => {
    return axios.get(`${servAddr}/forms/${formsId}/refresh`)
}

export const postMetric = (metric) => {
    return axios.post(`${servAddr}/metrics`, { ...metric, evidences: [], dependencies: [] })
}

export const putMetric = (metric) => {
    return axios.put(`${servAddr}/metrics`, { ...metric, evidences: [], dependencies: [] })
}

export const deleteDirectory = (dirName, type) => {
    return axios.delete(`${servAddr}/metrics/directory/${type === 'metric' ? `${dirName.replace(/\//g, '-')}$` : `${dirName.replace(/\//g, '-')}-`}`)
}

export const copyDiretory = (dstDirname, srcDirname, copyType) => {
    return axios.post(`${servAddr}/metrics/directory`, {}, {
        params: {
            dstDirname,
            srcDirname: copyType === 'metric' ? `${srcDirname}$` : `${srcDirname}-`
        }
    })
}