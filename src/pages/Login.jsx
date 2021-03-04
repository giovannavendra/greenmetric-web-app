import React from 'react';
import { Form, Button, Grid, Container } from "semantic-ui-react";
import AdminLoginForm from '../components/AdminLoginForm';
import FormLoginForm from '../components/FormLoginForm';
import Logo from "../images/logo.png";

const Login = () => (
<Container>
  
  
  <Grid columns={2} divided justify="center" style={{flexGrow: 1, padding: 12}}>
  
    <Grid.Row>
      <Grid.Column>
        <img src={Logo} alt="logo" className="home-logo" />
      </Grid.Column>
      <Grid.Column>
        <h2>Identificação</h2>
        <FormLoginForm/>
        <AdminLoginForm/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
</Container>
);

export default Login;
