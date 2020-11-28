import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Audio} from 'expo-av';
import Home from './src/views/Home';

Audio.setAudioModeAsync({
  staysActiveInBackground: true
})

const App: React.FC<{}> = () => {

  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
