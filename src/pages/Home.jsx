import React from "react";
import NavigationSidebar from "../components/NavigationSidebar";
import AppForms from "../components/AppForms";
import Logo from "../images/logo.png";
import { Icon } from "semantic-ui-react";

const Home = () => {    

	return (
		<div className="home">
            <div className="home-line">
                <div className="home-title">
                <h1>GreenMetric Unicamp</h1>
                </div>
            </div>
            <div className="home-line">
                <div className="home-text">
                        <h2>Sobre</h2>
                        <p className="home-p">
                            O sistema de ranqueamento UI GreenMetric é uma iniciativa da Universitas Indonesia que estabelece indicadores de sustentabilidade específicos para avaliar e balizar as futuras decisões de centenas de universidades pelo planeta. O objetivo do ranqueamento é trazer um resultado online das condições e políticas de campus sustentáveis das universidades participantes, de forma a integrá-las e promover mais possibilidades de ações sustentáveis. 
                        </p> 
                        <p className="home-p">
                            Mais informações podem ser acessadas no website <a href="http://greenmetric.ui.ac.id/" target="_blank" rel="noopener noreferrer">UI GreenMetric</a>.
                        </p>

                    </div>
                    <img src={Logo} alt="logo" className="home-logo" />
                </div>
            <div className="home-line">
                
                <div className="home-text">
                    <h3>Contato</h3>
                    <p className="home-p">
                        Caso queira entrar em contato para tirar dúvidas ou precise de ajuda, comunique Thalita dos Santos Dalbelo através do e-mail fornecido. 
                    </p>
                </div>

                <div className="home-contact">
                    <div className="home-contact-unit">
                        <Icon color='blue' size='large' disabled name='mail' />
                        <p 
                            onClick={() => { navigator.clipboard.writeText("pdint@unicamp.br") }}
                            className="contact-text">
                            pdint@unicamp.br
                        </p>
                    </div>
                    {/*
                    <div className="home-contact-unit">
                        <Icon color='blue' size='large' disabled name='phone' /> 
                        <p>(19)99999-9999</p>
                    </div>
                    */}
                    
                </div>
            </div>
		</div>
	);
};
export default Home;
