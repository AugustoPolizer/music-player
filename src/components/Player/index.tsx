import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import Timer from "./timer";
import Controllers from "./controllers";
import { Music } from "../../types/commons";
import Library from "./Library";
import Swipeable from "react-native-gesture-handler/Swipeable";

const Player: React.FC = () => {
  const [currentMusic, setCurrentMusic] = useState<number>(0);
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);
  const [musics, setMusics] = useState<Array<Music>>([
    {
      name: "",
      uri: "",
      duration: 0,
    },
  ]);

  useEffect(() => {
    MediaLibrary.requestPermissionsAsync().then((permission) => {
      if (permission.granted) {
        MediaLibrary.getAssetsAsync({
          mediaType: "audio",
        }).then((mediaQuery) => {
          setMusics(
            mediaQuery.assets.map(
              (asset): Music => {
                return {
                  name: asset.filename,
                  uri: asset.uri,
                  duration: asset.duration,
                };
              }
            )
          );
        });
      }
    });
  }, []);

  useEffect(() => {
    if (musics.length !== 0) {
      createSound(musics[0])
        .then((sound) => {
          setSoundObject(sound);
        })
        .catch((error) => {
          setSoundObject(null);
        });
    }
  }, [musics]);

  useEffect(() => {
    if (soundObject) {
      soundObject.playAsync();
    }
    return function cleanup() {
      if (soundObject) {
        soundObject.stopAsync();
        soundObject.unloadAsync();
      }
    };
  }, [soundObject]);

  useEffect(() => {
    createSound(musics[currentMusic])
      .then((sound) => {
        setSoundObject(sound);
      })
      .catch((error) => {
        setSoundObject(null);
      });
  }, [currentMusic]);

  const statusHandler = (status: any) => {
    if (status.didJustFinish && currentMusic + 1 < musics.length) {
      setCurrentMusic(currentMusic + 1);
    }
  };

  const createSound = async (music: Music) => {
    const { sound, status } = await Audio.Sound.createAsync(
      { uri: music.uri },
      { progressUpdateIntervalMillis: 1000 },
      statusHandler
    );
    return sound;
  };

  const forwardMusic = async () => {
    if (currentMusic + 1 < musics.length) {
      setCurrentMusic(currentMusic + 1);
    }
  };

  const backwardMusic = async () => {
    if (currentMusic - 1 >= 0) {
      setCurrentMusic(currentMusic - 1);
    }
  };

  const formatMusicName = (name: string) => {
    return name.substring(0, name.lastIndexOf("."));
  };

  return (
    <View style={styles.displayMusicContainer}>
      <View style={styles.scrollView}>
        <Library musics={musics} />
      </View>
      <View style={styles.menus}>
        <Text style={styles.musicName}>
          {formatMusicName(musics[currentMusic].name)}
        </Text>
        <Timer duration={musics[currentMusic].duration} />
        <Controllers
          soundObject={soundObject}
          forwardMusic={forwardMusic}
          backwardMusic={backwardMusic}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  displayMusicContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingTop: 20,
  },

  musicName: {
    fontSize: 20,
    color: "white",
    textTransform: "capitalize",
    borderBottomWidth: 2,
    borderColor: "white",
  },
  scrollView: {
    borderWidth: 2,
    width: "90%",
    borderRadius: 10,
    height: "80%",
    backgroundColor: "white",
  },
  menus: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "20%",
    width: "100%",
  },
});

export default Player;
