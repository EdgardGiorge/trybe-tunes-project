import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import Card from './Card';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

// Ref. Estudo em grupo em sala de estudos

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteMusic: {},
      isLoading: false,
    };
  }

  async componentDidMount() {
    // capta as músicas que estão no localstorage
    const saveusic = await getFavoriteSongs();

    // transforma aquele objeto que veio com todos os dados do album em uma chave com o nome da música e valor true.
    // Ou seja, aquela já é uma música favoria e recarrega a página como marcado
    const musicas = saveusic.reduce(
      (acc, elem) => ({ ...acc, [elem.trackName]: true }), {},
    );
      // coloca o objeto criado em favorite music assim ao final do carregamento da página, depois q o html e todos os estados foram criados,
      // ele atualiza o estado do objeto com as músicas que já são favoritas.
    this.setState({ favoriteMusic: musicas });
  }

  createObj = () => {
    const { musicsAlbum } = this.props;
    const { favoriteMusic } = this.state;
    const favSongs = Object.values(favoriteMusic);
    const musicaKeys = Object.keys(favoriteMusic);

    const array = musicaKeys.map(
      (elem, index) => ({ [elem]: favSongs[index] }),
    );

    const valid = array.filter(
      (element, index) => element[musicaKeys[index]] === true,
    );

    const music = valid.map((musica) => Object.keys(musica));

    const last = music.map((atLast) => atLast[0]);

    const favorite = [];

    for (let index = 0; index < last.length; index += 1) {
      for (let i = 0; i < musicsAlbum.length; i += 1) {
        if (last[index] === musicsAlbum[i].trackName) {
          favorite.push(musicsAlbum[i]);
        }
      }
    }
    favorite.forEach((song) => this.adicionaMusica(song));
  }

  adicionaMusica = async (song) => {
    this.setState({ isLoading: true });
    await addSong(song);
    this.setState({ isLoading: false });
  }

  favoriteSong = ({ target }) => {
    const { name, checked } = target;

    this.setState((prevState) => (
      { favoriteMusic: { ...prevState.favoriteMusic, [name]: checked } }),
    () => this.createObj());
  }

  render() {
    const { musicsAlbum } = this.props;
    const { favoriteMusic, isLoading } = this.state;
    return (
      <div>
        {isLoading ? <Loading /> : <Card
          musics={ musicsAlbum }
          checked={ favoriteMusic }
          onChange={ this.favoriteSong }
        />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicsAlbum: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default MusicCard;
