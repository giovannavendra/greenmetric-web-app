import React, { useEffect, useContext } from "react";
import {
    useParams
} from "react-router-dom";
import { getFormsByToken } from "../utils/data";
import { AppContext, dispatchGetMetrics } from '../context/AppContext'
import AppForms from '../components/AppForms'

export const PageFormsToken = () => {
    let { formsToken } = useParams();
    const { dispatch } = useContext(AppContext)
    window.localStorage.setItem('formsToken', formsToken)

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getFormsByToken(formsToken)
            dispatch(dispatchGetMetrics(data.metrics))
        }

        fetchData()
    }, [])

    return (
        <div>
            <AppForms />
        </div>
    )
}