import React from "react";
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
  return (
    <View style={styles.background}>
      <TextInput
        onChangeText={() => {}}
        style={styles.searchInput}
        placeholder={"Search"}
      />
      <Text style={styles.libraryText}>Library</Text>
      <ScrollView> 
        <View style={styles.libraryMusic}>
          {props.musics.map((music) => {
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
    width: "100%",
    padding: 10,
    borderBottomWidth: 2,
  },
  background: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.9)",
    flex : 1,
  },
  libraryText: {
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 18,
    color: "white",
    flexWrap: "wrap",
    padding: 10,
  },
  searchInput: {
    width: "95%",
    height: 40,
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "white",
    marginBottom : 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  displayer: {
    flex: 1,
  },
  libraryMusic: {
    flex: 1,
  },
});

export default PlayerButton;
