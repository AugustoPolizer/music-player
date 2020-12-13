import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, FlatList } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Music } from "../../types/commons";

export type Props = {
  musics: Music[];
  setMusicsSearch : Function,
};


const Playlist: React.FC<Props> = (props) => {
  const [showCreatePlaylist, setShowCreatePlaylist] = useState<boolean>(false);
  const [playlistName, setplaylistName] = useState<string>("");
  const [arrayMusics, setArrayMusics] = useState<Array<Music>>([]);
  const [keys, setKeys] = useState<Array<string>>([]);
  const [update,setUpdate] = useState<boolean>(false)
  useEffect(() => {
    AsyncStorage.getAllKeys().then(setKeys);
  }, []);

  return (
    <View style={styles.body}>
      {showCreatePlaylist ? (
        <View style={styles.bodyCreatePlaylist}>
          <View style={styles.formPlaylist}>
            <TouchableOpacity
              onPress={() => setShowCreatePlaylist(!showCreatePlaylist)}
            >
              <Text
                style={
                  showCreatePlaylist ? styles.cancelButton : styles.createButton
                }
              >
                {showCreatePlaylist ? "Cancel" : "Create a playlist"}
              </Text>
            </TouchableOpacity>
            <TextInput
              onChangeText={setplaylistName}
              style={styles.textInputPlaylist}
              placeholder="Playlist name"
              placeholderTextColor="white"
            />
            <TouchableOpacity
              onPress={() => {
                if(playlistName && arrayMusics.length >0){
                  AsyncStorage.setItem(playlistName, JSON.stringify(arrayMusics));
                  setArrayMusics([]);
                  setplaylistName("")
                }
               alert("Invalid data")
              }}
            >
              <Text style={styles.createButton}>Create</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Select the musics</Text>
          <FlatList
            style={styles.libraryMusic}
            data={props.musics}
            numColumns={1}
            initialNumToRender={10}
            renderItem={({ item }) => {
              return (
                <View style={styles.body} key={item.name}>
                  <TouchableOpacity
                    onPress={() => {
                      setUpdate(!update)
                      arrayMusics.includes(item)
                        ? arrayMusics.splice(arrayMusics.indexOf(item), 1)
                        : arrayMusics.push(item)
                    }}
                    style={styles.playListButton}
                  >
                    <Text
                      style={
                        arrayMusics.includes(item)
                          ? styles.textIncludes
                          : styles.textExcludes
                      }
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item: any) => item.uri}
            extraData={props.musics}
          />
        </View>
      ) : (
        <View style={styles.playlistDisplay}>
          <TouchableOpacity
            onPress={() => setShowCreatePlaylist(!showCreatePlaylist)}
          >
            <Text
              style={
                showCreatePlaylist ? styles.cancelButton : styles.createButton
              }
            >
              {showCreatePlaylist ? "Cancel" : "Create a playlist"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>Your's playlist</Text>
          <FlatList
            style={styles.libraryMusic}
            data={keys}
            numColumns={1}
            initialNumToRender={10}
            renderItem={({ item }) => {
              return (
                <View style={styles.body} key={item}>
                  <TouchableOpacity style={styles.playListButton} onPress={()=>{AsyncStorage.getItem(item).then((result : any) =>props.setMusicsSearch(JSON.parse(result)))}}>
                    <Text style={styles.playlistText}>{item}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item: any) => item}
            extraData={props.musics}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  playlistDisplay: {
    margin: 10,
    flex: 1,
  },
  setPlaylistButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "white",
    fontSize: 16,
    margin: 10,
    padding: 10,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 20,
  },
  textIncludes: {
    color: "red",
    fontSize: 14,
  },
  textExcludes: {
    color: "white",
    fontSize: 14,
  },
  title: {
    fontSize: 14,
    color: "white",
    margin: 20,
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
  },
  formPlaylist: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  createButton: {
    backgroundColor: "green",
    padding: 10,
    color: "white",
    borderRadius: 20,
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 20,
    color: "black",
    textAlign: "center",
  },
  bodyCreatePlaylist: {
    flex: 1,
    margin: 10,
  },
  textInputPlaylist: {
    width: Dimensions.get("screen").width * 0.75,
    textAlign: "center",
    marginLeft: 10,
    backgroundColor: "rgba(100,100,100,0.1)",
    borderRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    color: "white",
  },
  playListButton: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor : "rgba(255,255,255,0.2)",
    padding : 10,
    borderRadius : 20,
    textAlign : 'center',
  },
  body: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  playlistText: {
    textAlign: "center",
    textTransform: "capitalize",
    flexWrap: "wrap",
    padding: 10,
    color: "white",
    marginRight: 20,
  },
  libraryMusic: {
    flex: 1,
  },
});

export default Playlist;
