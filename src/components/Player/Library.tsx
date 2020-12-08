import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image, View, Dimensions } from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Search from "../search";
import { Music } from "../../types/commons";

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
        <Text style={styles.libraryText}>
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
  /* const [musicsSearch, setMusicsSearch] = useState<Music[]>(); */

  /*   const filterMusicsBySearch = (text : string) => {
    setMusicsSearch(props.musics.filter((music) => {
      return music.name.toUpperCase().includes(text.toUpperCase())
    }))
  } */
  const [albums, setAlbums] = useState<Array<any>>([]);
  const [albumToShow, setAlbumToShow] = useState<string>("");
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
    setAlbumToShow(props.musicsSearch[0].album ? props.musicsSearch[0].album : "")
  }, [props.musicsSearch]);
  return (
    <View style={styles.background}>
      <Search musics={props.musics} setMusicsSearch={props.setMusicsSearch} />
      <ScrollView>
        <View style={styles.body}>
          {albums.map((album) => {
            return (
              <View style={styles.body}>
                <TouchableOpacity
                  style={styles.displayer}
                  onPress={() => setAlbumToShow(album === albumToShow ? "" : album)}
                >
                  <View style={styles.albumLine}>
                    <Image
                      style={styles.tinyLogo}
                      source={require("../../../assets/albumIcon.png")}
                    />
                    <Text style={styles.libraryText}>{album}</Text>
                  </View>
                </TouchableOpacity>
                <View>
                  {album === albumToShow ? <FlatList
                    style={styles.libraryMusic}
                    data={props.musicsSearch.filter((music) => {
                      return music.album === album;
                    })}
                    numColumns={1}
                    initialNumToRender={10}
                    renderItem={({ item }) => {
                      return (
                        <RenderMusicItem
                          music={item}
                          current={item.name == props.musicName ? true : false}
                          changeMusic={props.changeMusic}
                        />
                      );
                    }}
                    keyExtractor={(item) => item.uri}
                    extraData={props.musicsSearch}
                  /> : false}
                  
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
  },
  musicLineActive: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 10,
    // borderWidth: 2,
    margin: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
  },
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
  albumLine: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 10,
    // borderWidth: 2,
    margin: 10,
    borderRadius: 10,
  },
  background: {
    height: "80%",
    width: Dimensions.get("window").width,
    paddingLeft : 10,
    paddingRight : 10,
  },
  libraryText: {
    textAlign: "left",
    textTransform: "capitalize",
    flexWrap: "wrap",
    padding: 10,
    color: "white",
    marginRight: 20,
  },
  title: {
    textAlign: "center",
    textTransform: "capitalize",
    flexWrap: "wrap",
    padding: 10,
    fontSize: 20,
    color: "white",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  displayer: {
    width: "90%",
  },
  displayerAlbum: {
    margin: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "flex-start",
  },
  libraryMusic: {
    flex: 1,
  },
});

export default PlayerButton;
