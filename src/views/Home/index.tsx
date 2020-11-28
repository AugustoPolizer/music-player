import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import MusicQueue from '../../components/Music/MusicQueue';
import Nav from './Nav';

const Home: React.FC<{}> = () => {
  const [avaliableMusic, setAvaliableMusic] = useState<Music []>([]);
  const handleNewMusic = (music: Music)  => {
    const avaiableMusic = avaliableMusic;
    setAvaliableMusic(avaiableMusic.concat([music]));
  }
  
  return (
    <View style={styles.home}>
      <View style={styles.nav}>
        <Nav onMusic={handleNewMusic}/>
      </View>
      <View style={styles.list}>
        <MusicQueue queue={avaliableMusic}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    flex: 1
  },
  nav: {
    flex: 1
  },
  list: {
    flex: 9
  }
});

export default Home;