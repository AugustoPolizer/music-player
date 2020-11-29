import React from "react";
import { Text, View } from "react-native";
import Timer from "./timer";
import StartButton from "./startButton";
import PauseButton from "./pauseButton";

export interface Props {
  name: String;
  duration: number;
  currentTime: number;
}

interface State {}

export default class musicDisplay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 10,
        }}
      >
        <Text style={{ fontSize: 20 }}>{this.props.name}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StartButton />
          <PauseButton />
          <Timer
            currentTime={this.props.currentTime}
            duration={this.props.duration}
          />
        </View>
      </View>
    );
  }
}
