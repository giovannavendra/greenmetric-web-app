import axios from "axios";
import { servAddr } from "../utils/constants";

export const signIn = (username, password) => {
    return axios.post(`${servAddr}/api/auth/signin`, {
        username,
        password,
    });
};
