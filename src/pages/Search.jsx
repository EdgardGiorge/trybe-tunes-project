import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Form from '../components/Form';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artista: '',
      disable: true,
      getArtista: '',
      logou: false,
      showArtista: false,
      album: [],
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      artista: value,
    }, () => this.searchBtn());
  }

  searchBtn = () => {
    const { artista } = this.state;
    const minLength = 2;

    if (artista.length >= minLength) {
      return this.setState({ disable: false });
    }
    return this.setState({ disable: true });
  }

  handleClick = async () => {
    const { artista } = this.state;
    this.setState({ logou: true, getArtista: artista });
    const albuns = await searchAlbumsAPI(artista);
    this.setState({
      artista: '', logou: false, disable: true, showArtista: true, album: albuns,
    });
  }

  render() {
    const { artista, disable, logou, showArtista, getArtista, album } = this.state;
    const texto = (
      <p>
        Resultado de álbuns de:
        {' '}
        { getArtista }
      </p>);
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
        {logou && <Loading /> }
        {showArtista && texto}
        {showArtista && album.length !== 0 && album.map(
          ({ artistName, collectionName, artworkUrl100, trackCount, collectionId }) => (
            <div key={ collectionId }>
              <img
                src={ artworkUrl100 }
                alt={ `Capa do albumName${collectionName} de ${artistName}` }
              />
              <p>{ collectionName }</p>
              <p>{ artistName }</p>
              <p>{ trackCount }</p>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                Ver Album
              </Link>
            </div>),
        )}
        { showArtista && album.length === 0 && <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

export default Search;
