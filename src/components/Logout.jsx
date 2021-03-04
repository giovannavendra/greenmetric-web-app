import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {
  AppContext,
  dispatchLogout,
} from "../context/AppContext";

const Logout = () => {
  const { dispatch } = useContext(AppContext);
  dispatch(dispatchLogout());

  return (
    <Redirect to="/" />
  );
}


export default Logout;
