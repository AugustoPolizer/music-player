import React, {useState, useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {StatckNavigatorParamList} from '../../types/navigation'
import {Music} from '../../types/commons';
import * as MediaLibrary from 'expo-media-library';
import {MusicQueue} from '../../components/Music'

type HomeScrennNavigator = StackNavigationProp<
  StatckNavigatorParamList,
  'Playlists'
>;

export type Props = {
  navigation: HomeScrennNavigator
}

const Playlists: React.FC<Props> = ({ navigation }) => {
  const [avaliableMusic, setAvaliableMusic] = useState<Array<Music>>([])

  useEffect(() => {
    MediaLibrary.requestPermissionsAsync()
    .then((permission) => {
      if(permission.granted){
        MediaLibrary.getAssetsAsync({
          mediaType: "audio"
        })
        .then((assets) => {
          setAvaliableMusic(assets.assets.map((asset) : Music =>  {
            return {
              name: asset.filename,
              uri: asset.uri,
              duration: asset.duration,
            } 
          }))
        })
      }
    })
    
  }, [avaliableMusic])
  
  return (
    <View>
      <MusicQueue queue={avaliableMusic}/>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default Playlists;