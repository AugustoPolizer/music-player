import React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Music } from "../../types/commons";

export type Props = {
  musics: Music[];
};

const PlayerButton: React.FC<Props> = (props) => {
  return (
    <ScrollView>
      <TextInput style={styles.searchInput} placeholder={"Search"}></TextInput>
      <View style={styles.libraryMusic}>
      {props.musics.map((music) => {
        return (
          <TouchableOpacity style={styles.displayer} key={music.name + music.duration}>
            <Image
              style={styles.tinyLogo}
              source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            />
            <Text style={styles.libraryText}>
              {String(music.name).substring(
                0,
                String(music.name).lastIndexOf(".")
              )}
            </Text>
          </TouchableOpacity>
        );
      })}
      </View>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  libraryText: {
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 18,
    color: "black",
    padding: 10,
  },
  searchInput: {
    width: "95%",
    height: 40,
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  displayer: {
    padding : 10,
    margin : 10,
  },
  libraryMusic : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    flexDirection : 'row',
    flexWrap : 'wrap',
  
  }
});

export default PlayerButton;
