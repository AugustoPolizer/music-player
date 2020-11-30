import React from "react";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export type Props = {
  text: string
  backgroundColor?: string
  onClick?: any
}

const PlayerButton: React.FC<Props> = (props) => {
  const backgroundColor = StyleSheet.create({
    buttons: {
      backgroundColor: props.backgroundColor
    }
  })
  const combinedStyles = StyleSheet.compose(styles.buttons, backgroundColor.buttons)
  return (
    <TouchableOpacity style={combinedStyles} onPress={props.onClick}> 
      <Text> { props.text } </Text>
  </TouchableOpacity>);
}

const styles = StyleSheet.create({
  buttons: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    backgroundColor: "white"
  }
})

export default PlayerButton;