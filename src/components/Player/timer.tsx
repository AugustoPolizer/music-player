import React, { useState, useEffect, useMemo } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export type Props = {
  currentTime : string,
  durationTime : string,
}

export type Time = {
  
}

const Timer: React.FC<Props> = (props) => {
  

  return (
    <View style={styles.body}>
      <Text style={styles.textColor}>{props.currentTime} - {props.durationTime}</Text>
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

export default Timer;