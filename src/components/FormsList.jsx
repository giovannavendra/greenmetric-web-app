import React, { useState, useEffect, useContext } from "react";
import { getForms, refreshTokenForm } from "../utils/data";
import { Button, Icon, Grid, Container } from "semantic-ui-react";
import {
    EditFormsContext,
    defaultEditFormsContext,
    dispatchSetId,
    dispatchSetTitle,
    dispatchAddDir,
    dispatchSetEdit,
    dispatchReset,
} from "../context/EditFormsContext";
import { deleteForms } from '../utils/data';
import IconForms from "../images/icon_forms.png";

const FormsList = () => {
    const { state, dispatch } = useContext(EditFormsContext);

    const [formsList, setFormsList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getForms();
            setFormsList(data);
        };

        fetchData();
    }, []);

    const onEditForms = (forms) => {
        dispatch(dispatchReset());
        if (forms) {
            dispatch(dispatchSetId(forms.id));
            dispatch(dispatchSetTitle(forms.title));
            forms.metrics.map((metric) => dispatch(dispatchAddDir(metric)));
        }

        dispatch(dispatchSetEdit(true));
    };

    const updateToken = async (formsId) => {
        const { data } = await refreshTokenForm(formsId)
        setFormsList(formsList.map(form => form.id === formsId ? { ...form, accessToken: data } : form))
    }

    const onDeleteForms = async (forms) => {
        await deleteForms(forms.id)
        setFormsList(formsList.filter(el => el.id !== forms.id))
    };

    return (


        <div>
            <div className="forms-header"><h1>Gerenciar Formulários</h1></div>
            <div className="forms">
                <div className="forms-list">
                    {formsList.map((forms) => (
                        <div key={forms.id} className={"forms-card bordered"}>
                            <div className="flx-r-sb">
                                <div>
                                    <h3>{forms.title}</h3>
                                    <div className="flx-r flx-w">
                                        {forms.metrics.slice(0, 5).map((metric) => (
                                            <span key={metric}>{metric}</span>
                                        ))}
                                        {forms.metrics.length > 5 && <span>...</span>}
                                    </div>
                                </div>
                                <div className='forms-card-actions'>
                                    <div className='forms-card-actions-icons'>
                                        <Icon
                                            name="pencil"
                                            size="large"
                                            className="clickable"
                                            onClick={() => onEditForms(forms)}
                                        />
                                        <Icon
                                            name="close"
                                            size="large"
                                            className="clickable"
                                            onClick={() => onDeleteForms(forms)}
                                        />
                                    </div>
                                    <div className='forms-card-actions-access_token'>
                                        <span>
                                            Token de Acesso: {forms.accessToken}
                                            <button
                                                onClick={() => { navigator.clipboard.writeText(forms.accessToken) }}>
                                                <Icon name='copy' color='blue' />
                                            </button>
                                            <button
                                                onClick={() => updateToken(forms.id)}>
                                                <Icon name='refresh' color='blue' />
                                            </button>
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <img src={IconForms} alt="icon" className="icon-forms" />
            </div>
            <div className="centered">
                <Button
                    icon="add"
                    content="Criar novo formulário"
                    basic
                    color="blue"
                    onClick={() => onEditForms()}
                />
            </div>
        </div>
    );
};

export default FormsList;
