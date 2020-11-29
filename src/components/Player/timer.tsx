import React from 'react'
import { Text, View } from 'react-native'

export type Props = {
  currentTime: number,
  duration: number,
}

const Timer: React.FC<Props> = (props) => {
  return (
    <View>
      <Text> {props.currentTime} / {props.duration} </Text>
    </View>

  )
}

export default Timer;