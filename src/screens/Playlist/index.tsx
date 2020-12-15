import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, FlatList, Image } from "react-native";
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
            placeholderTextColor="black"
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
                      arrayMusics.filter((musics) => musics.name === item.name)
                        .length > 0
                        ? arrayMusics.splice(arrayMusics.indexOf(item), 1)
                        : arrayMusics.push(item);
                    }}
                  >
                    <Text
                      style={
                        arrayMusics.filter(
                          (musics) => musics.name === item.name
                        ).length > 0
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
            <Text style={styles.playlistText}>Your's playlists</Text>
          </View>
          {keys.length > 0 ? (
            <View style={styles.playlist}>
              <FlatList
                style={styles.body}
                data={keys}
                numColumns={2}
                initialNumToRender={10}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.bodySetPLaylist}>
                      <Text style={styles.titlePlaylist}>{item}</Text>
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
                          <Icon name={"magic"} size={20} color={"black"} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.playListButton}
                          onPress={async () => {
                            await AsyncStorage.getItem(
                              item
                            ).then((result: any) =>
                              props.setMusicsSearch(JSON.parse(result))
                            );
                            props.setShowPlaylist(false);
                          }}
                        >
                          <Icon name={"play"} size={20} color={"red"} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.playListButtonTrash}
                          onPress={async () => {
                            await AsyncStorage.removeItem(item);
                            setUpdate(!update);
                          }}
                        >
                          <Icon name={"trash"} size={20} color={"black"} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
                keyExtractor={(item: any) => item}
                extraData={props.musics}
              />
            </View>
          ) : (
            <View style={styles.wupusPlaylist}>
              <Image  style={styles.imageWumpus} resizeMode={"contain"} resizeMethod={"scale"} width={50} height={50} source={require('../../../assets/wumpus.gif')}  />
              <Text>There isn't nothing to Wumpus hear here.</Text>
            </View>
            
          )}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  wupusPlaylist: {
    alignItems :'center',
    justifyContent : 'flex-start',
  },
  imageWumpus:{
    alignItems : 'center',
    justifyContent : 'center',
    width : 220,
    height : 220,
  },
  titlePlaylist: {
    color: "#0101DF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    padding: 5,
    borderRadius: 20,
  },
  playlist: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  bodySetPLaylist: {
    width: Dimensions.get("screen").width / 2.4,
    height: Dimensions.get("screen").height / 4,
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    margin: 10,
  },
  displayPlaylist: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
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
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 20,
  },
  textExcludes: {
    color: "black",
    fontSize: 14,
    textAlign: "center",
    margin: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 20,
  },
  title: {
    fontSize: 14,
    color: "black",
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
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
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 20,
    color: "black",
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
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
    borderBottomColor: "black",
    color: "black",
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
    borderColor: "black",
    height: "100%",
    padding: 10,
  },
  playListButtonUpdate: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRightWidth: 2,
    borderColor: "black",
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
    color: "black",
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
