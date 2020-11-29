import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { PermissionResponse } from 'expo-media-library';
import * as MediaLibrary from 'expo-media-library';
import { Music } from '../../types/commons';

const Player: React.FC = () => {
  const [currentMusic, setCurrentMusic] = useState<number>(0);
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);
  const [permission, setPermission] = useState<PermissionResponse | null>(null);
  const [musics, setMusics] = useState<Array<Music>>([])

  useEffect(() => {
    MediaLibrary.requestPermissionsAsync()
      .then((permission) => {
        if (permission.granted) {
          MediaLibrary.getAssetsAsync({
            mediaType: "audio"
          })
            .then((mediaQuery) => {
              setMusics(mediaQuery.assets.map((asset): Music => {
                return {
                  name: asset.filename,
                  uri: asset.uri,
                  duration: asset.duration,
                }
              }))
              startMusic();
            })
        }
      })
  }, [])

  const startMusic = async () => {
    const permissionResponse = await getPermission();
    if (permissionResponse.granted) {
      try {
        const {
          sound,
          status
        } = await Audio.Sound.createAsync(
          { uri: musics[currentMusic].uri },
          { shouldPlay: true, progressUpdateIntervalMillis: 1000 }
        );
        sound.setOnPlaybackStatusUpdate(statusHandler);
        setSoundObject(sound);
      } catch (error) {
        alert(error);
      }
    }
  }

  const statusHandler = (status: any) => {
    if (status.didJustFinish) {
      if (currentMusic + 1 < musics.length) {
        setCurrentMusic(currentMusic + 1);
      } else {
        setSoundObject(null);
      }
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
      <Text> { musics.length !== 0 ? musics[currentMusic].name : "" } </Text>
      <Text> { musics.length !== 0 ? musics[currentMusic].duration : "" } </Text>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default Player;