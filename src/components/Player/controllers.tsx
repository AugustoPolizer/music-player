import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import PlayerButton from './playerButton';

export type Props = {
  soundObject: Audio.Sound | null
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
      <PlayerButton name="backward" size={30}  onClick={props.backwardMusic} />
      <PlayerButton name="play"  size={30} color={'red'} onClick={startMusic} />
      <PlayerButton name="pause" size={30} onClick={pauseMusic} />
      <PlayerButton name="forward" size={30} onClick={props.forwardMusic} />
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
  button :{
    padding :10,
    margin : 10,  
  }
})

export default Controllers;