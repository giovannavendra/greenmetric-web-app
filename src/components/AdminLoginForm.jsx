import React, { useState, useContext } from 'react';
import { Form, Transition } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { signIn } from "../api/auth";
import {
    AppContext,
    dispatchLogin,
} from "../context/AppContext";
import urls from "../utils/urls";

const AdminLoginForm = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [animated, setAnimated] = useState(true);
    const [response, setResponse] = useState('');
    const [reset, setReset] = useState('false');
    const { dispatch } = useContext(AppContext);

    const failSubmit = () => {
        setResponse("FAILURE");
        setAnimated(!animated);
    };

    const onSubmit = async e => {
        setLoading(true);

        e.preventDefault();

        try {
            const result = await signIn(username, password);
            if (result.status === 200) {
                dispatch(dispatchLogin({
                    username,
                    password,
                    token: result?.data.token
                }))
                setResponse("SUCCESS");
                setAnimated(!animated);

                history.push(urls.forms);
            } else {
                failSubmit();
            }
        } catch (err) {
            console.error('Failed to authenticate', err);
            failSubmit()
        } finally {
            setLoading(false);
            clearTimeout(reset);
            setReset(setTimeout(() => setResponse(null), 1000));
        }
    }

    return (
        <React.Fragment>
            <h3>Acesso administrativo</h3>
            <Form onSubmit={onSubmit}>
                <Form.Input required name="username" label="Usuário" onChange={(_, { value }) => setUsername(value)} />
                <Form.Input type="password" required name="password" label="Senha" onChange={(_, { value }) => setPassword(value)} />

        <Transition
          animation={response == "FAILURE" ? "shake" : ""}
          duration={300}
          visible={animated}
        >
          <Form.Button className="centered"
            primary
            loading={loading}
            disabled={loading}
            negative={response == "FAILURE"}
            positive={response == "SUCCESS"}
          >Entrar</Form.Button>
        </Transition>
      </Form>
    </React.Fragment>
  );
}

export default AdminLoginForm;
