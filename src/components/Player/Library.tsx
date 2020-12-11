import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  Dimensions,
  ListViewComponent,
  ListViewBase,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Search from "../search";
import { Music } from "../../types/commons";
import { SafeAreaView } from "react-native-safe-area-context";

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
    if (props.musicsSearch.length > 0) {
      setAlbumToShow(props.musicsSearch[0].album);
    } else {
      setAlbumToShow("");
    }
  }, [props.musicsSearch]);
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.menu}>
        <Search musics={props.musics} setMusicsSearch={props.setMusicsSearch} />
        <TouchableOpacity style={styles.playListButton}>
          <Text style={styles.libraryText}>PlayList</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.libraryMusic}
        numColumns={1}
        initialNumToRender={10}
        data={albums}
        renderItem={({ item }) => (
          <View style={styles.body}>
            <TouchableOpacity
              style={styles.displayer}
              onPress={() => setAlbumToShow(item === albumToShow ? "" : item)}
            >
              <View style={styles.albumLine}>
                <Image
                  style={styles.tinyLogo}
                  source={require("../../../assets/albumIcon.png")}
                />
                <Text style={styles.libraryText}>{item}</Text>
              </View>
            </TouchableOpacity>
            <View>
              {item === albumToShow ? (
                <FlatList
                  style={styles.libraryMusic}
                  data={props.musics.filter((music) => {
                    return music.album === item;
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
                  extraData={props.musics}
                />
              ) : (
                false
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => item}
        extraData={props.musics}
      ></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menu : {
    alignItems : 'center',
    justifyContent : 'space-evenly',
    flexDirection : 'row',
  },
  playListButton: {
    flex : 1,
    textAlign: "center",
    textTransform: "capitalize",
    marginLeft: 10,
  },
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
    margin: 2,
    backgroundColor: "rgba(100,100,100,0.1)",
    borderRadius: 10,
  },
  albumLine: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 10,
    // borderWidth: 2,
    margin: 2,
    borderRadius: 10,
  },
  background: {
    height : Dimensions.get("screen").height *0.75,
    width: Dimensions.get("window").width,
    paddingLeft: 10,
    paddingRight: 10,
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
    flex : 1,
  },
});

export default PlayerButton;
