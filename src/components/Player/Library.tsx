import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Music } from "../../types/commons";

export type Props = {
  musics: Music[];
};

const PlayerButton: React.FC<Props> = (props) => {
  return (
    <View style={styles.body}>
      {props.musics.map((music) => {
        return (
          <TouchableOpacity key={music.name + music.duration} style={styles.body}>
            <Text style={styles.libraryText}>{music.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  libraryText: {
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 18,
    color: "black",
    padding : 10,
    borderBottomWidth : 2,
  },
});

export default PlayerButton;
