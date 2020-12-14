import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, FlatList } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Music } from "../../types/commons";
import Icon from "react-native-vector-icons/FontAwesome";

export type Props = {
  musics: Music[];
  setMusicsSearch: Function;
  setShowPlaylist: Function;
};

const Playlist: React.FC<Props> = (props) => {
  const [showCreatePlaylist, setShowCreatePlaylist] = useState<boolean>(false);
  const [playlistName, setplaylistName] = useState<string>("");
  const [arrayMusics, setArrayMusics] = useState<Array<Music>>([]);
  const [keys, setKeys] = useState<Array<string>>([]);
  const [update, setUpdate] = useState<boolean>(false);
  useEffect(() => {
    AsyncStorage.getAllKeys().then(setKeys);
  }, [update]);

  return (
    <View style={styles.body}>
      {showCreatePlaylist ? (
        <View style={styles.bodyCreatePlaylist}>
          <View style={styles.formPlaylist}>
            <TouchableOpacity
              onPress={() => {
                setShowCreatePlaylist(!showCreatePlaylist);
                arrayMusics.splice(0, arrayMusics.length);
                setplaylistName("");
              }}
            >
              <Text
                style={
                  showCreatePlaylist ? styles.cancelButton : styles.createButton
                }
              >
                {showCreatePlaylist ? "Cancel" : "Create a playlist"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                if (playlistName != "" && arrayMusics.length > 0) {
                  await AsyncStorage.setItem(
                    playlistName,
                    JSON.stringify(arrayMusics)
                  );
                  arrayMusics.splice(0, arrayMusics.length);
                  setplaylistName("");
                  setShowCreatePlaylist(!showCreatePlaylist);
                  setUpdate(!update);
                } else {
                  alert("Invalid data");
                }
              }}
            >
              <Text style={styles.createButton}>Save</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            onChangeText={setplaylistName}
            style={styles.textInputPlaylist}
            placeholder="Playlist name"
            placeholderTextColor="white"
            value={playlistName}
          />
          <View style={styles.middle}>
            <Text style={styles.playlistText}>Select songs</Text>
          </View>
           
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
                      setUpdate(!update);
                      arrayMusics.filter((musics)=>musics.name === item.name).length > 0
                        ? arrayMusics.splice(arrayMusics.indexOf(item), 1)
                        : arrayMusics.push(item);
                    }}
                  >
                    <Text
                      style={
                        arrayMusics.filter((musics)=>musics.name === item.name).length > 0
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
            onPress={() => {
              setShowCreatePlaylist(!showCreatePlaylist);
              arrayMusics.splice(0, arrayMusics.length);
            }}
          >
            <Text
              style={
                showCreatePlaylist ? styles.cancelButton : styles.createButton
              }
            >
              {showCreatePlaylist ? "Cancel" : "Create a playlist"}
            </Text>
          </TouchableOpacity>
          <View style={styles.middle}>
            <Text style={styles.playlistText}>Your's playlist</Text>
          </View>

          <FlatList
            style={styles.libraryMusic}
            data={keys}
            numColumns={1}
            initialNumToRender={10}
            renderItem={({ item }) => {
              return (
                <View style={styles.bodySetPLaylist}>
                  <Text style={styles.title}>{item}</Text>
                  <View style={styles.displayPlaylist} key={item}>
                    <TouchableOpacity
                      style={styles.playListButtonUpdate}
                      onPress={async () => {
                        setplaylistName(item);
                        arrayMusics.splice(0, arrayMusics.length);
                        await AsyncStorage.getItem(item)
                          .then((result: any) =>
                            arrayMusics.push(...JSON.parse(result))
                          )
                          .then((result) => setShowCreatePlaylist(true));
                      }}
                    >
                      <Icon name={"magic"} size={20} color={"white"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.playListButton}
                      onPress={async () => {
                        await AsyncStorage.getItem(item).then((result: any) =>
                          props.setMusicsSearch(JSON.parse(result))
                        );
                        props.setShowPlaylist(false);
                      }}
                    >
                      <Icon name={"play"} size={20} color={"white"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.playListButtonTrash}
                      onPress={async() => {
                        await AsyncStorage.removeItem(item);
                        setUpdate(!update);
                      
                      }}
                    >
                      <Icon name={"trash"} size={20} color={"white"} />
                    </TouchableOpacity>
                  </View>
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
  middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  bodySetPLaylist: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  displayPlaylist: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  playlistDisplay: {
    flex: 1,
    alignItems: "center",
  },
  setPlaylistButton: {
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
    textAlign: "center",
    margin: 10,
  },
  textExcludes: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    margin: 10,
  },
  title: {
    fontSize: 14,
    color: "white",
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    padding: 10,
    width: "100%",
  },
  formPlaylist: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-around",
  },
  createButton: {
    backgroundColor: "green",
    padding: 10,
    color: "white",
    borderRadius: 20,
    textAlign: "center",
    margin: 10,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 20,
    color: "white",
    textAlign: "center",
    margin: 10,
  },
  bodyCreatePlaylist: {
    flex: 1,
    alignItems: "center",
  },
  textInputPlaylist: {
    width: Dimensions.get("screen").width * 0.75,
    textAlign: "center",
    marginLeft: 10,
    borderRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    color: "white",
  },
  playListButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    textAlign: "center",
  },
  playListButtonTrash: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderLeftWidth: 2,
    borderColor: "white",
    height: "100%",
    padding: 10,
  },
  playListButtonUpdate: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRightWidth: 2,
    borderColor: "white",
    height: "100%",
    padding: 10,
  },
  playlistMusics: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
    textAlign: "center",
  },
  body: {
    flex: 1,
  },
  playlistText: {
    textAlign: "center",
    textTransform: "capitalize",
    flexWrap: "wrap",
    padding: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
    borderRadius: 20,
  },
  libraryMusic: {
    flex: 1,
  },
});

export default Playlist;
