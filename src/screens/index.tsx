import React from 'react'
import Home from './Home';
import { Music } from '../types/commons';

const musicContext = React.createContext<Array<Music>>([]);

export {
  Home,
  musicContext
};