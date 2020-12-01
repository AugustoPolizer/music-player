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
    <View>
      <Text style={styles.textColor}>{props.currentTime} - {props.durationTime}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  textColor: {
    color: 'white',
    margin: 5,
    fontSize : 12,
  }
});

export default Timer;