import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Segment, Container, Form, Breadcrumb, Message } from "semantic-ui-react";
import { createDashboard } from '../api/score';
import { kebabCase } from '../utils/utils';
import { useForm } from 'react-hook-form';
import urls from "../utils/urls";

const CreateDashboard = () => {
  const { register, handleSubmit, setValue, errors } = useForm();
  const errorMessages = Object.values(errors).map(e => e.message);
  const hasError = errorMessages.length > 0;
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleNameChange = e => {
    const value = e.target.value;
    setValue('id', kebabCase(value));
  };

  const submitForm = ({ id, name }) => {
    setLoading(true);
    createDashboard(id, name).then(() => {
      setLoading(false);
      setRedirect(`${urls.dashboardDetails}/${id}`);
    })
  };

  return (
    <Container>
      { redirect && <Redirect to={redirect} />}
      <Segment.Group>
        <Segment>
          <Breadcrumb size="massive">
            <Breadcrumb.Section href={urls.dashboards} >Painéis</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Criar</Breadcrumb.Section>
          </Breadcrumb>
        </Segment>
        <Segment>
          <Form onSubmit={handleSubmit(submitForm)} error={hasError}>
            <Form.Group widths="equal">
            <Form.Field disabled={loading} required>
              <label htmlFor="name">Nome</label>
              <input id="name" name="name" onChange={handleNameChange} ref={register({ required: 'O campo Nome é obrigatório' })} />
            </Form.Field>
            <Form.Field disabled={loading} required>
              <label htmlFor="id">ID</label>
              <input id="id" name="id" ref={register({ required: 'O campo ID é obrigatório' })} />
            </Form.Field>
            </Form.Group>
            {hasError && <Message error list={errorMessages} />}
            <Form.Group>
              <Form.Button primary loading={loading}>Salvar</Form.Button>
              <Form.Button negative disabled={loading} onClick={() => setRedirect(true)}>Cancelar</Form.Button>
            </Form.Group>
          </Form>
        </Segment>
      </Segment.Group>
    </Container>
  );
}

export default CreateDashboard;
