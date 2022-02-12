import React, { Component } from 'react';
import Header from '../components/Header';
import Form from '../components/Form';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artista: '',
      disable: true,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ artista: value }, () => this.searchBtn());
  }

  searchBtn = () => {
    const { artista } = this.state;
    const minLength = 2;

    if (artista.length >= minLength) {
      return this.setState({ disable: false });
    }
    return this.setState({ disable: true });
  }

  render() {
    const { artista, disable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <Form
          value={ artista }
          onChange={ this.handleChange }
          disable={ disable }
          onClick={ this.handleClick }
          id="usuario"
          data="search-artist-input"
          dataBtn="search-artist-button"
          text="Pesquisar"
        />
      </div>
    );
  }
}

export default Search;
