import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

// Mentoria técnica em 07/02 as 15:30 Instrutor Daniel Farias
// Mentoria técnica em 07/02 as 18:00 Instrutor Eduardo Santos

class App extends Component {
  render() {
    return (
      <div>
        <h1>TrybeTunes</h1>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/search" component={ Search } />
            <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
            <Route path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="*" component={ NotFound } />
          </Switch>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
