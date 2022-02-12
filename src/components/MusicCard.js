import React from 'react';
import PropTypes from 'prop-types';

// Ref. Estudo em grupo em sala de estudos

class MusicCard extends React.Component {
  render() {
    const { musicsAlbum } = this.props;
    return (
      <div>
        {musicsAlbum.map(({ trackName, previewUrl, trackId }) => (
          <div key={ trackId }>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicsAlbum: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default MusicCard;
