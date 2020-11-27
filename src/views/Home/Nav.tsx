import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export interface Props {
  onMusic: (music: Music) => void;
}

const Nav: React.FC<Props> = (props) => {
  const getMusic = async () => {
    const music = await DocumentPicker.getDocumentAsync({
      type: "audio/mpeg"
    })
    if(music.type !== 'cancel') {
      props.onMusic({
        uri: music.uri,
        name: music.name,
      })
    }
  }

  return (
    <View>
      <Button
        title="+"
        onPress={getMusic}
        color="#000"
      />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default Nav;