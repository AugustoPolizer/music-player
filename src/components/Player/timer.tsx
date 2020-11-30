import React, { useState, useEffect, useMemo } from 'react'
import { Text, View, TimePickerAndroid, StyleSheet } from 'react-native'

export type Props = {
  duration: number
  paused: boolean
}

export type Time = {
  seconds: number
  minutes: number
  hours: number
}

const formatTime = (time: Time) => {
  return time.hours.toString().padStart(2, '0') + ':'
    + time.minutes.toString().padStart(2, '0') + ':'
    + time.seconds.toString().padStart(2, '0');
}

const Timer: React.FC<Props> = (props) => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout> ();
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
    return formatTime(time);
  }, [props.duration])

  useEffect(() => {
    setCurrentTime({
      seconds: 0,
      minutes: 0,
      hours: 0,
    });
    const id = setInterval(tick, 1000)
    setIntervalId(id);
    return function cleanup() {
      if(intervalId)
        clearInterval(intervalId);
    }
  }, [props.duration])

  useEffect(() => {
    if(props.paused) {
      if(intervalId)
        clearInterval(intervalId)
    } else {
      const id = setInterval(tick, 1000);
      setIntervalId(id);
    }
  }, [props.paused])

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