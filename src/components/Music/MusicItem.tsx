import React, { useState } from 'react';
import { Button, ImagePropTypes, Pressable, View } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';

export interface props {
  music: Music,
}

const MusicItem: React.FC<props> = (props) => {
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null)

  const statusHandler = (status: any) => {

  }

  const startSong = async () => {
    const {
      sound,
      status
    } = await Audio.Sound.createAsync(
      { uri: props.music.uri },
      { shouldPlay: true, progressUpdateIntervalMillis: 1000 }
    );
    sound.setOnPlaybackStatusUpdate(statusHandler);
    setSoundObject(sound);
  }

  const checkPermission = async () => {
    let permission = await Audio.getPermissionsAsync();
    if (permission.granted) {
      return true;
    } else {
      const request = await Audio.requestPermissionsAsync();
      if (request.granted) {
        return true;
      } else {
        return false;
      }
    }
  }

  const onStart = async () => {
    if (checkPermission()) {
      startSong();
    }
  }

  const onStop = () => {
    if(soundObject !== null) {
      soundObject.stopAsync()
      .then(() => {
        setSoundObject(null)
      })
    }
  }

  const formatMusicName = (name: string) => {
    const index = name.lastIndexOf('.');
    if (index !== -1) {
      return name.substring(0, index);
    }
    return name;
  }


  return (
    <View>
      <Button
        title={formatMusicName(props.music.name)}
        onPress={onStart}
        disabled={soundObject !== null}
      />
      {soundObject !== null ? <Button title={"Stop"} onPress={onStop}/>: null}
    </View>

  )
}

export default MusicItem;
