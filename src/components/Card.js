import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { musics, checked, onChange } = this.props;
    return (
      <div>
        {musics.map((music) => (
          <div key={ music.trackId }>
            <p>{music.trackName}</p>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>

            <label htmlFor={ music.trackId }>
              <input
                name={ music.trackName }
                id={ music.trackId }
                type="checkbox"
                data-testid={ `checkbox-music-${music.trackId}` }
                checked={ checked[music.trackName] }
                onChange={ onChange }
              />
              Favorita
            </label>
          </div>
        ))}
      </div>

    );
  }
}

Card.propTypes = {
  checked: PropTypes.objectOf(PropTypes.bool).isRequired,
  onChange: PropTypes.func.isRequired,
  musics: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default Card;
