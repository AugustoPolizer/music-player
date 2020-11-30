import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import PlayerButton from './playerButton';

export type Props = {
  soundObject: Audio.Sound | null,
  forwardMusic: () => void
  backwardMusic: () => void
}

const Controllers: React.FC<Props> = (props) => {
  const [permission, setPermission] = useState<Audio.PermissionResponse | null>(null);
  const getPermission = (): Promise<Audio.PermissionResponse> => {
    return new Promise<Audio.PermissionResponse>((resolve, reject) => {
      if (permission === null) {
        Audio.getPermissionsAsync()
          .then((response) => {
            setPermission(response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve(permission);
      }
    });
  };

  useEffect(() => {
    startMusic();
  }, [props.soundObject])

  const startMusic = async () => {
    const permissionResponse = await getPermission();
    if (permissionResponse.granted) {
      if (props.soundObject !== null) {
        props.soundObject.playAsync();
      }
    }
  };

  const pauseMusic = async () => {
    if (props.soundObject !== null) {
      props.soundObject.pauseAsync();
    }
  }

  return (
    <View style={styles.buttonsContainer}>
      <PlayerButton text="play" onClick={startMusic} />
      <PlayerButton text="pause" onClick={pauseMusic} />
      <PlayerButton text="foward" onClick={props.forwardMusic} />
      <PlayerButton text="backward" onClick={props.backwardMusic} />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Controllers;