import React, { Component } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ userName: user.name });
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        {userName === '' ? <Loading />
          : <h2 data-testid="header-user-name">{ userName }</h2>}

      </header>
    );
  }
}

export default Header;
