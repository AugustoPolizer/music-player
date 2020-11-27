import React from 'react';
import { Button, ImagePropTypes, Pressable } from 'react-native';
import { Audio } from 'expo-av';

export interface props {
  music: Music,
}

const MusicItem: React.FC<props> = (props) => {
  const onClick = async () => {
    const permission = await Audio.getPermissionsAsync();

    if (permission.granted) {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({
        uri: props.music.uri
      })
      await soundObject.playAsync();
    } else {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.granted) {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync({
          uri: props.music.uri
        })
        await soundObject.playAsync();
      }
    }
  }

  return (
    <Button
      title={props.music.name}
      onPress={onClick}
    />
  )
}

export default MusicItem;
