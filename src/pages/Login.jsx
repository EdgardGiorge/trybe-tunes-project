import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import Form from '../components/Form';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      status: false,
      logou: false,
      btnDisable: true,

    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      userName: value,
    }, () => { this.enablebtn(); });
  } // Atualiza o estado do userName a cada interação (input preenchido), depois chama a enablebtn() pra autorizar ou não habilitá-lo

  enablebtn = () => {
    const { userName } = this.state;
    const minLength = 3;

    if (userName.length >= minLength) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({ btnDisable: true });
    }
  } // Valida se botão tem um mínimo de 3 caracteres

  handleClick = async () => {
    const { userName } = this.state;
    const objeto = { name: userName };
    this.setState({ logou: true });
    await createUser(objeto);
    this.setState({ status: true });
  } // botão do Login clicado , libera o 'Carregndo...' com o status como true, na sequência a função createUser é acionada pra salvar o nome digitado. A patir dai o status muda pra false que retira o Carregando... da tela, muda o estado do logou pra true pra redirecionar pro search

  render() {
    const { userName, btnDisable, status, logou } = this.state;
    return (
      <div data-testid="page-login">
        {status && <Redirect to="/search" /> }
        { logou ? <Loading /> : <Form
          value={ userName }
          onChange={ this.handleChange }
          disable={ btnDisable }
          onClick={ this.handleClick }
          id="usuario"
          text="Entrar"
          data="login-name-input"
          dataBtn="login-submit-button"
        />}
        { /* se logou === true, renderiza o componente Search. Caso o status === true, renderiza o componente Loading */ }
      </div>
    );
  }
}

export default Login;
