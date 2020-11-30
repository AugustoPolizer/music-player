import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import Timer from "./timer";
import Controllers from "./controllers";
import { Music } from "../../types/commons";
import Library from "./Library";

const Player: React.FC = () => {
  const [currentMusic, setCurrentMusic] = useState<number>(0);
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [permission, setPermission] = useState<Audio.PermissionResponse | null>(null);
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

  const getPermission = (): Promise<Audio.PermissionResponse> => {
    return new Promise<Audio.PermissionResponse>((resolve, reject) => {
      if (permission === null) {
        Audio.getPermissionsAsync()
          .then((response) => {
            setPermission(response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve(permission);
      }
    });
  };


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

  const startMusic = async () => {
    const permissionResponse = await getPermission();
    if (permissionResponse.granted) {
      if (soundObject !== null) {
        soundObject.playAsync();
        setPaused(false)
      }
    }
  };

  const pauseMusic = async () => {
    if (soundObject !== null) {
      soundObject.pauseAsync();
      setPaused(true);
    }
  }

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
        <Timer 
          duration={musics[currentMusic].duration} 
          paused={paused}  
        />
        <Controllers
          soundObject={soundObject}
          forwardMusic={forwardMusic}
          backwardMusic={backwardMusic}
          pauseMusic={pauseMusic}
          startMusic={startMusic}
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
