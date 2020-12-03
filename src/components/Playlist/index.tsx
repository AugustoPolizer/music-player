import React, { useState, useEffect} from 'react'
import { Text, View, StyleSheet } from 'react-native'

export type Props = {
}

export type Time = {
  
}

const Playlist: React.FC<Props> = (props) => {
  

  return (
    <View style={styles.body}>
      <Text style={styles.textColor}></Text>
    </View>
  )
}
const styles = StyleSheet.create({
  body:{
    position : 'absolute',
  },
  textColor: {
    color: 'black',
    margin: 5,
    fontSize : 12,
    textAlign : 'center',
  }
});

export default Playlist;