import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import PlayerButton from './playerButton';

export type Props = {
  soundObject: Audio.Sound | null
  forwardMusic: () => void
  backwardMusic: () => void
  pauseMusic: () => void
  startMusic: () => void
}

const Controllers: React.FC<Props> = (props) => {
 
  useEffect(() => {
    props.startMusic();
  }, [props.soundObject])

  return (
    <View style={styles.buttonsContainer}>
      <PlayerButton name="backward" size={30} color={'white'} onClick={props.backwardMusic} />
      <PlayerButton name="play"  size={30} color={'red'} onClick={props.startMusic} />
      <PlayerButton name="pause" size={30} color={'white'} onClick={props.pauseMusic} />
      <PlayerButton name="forward" size={30} color={'white'} onClick={props.forwardMusic} />
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