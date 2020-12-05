import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import {
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Search from '../search';
import { Music } from "../../types/commons";

export type ItemProps = {
  music: Music
  index: number
  changeMusic: (music: Music, number: number) => void
}

const RenderMusicItem: React.FC<ItemProps> = (props) => {
  return (
    <TouchableOpacity
      style={styles.displayer}
      onPress={() => { props.changeMusic(props.music, props.index) }}
    >
      <View style={styles.musicLine}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
        <Text style={styles.libraryText}>
          {props.music.name.substring(
            0,
            props.music.name.lastIndexOf(".")
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export type Props = {
  musics: Music[]
  changeMusic: (music: Music, number: number) => void
};

const PlayerButton: React.FC<Props> = (props) => {
  const [musics, setMusics] = useState<Music[]>(props.musics);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setMusics(props.musics.filter((music) => {
      return music.name.toUpperCase().includes(search.toUpperCase())
    }))
  }, [props.musics])

  const filterMusicsBySearch = () => {
    setMusics(props.musics.filter((music) => {
      return music.name.toUpperCase().includes(search.toUpperCase())
    }))
  }

  return (
    <View style={styles.background}>
      <Search onSearch={(newSearch: string) => {
        setSearch(newSearch);
        filterMusicsBySearch()
      }} />
      <FlatList
        style={styles.libraryMusic}
        data={musics}
        renderItem={({item, index}) => {
          return <RenderMusicItem music={item} changeMusic={props.changeMusic} index={index}/>
        }}
        keyExtractor={item => item.uri}
        extraData={musics}
      />
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
    borderRadius: 30,
  },
  libraryText: {
    textAlign: "left",
    textTransform: "capitalize",
    flexWrap: "wrap",
    padding: 10,
    color: 'white',
    marginRight: 20,
  },
  title: {
    textAlign: "center",
    textTransform: "capitalize",
    flexWrap: "wrap",
    padding: 10,
    fontSize: 20,
    color: 'white',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  displayer: {
    width: '100%',
  },
  libraryMusic: {
    flex: 1,
  },
});

export default PlayerButton;
