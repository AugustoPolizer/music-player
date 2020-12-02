import React, { useState } from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Search from '../search';
import { Music } from "../../types/commons";

export type Props = {
  musics: Music[];
  changeMusic: (music:Music,number : number) => void
};

const PlayerButton: React.FC<Props> = (props) => {
  const [search, setSearch] = useState<string>("");
  return (
    <View style={styles.background}>
      <Search onSearch={(newSearch: string) => setSearch(newSearch)}/>
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
                  onPress={()=>{props.changeMusic(music,props.musics.indexOf(music))}}
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
    // borderWidth: 2,
    margin: 10,
    backgroundColor: "rgba(100,100,100,0.1)",
    borderRadius: 10,
  },
  background: {
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
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  displayer: {
    width : '100%',
  },
  libraryMusic: {
    flex: 1,
  },
});

export default PlayerButton;
