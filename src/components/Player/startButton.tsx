import React from "react";
import {Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface Props {

}

interface State {}

export default class musicDisplay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ display: "flex",alignItems : 'center',justifyContent : 'center',margin:10,padding : 10, }}>
          <TouchableOpacity><Text style={{borderWidth : 2,borderRadius : 10,padding : 10,textAlign : 'center',backgroundColor :'green'}}>Play</Text></TouchableOpacity>
      </View>
    );
  }
}
