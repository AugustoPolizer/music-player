import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Music } from "../../types/commons";

export type Props = {
  musics: Music[];
};

const PlayerButton: React.FC<Props> = (props) => {
  return (
    <ScrollView>
      <TextInput style={styles.searchInput} placeholder={'Search'}></TextInput>
      {props.musics.map((music) => {
        return (
          <TouchableOpacity key={music.name + music.duration} style={styles.body}>
            <Text style={styles.libraryText}>{String(music.name).substring(0,String(music.name).lastIndexOf('.'))}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  libraryText: {
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 18,
    color: "black",
    padding : 10,
  },
  searchInput : {
    width : '95%',
    height : 40,
    textAlign : 'center',
    borderWidth : 2,
    borderRadius : 20,
    margin : 10,
  }
});

export default PlayerButton;
