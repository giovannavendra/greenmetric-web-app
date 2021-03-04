import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LogoPd from "../images/logo-pd-integrado.png";
import LogoUnicamp from "../images/unicamp.svg";
import urls from "../utils/urls";
import {
    AppContext,
} from "../context/AppContext";

const Header = () => {
    const { state } = useContext(AppContext);
    const isAdmin = state.user.authenticated && state.user.username !== null
    const menuItems = [
        {
            name: "Painéis",
            url: urls.dashboards,
            disabled: !isAdmin,
        },
        {
            name: "Métricas",
            url: urls.metrics,
            disabled: !isAdmin,
        },
        {
            name: "Formulários",
            url: urls.forms,
            disabled: !isAdmin,
        },
        {
            name: "UI GreenMetric",
            url: urls.greenmetric,
            disabled: !isAdmin,
        },
        {
            name: "Entrar",
            url: urls.login,
            disabled: state.user.authenticated,
        },
        {
            name: "Sair",
            url: urls.logout,
            disabled: !state.user.authenticated,
        },
    ];

    return (
        <div className="app-menu">
            <Link to={urls.home}>
                <img src={LogoPd} alt="logo" className="app-menu-pd" />
            </Link>
            <div>
                {menuItems.filter((el) => !el.disabled).map((el) => (
                    <a key={el.url} href={el.url}>
                        {el.name}
                    </a>
                ))}
                <img src={LogoUnicamp} className="app-menu-unicamp" />
            </div>
        </div>
    );
};

export default Header;
