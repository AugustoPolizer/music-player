import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";

export type Props = {
  currentTime: number;
  durationTime: number;
  changeMusicTime : Function,
};

export type Time = {};

const formateToMinutes = (time: number): string => {
  let seconds = time;
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return String(
    minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")
  );
};

const ProgressBar: React.FC<Props> = (props) => {
  return (
    <View style={styles.body}>
      <View style={styles.progressBar}
        onTouchStart={(e) => {
          props.changeMusicTime(e.nativeEvent.locationX*props.durationTime/
            (Dimensions.get('screen').width * 0.8)*1000)
        }}>
        <View   style={{
            backgroundColor: "red",
            width: `${(props.currentTime / props.durationTime) * 100}%`,
            borderRadius : 5,
          }}
        >
           <Text style={styles.textColor}>
            {formateToMinutes(props.currentTime)} -{" "}
            {formateToMinutes(props.durationTime)}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textColor: {
    color: "black",
    fontSize: 12,
    width : Dimensions.get("screen").width * 0.8,
    textAlign : 'center',
    borderRadius : 5,
  },
  progressBar: {
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "white",
    borderRadius : 5,
  },
  body: {borderRadius : 20,flex :1},
});

export default ProgressBar;