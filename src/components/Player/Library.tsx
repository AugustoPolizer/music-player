import React, { useState } from "react";
import { Text, StyleSheet, Image, View, Dimensions } from "react-native";
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
    padding: 10,
    flex: 1,
    backgroundColor : 'rgba(255,255,255,0.4)',
    borderRadius : 20,
    borderWidth : 5,
  },
  libraryText: {
    textAlign: "left",
    textTransform: "capitalize",
    flexWrap: "wrap",
    padding: 10,
    color : 'white'
  },
  title : {
    textAlign: "center",
    textTransform: "capitalize",
    color: "black",
    flexWrap: "wrap",
    padding: 10,
    fontSize : 20,
  },
  searchInput: {
    width: "95%",
    height: 40,
    textAlign: "center",
    borderWidth: 2,
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
    flex: 1,
  },
  libraryMusic: {
    flex: 1,
  },
});

export default PlayerButton;
