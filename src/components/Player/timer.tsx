import React, { useState, useEffect, useMemo } from 'react'
import { Text, View, TimePickerAndroid, StyleSheet } from 'react-native'

export type Props = {
  duration: number,
}

export type Time = {
  seconds: number
  minutes: number
  hours: number
}

const Timer: React.FC<Props> = (props) => {
  const [currentTime, setCurrentTime] = useState<Time>({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const durationTime = useMemo(() => {
    let seconds = Math.floor(props.duration);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    const time = {
      seconds,
      minutes,
      hours
    } as Time
    return time.hours.toString().padStart(2, '0') + ':'
    + time.minutes.toString().padStart(2, '0') + ':'
    + time.seconds.toString().padStart(2, '0');
  }, [props.duration])

  const tick = () => {
    setCurrentTime(prevTime => {
      let seconds = (prevTime.seconds + 1);
      let minutes = (prevTime.minutes + Math.floor(seconds / 60));
      let hours = prevTime.hours + Math.floor(minutes / 60);
      seconds = seconds % 60;
      minutes = minutes % 60;
      return {
        seconds,
        minutes,
        hours
      }
    })
  }

  useEffect(() => {
    setCurrentTime({
      seconds: 0,
      minutes: 0,
      hours: 0,
    });
    const interval = setInterval(tick, 1000)
    return function cleanup() {
      clearInterval(interval);
    }
  }, [props.duration])

  const formatTime = (time: Time) => {
    return time.hours.toString().padStart(2, '0') + ':'
      + time.minutes.toString().padStart(2, '0') + ':'
      + time.seconds.toString().padStart(2, '0');
  }

  return (
    <View>
      <Text style={styles.textColor}> {formatTime(currentTime)} - {durationTime} </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  textColor : {
    color : 'white',
    margin : 5,
  }
});

export default Timer;