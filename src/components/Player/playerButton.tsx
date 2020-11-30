import React from "react";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';

export type Props = {
  name: string,
  backgroundColor?: string,
  onClick?: any,
  size : number,
  color? : string,
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
      <Icon name={props.name} size={props.size} color={props.color ? props.color : 'black'} />
  </TouchableOpacity>);
}

const styles = StyleSheet.create({
  buttons: {
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center',
    margin :10,
    backgroundColor: "white",
  }
})

export default PlayerButton;