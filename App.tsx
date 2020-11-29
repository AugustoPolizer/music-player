import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';
import { Home, Playlists, Play, musicContext } from './src/screens';
import { StatckNavigatorParamList } from './src/types/navigation';
import { Music } from './src/types/commons';
import * as MediaLibrary from 'expo-media-library';

Audio.setAudioModeAsync({
  staysActiveInBackground: true
})

const Stack = createStackNavigator<StatckNavigatorParamList>();

const App: React.FC<{}> = () => {
  // TODO: Checar se não é possível implementar isso de uma forma melhor
  const [avaliableMusic, setAvaliableMusic] = useState<Array<Music>>([])
  useEffect(() => {
    MediaLibrary.requestPermissionsAsync()
      .then((permission) => {
        if (permission.granted) {
          MediaLibrary.getAssetsAsync({
            mediaType: "audio"
          })
            .then((assets) => {
              setAvaliableMusic(assets.assets.map((asset): Music => {
                return {
                  name: asset.filename,
                  uri: asset.uri,
                  duration: asset.duration,
                }
              }))
            })
        }
      })
  })

  return (
    <musicContext.Provider value={avaliableMusic}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Playlists" component={Playlists} />
          <Stack.Screen name="Play" component={Play} />
        </Stack.Navigator>
      </NavigationContainer>
    </musicContext.Provider>
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

