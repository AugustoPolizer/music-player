import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export type Props = {
  text: string
  onClick?: any
}

const PlayerButton: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity style={styles.buttons} onPress={props.onClick}> 
      <Text> { props.text } </Text>
  </TouchableOpacity>);
}

const styles = StyleSheet.create({
  buttons: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    backgroundColor: "green"
  }
})

export default PlayerButton;