import React, { useState, useContext } from 'react';
import { Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import urls from "../utils/urls"
import {
  AppContext,
  dispatchFormLogin,
} from "../context/AppContext";

const FormLoginForm = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AppContext);
  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    dispatch(dispatchFormLogin())
  }

  return (
    <React.Fragment>
      <h3>Acessar formulário</h3>
      <Form onSubmit={onSubmit}>
        <Form.Input name="code" label="Código" required onChange={(_, { value }) => setCode(value)} />
        <Form.Button primary loading={loading} disabled={loading} className="centered">Acessar</Form.Button>
        {loading && code && <Redirect to={`${urls.forms}/${code}`} />}
      </Form>
    </React.Fragment>
  );
}


export default FormLoginForm;
