import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <span>Album</span>
      </div>
    );
  }
}

export default Album;
