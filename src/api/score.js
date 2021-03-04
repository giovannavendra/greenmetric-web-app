import axios from "axios";
import { servAddr } from "../utils/constants";

export const calculate = (id) => {
  return axios.get(`${servAddr}/dashboard/${id}/calculate`);
};

export const createDashboard = (id, name) => {
  return axios.post(`${servAddr}/dashboard`, {
    id,
    name,
  });
};

export const createCategory = ({id, dashboard, name, weight, color, order, metrics}) => {
  return axios.post(`${servAddr}/category`, {
    id,
    dashboard,
    name,
    weight,
    color,
    order,
    metrics,
  });
};

export const updateCategory = (id, {name, weight, color, order, metrics}) => {
  return axios.put(`${servAddr}/category/${id}`, {
    name,
    weight,
    color,
    order,
    metrics,
  });
};

export const deleteCategory = (id) => {
  return axios.delete(`${servAddr}/category/${id}`);
};

export const deleteDashboard = (id) => {
  return axios.delete(`${servAddr}/dashboard/${id}`);
};

export const editDashboard = (id, name) => {
  return axios.put(`${servAddr}/dashboard/${id}`, {
    name,
  });
};

export const listDashboards = () => {
  return axios.get(`${servAddr}/dashboard`);
};

export const getDashboard = (id) => {
  return axios.get(`${servAddr}/dashboard/${id}`);
};

