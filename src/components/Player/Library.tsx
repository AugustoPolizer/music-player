import React, { useState } from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Music } from "../../types/commons";

export type Props = {
  musics: Music[];
  changeMusic: (music:Music) => void
};

const PlayerButton: React.FC<Props> = (props) => {
  const [search, setSearch] = useState("");
  return (
    <View style={styles.background}>
      <TextInput
        onChangeText={(search) => {
          setSearch(search);
        }}
        style={styles.searchInput}
        placeholder={"Search"}
      />
      <Text style={styles.title}>Library</Text>
      <ScrollView>
        <View style={styles.libraryMusic}>
          {props.musics
            .filter((music) => {
              return String(music.name)
                .toUpperCase()
                .includes(String(search).toUpperCase());
            })
            .map((music) => {
              return (
                <TouchableOpacity
                  style={styles.displayer}
                  key={music.name + music.duration}
                  onPress={()=>{props.changeMusic(music)}}
                >
                  <View style={styles.musicLine}>
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: "https://reactnative.dev/img/tiny_logo.png",
                      }}
                    />
                    <Text style={styles.libraryText}>
                      {String(music.name).substring(
                        0,
                        String(music.name).lastIndexOf(".")
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  musicLine: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 10,
    borderWidth: 2,
    margin: 10,
    backgroundColor: "black",
    borderRadius: 10,
  },
  background: {
    padding: 20,
    flex: 1,
    borderRadius : 30,
  },
  libraryText: {
    textAlign: "left",
    textTransform: "capitalize",
    flexWrap: "wrap",
    padding: 10,
    color : 'white',
    marginRight : 20,
  },
  title : {
    textAlign: "center",
    textTransform: "capitalize",
    flexWrap: "wrap",
    padding: 10,
    fontSize : 20,
    color : 'white',
  },
  searchInput: {
    width: "95%",
    height: 40,
    textAlign: "center",
    borderRadius: 20,
    backgroundColor: "white",
    marginBottom: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "white",
  },
  displayer: {
    width : '100%',
  },
  libraryMusic: {
    flex: 1,
  },
});

export default PlayerButton;
