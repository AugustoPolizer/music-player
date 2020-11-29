import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatckNavigatorParamList } from '../../types/navigation'
import { Audio } from 'expo-av';
import { PermissionResponse } from 'expo-media-library';
import { musicContext } from '../index'

type HomeScrennNavigator = StackNavigationProp<
  StatckNavigatorParamList,
  'Play'
>;

export type Props = {
  navigation: HomeScrennNavigator
}

const Play: React.FC<Props> = ({ navigation }) => {
  const [currentMusic, setCurrentMusic] = useState<number>(0);
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);
  const [permission, setPermission] = useState<PermissionResponse | null>(null);
  const musics = useContext(musicContext);

  useEffect(() => {
    startMusic();
  }, [currentMusic])

  const statusHandler = (status: any) => {
    if (status.didJustFinish) {
      if (currentMusic + 1 < musics.length) {
        setCurrentMusic(currentMusic + 1);
      } else {
        setSoundObject(null);
      }
    }
  }

  const startMusic = async () => {
    const permissionResponse = await getPermission();
    if (permissionResponse.granted) {
      const {
        sound,
        status
      } = await Audio.Sound.createAsync(
        { uri: musics[currentMusic].uri },
        { shouldPlay: true, progressUpdateIntervalMillis: 1000 }
      );
      sound.setOnPlaybackStatusUpdate(statusHandler);
      setSoundObject(sound);
    }

  }

  const getPermission = (): Promise<PermissionResponse> => {
    return new Promise<PermissionResponse>((resolve, reject) => {
      if (permission === null) {
        Audio.getPermissionsAsync()
          .then((response) => {
            setPermission(response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          })
      } else {
        resolve(permission);
      }
    })
  }

  return (
    <View>
      <Text>{musics[currentMusic].name}</Text>
      <Text>{musics[currentMusic].duration}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default Play;