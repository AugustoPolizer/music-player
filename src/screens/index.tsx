import React from 'react'
import Home from './Home';
import Playlists from './Playlists';
import Play from './Play'
import { Music } from '../types/commons';

const musicContext = React.createContext<Array<Music>>([]);

export {
  Home,
  Playlists,
  Play,
  musicContext
};