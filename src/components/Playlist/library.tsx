import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image, View, Dimensions } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Search from "../Search/search";
import { Music } from "../../types/commons";
import { SafeAreaView } from "react-native-safe-area-context";
import Playlist from "./playlist";
import Wumpus from "../Playlist/wumpus"

export type ItemProps = {
  music: Music;
  changeMusic: (number: number) => void;
  current: boolean;
};

const RenderMusicItem: React.FC<ItemProps> = (props) => {
  return (
    <TouchableOpacity
      style={styles.displayer}
      onPress={() => {
        props.changeMusic(props.music.index);
      }}
    >
      <View style={props.current ? styles.musicLineActive : styles.musicLine}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
        <Text
          style={props.current ? styles.libraryTextRed : styles.libraryText}
        >
          {props.music.name.substring(0, props.music.name.lastIndexOf("."))}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export type Props = {
  musics: Music[];
  changeMusic: (index: number) => void;
  musicName: string;
  setMusicsSearch: Function;
  musicsSearch: Music[];
};

const PlayerButton: React.FC<Props> = (props) => {
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);
  const [albums, setAlbums] = useState<Array<any>>([]);
  const [albumToShow, setAlbumToShow] = useState<string>("");
  const [textForSearch, setTextForSearch] = useState<string>("");

  useEffect(() => {
    props.setMusicsSearch(props.musics);
    const array: Array<any> = [];
    props.musics.forEach((element) => {
      if (!array.includes(element.album)) {
        array.push(element.album);
      }
    });
    setAlbums(array);
  }, [props.musics]);
  useEffect(() => {
    if (props.musicsSearch.length > 0) {
      setAlbumToShow(props.musicsSearch[0].album);
    } else {
      setAlbumToShow("");
    }
  }, [props.musicsSearch]);
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.menu}>
        <Search setTextForSearch={setTextForSearch} />
        <TouchableOpacity
          onPress={() => setShowPlaylist(!showPlaylist)}
          style={styles.playListButton}
        >
          <Text
            style={
              showPlaylist
                ? styles.playlistButtonText
                : styles.playlistButtonTextBack
            }
          >
            {showPlaylist ? "Library" : "Playlists"}
          </Text>
        </TouchableOpacity>
      </View>
      {showPlaylist ? (
        <Playlist
          musics={props.musics}
          setMusicsSearch={props.setMusicsSearch}
          setShowPlaylist={setShowPlaylist}
          textForSearch = {textForSearch}
        />
      ) : (
        <View style={styles.body}>
          <FlatList
            style={styles.libraryMusic}
            numColumns={1}
            initialNumToRender={10}
            data={albums}
            renderItem={({ item }) => (
              <View style={styles.body}>
                {props.musicsSearch
                  .filter((music) => {
                    return music.album === item;
                  })
                  .filter((music) => {
                    return music.name
                      .toUpperCase()
                      .includes(textForSearch.toUpperCase());
                  }).length > 0 ? (
                  <View style={styles.body}>
                    <View style={styles.displayer}>
                      <TouchableOpacity
                        onPress={() =>
                          setAlbumToShow(item === albumToShow ? "" : item)
                        }
                      >
                        <View style={styles.albumLine}>
                          <Image
                            style={styles.tinyLogo}
                            source={require("../../../assets/albumIcon.png")}
                          />
                          <Text style={styles.albumText}>{item}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                      {item === albumToShow ? (
                        <FlatList
                          style={styles.libraryMusic}
                          data={props.musicsSearch
                            .filter((music) => {
                              return music.album === item;
                            })
                            .filter((music) => {
                              return music.name
                                .toUpperCase()
                                .includes(textForSearch.toUpperCase());
                            })/* .sort((song1,song2)=>song2.name > song1.name ? -1 : 1) */}
                          numColumns={1}
                          initialNumToRender={10}
                          renderItem={({ item }) => {
                            return (
                              <RenderMusicItem
                                music={item}
                                current={
                                  item.name == props.musicName ? true : false
                                }
                                changeMusic={props.changeMusic}
                              />
                            );
                          }}
                          keyExtractor={(item) => item.uri}
                          extraData={props.musics}
                        />
                      ) : (
                        false
                      )}
                    </View>
                  </View>
                ) : (
                  false
                )}
              </View>
            )}
            keyExtractor={(item) => item}
            extraData={props.musics}
          ></FlatList>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  playlistButtonTextBack: {
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
  },
  playlistButtonText: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },
  albumText: {
    color: "orange",
    fontWeight: "bold",
    textAlign: "left",
    margin: 10,
    flexWrap: "wrap",
    fontSize: 16,
  },
  menu: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  playListButton: {
    textAlign: "center",
    textTransform: "capitalize",
    marginLeft: 25,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 20,
    height: 30,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  musicLineActive: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
    width: "100%",
  },
  musicLine: {
    width: "80%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 10,
    margin: 2,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
  },
  albumLine: {
    width: "90%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 10,
    margin: 2,
    borderRadius: 10,
  },
  background: {
    height: Dimensions.get("screen").height * 0.75,
    width: Dimensions.get("window").width,
    paddingLeft: 10,
    paddingRight: 10,
  },
  libraryTextRed: {
    textAlign: "left",
    textTransform: "capitalize",
    flexWrap: "wrap",
    padding: 10,
    marginRight: 20,
    color: "red",
  },
  libraryText: {
    textAlign: "left",
    textTransform: "capitalize",
    flexWrap: "wrap",
    padding: 10,
    marginRight: 20,
    color: "black",
  },
  title: {
    textAlign: "center",
    textTransform: "capitalize",
    flexWrap: "wrap",
    padding: 10,
    fontSize: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  displayer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  displayerAlbum: {
    margin: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: "flex-start",
  },
  libraryMusic: {
    flex: 1,
  },
});

export default PlayerButton;
