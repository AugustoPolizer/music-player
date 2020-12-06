import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import Controllers from "./controllers";
import { Music, Pagination } from "../../types/commons";
import Library from "./Library";
import ProgressBar from "./progressBar";



const Player: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [currentMusic, setCurrentMusic] = useState<number>(0);
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [permission, setPermission] = useState<Audio.PermissionResponse | null>(
    null
  );
  const [music, setMusic] = useState<Music>({
    name: "",
    duration: 0,
    uri: ""
  })
  const [musics, setMusics] = useState<Array<Music>>([
    {
      name: "",
      uri: "",
      duration: 0,
    },
  ]);
  const [paginationControll, setPaginationControll] = useState<Pagination>(
    {
      endCursor: "",
      hasNextPage: false,
      totalCount: 0
    }
  )

  useEffect(() => {
    MediaLibrary.requestPermissionsAsync().then((permission) => {
      if (permission.granted) {
        MediaLibrary.getAssetsAsync({
          mediaType: "audio",
        }).then((mediaQuery) => {
          setPaginationControll({
            endCursor: mediaQuery.endCursor,
            hasNextPage: mediaQuery.hasNextPage,
            totalCount: mediaQuery.totalCount
          })
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
      createSound(musics[currentMusic])
        .then((sound) => {
          setMusic(musics[currentMusic])
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

  const fetchNewMusic = () => {
    return new Promise((resolve, reject) => {
      //pra que uma Promise se ela nao da resolve
      MediaLibrary.requestPermissionsAsync().then((permission) => {
        if (permission.granted) {
          MediaLibrary.getAssetsAsync({
            mediaType: "audio",
            after: paginationControll.endCursor
          }).then((mediaQuery) => {
            setPaginationControll({
              endCursor: mediaQuery.endCursor,
              hasNextPage: mediaQuery.hasNextPage,
              totalCount: mediaQuery.totalCount
            })
            setMusics(musics.concat(
              mediaQuery.assets.map(
                (asset): Music => {
                  return {
                    name: asset.filename,
                    uri: asset.uri,
                    duration: asset.duration,
                  };
                }
              ))
            );
          });
        }
      });
    })
  }

  const changeMusic = (music: Music, index: number) => {
    createSound(music)
      .then((sound) => {
        setCurrentMusic(index)
        setSoundObject(sound);
        setMusic(music);
      })
      .catch((error) => {
        setSoundObject(null);
      });
  };

  const changeMusicTime = (position: number) => {
    soundObject?.setPositionAsync(position)
  }

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
    if (status.didJustFinish) {
      if (currentMusic + 1 < musics.length) {
        changeMusic(musics[currentMusic + 1], currentMusic + 1)
      } else {
        if (paginationControll.hasNextPage) {
          fetchNewMusic();
        }
        else {
          changeMusic(musics[0], 0)
        }
      }
    }
  };

  const createSound = async (music: Music): Promise<Audio.Sound> => {
    const { sound, status } = await Audio.Sound.createAsync(
      { uri: music.uri },
      { progressUpdateIntervalMillis: 1000 },
      statusHandler
    );
    return sound;
  };

  const forwardMusic = () => {
    if (currentMusic + 1 < musics.length) {
      changeMusic(musics[currentMusic + 1], currentMusic + 1)
    } else {
    /*   if (paginationControll.hasNextPage) {
        fetchNewMusic();
      } */
        changeMusic(musics[0], 0)
    }
  };

  const backwardMusic = () => {
    if (currentMusic - 1 >= 0) {
      changeMusic(musics[currentMusic - 1], currentMusic - 1)
    } else {
      changeMusic(musics[musics.length - 1], musics.length - 1)
    }

  };

  const startMusic = async () => {
    timerStart();
    const permissionResponse = await getPermission();
    soundObject?.playAsync();
    setPaused(false);
  };

  const timerStart = async () => {
    setInterval(() => {
      try {
        const status = JSON.parse(String(soundObject?._lastStatusUpdate));
        if (
          status.positionMillis !== NaN &&
          status.positionMillis !== undefined
        ) {
          setCount(Math.floor(status.positionMillis / 1000));
          if(count == Math.floor(musics[currentMusic].duration)){
            forwardMusic()
          }
        }
      } catch (error) { }
    }, 500);
  };

  const pauseMusic = async () => {
    if (soundObject !== null) {
      soundObject.pauseAsync();
      setPaused(!paused);
    }
  };

  return (
    <View>
      <ImageBackground
        style={styles.displayMusicContainer}
        source={require("../../../assets/background.png")}
      >
        <View style={styles.scrollView}>
          <Library musics={musics} changeMusic={changeMusic} musicName={musics[currentMusic].name}/>
        </View>
      </ImageBackground>
      <View style={styles.menus}>
        <Text style={styles.musicName}>
          {music.name.substring(0, music.name.lastIndexOf("."))}
        </Text>
        <ProgressBar changeMusicTime={changeMusicTime} currentTime={count} durationTime={Math.floor(music.duration)} />
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
    backgroundColor: "#3E4040",
  },

  musicName: {
    color: "white",
    textTransform: "capitalize",
    flexWrap: "wrap",
    margin: 10,
  },
  scrollView: {
    width: "90%",
    height: "80%",
    borderColor: "rgb(100,100,100)",
  },
  menus: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "20%",
    width: "100%",
    backgroundColor: "black",
    borderTopColor: "white",
    borderTopWidth: 2,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Player;