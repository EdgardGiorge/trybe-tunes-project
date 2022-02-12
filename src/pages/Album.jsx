import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      nameArtists: '',
      albumName: '',
      musics: [],

    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const musicas = await getMusics(id);
    const { artistName, collectionName } = musicas[0];
    this.setState({
      nameArtists: artistName,
      albumName: collectionName,
    });
    const musicasTodas = musicas.slice(1);
    this.setState({ musics: musicasTodas });
  }

  render() {
    const { nameArtists, albumName, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h3 data-testid="artist-name">{ nameArtists }</h3>
          <h4 data-testid="album-name">{ albumName }</h4>
        </div>
        <section>
          <MusicCard musicsAlbum={ musics } />
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default Album;
