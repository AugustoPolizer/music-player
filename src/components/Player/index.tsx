import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import Controllers from "./controllers";
import { Music, Pagination } from "../../types/commons";
import Library from "./Library";
import ProgressBar from "./progressBar";

const Player: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [albums, setAlbums] = useState<Array<any>>([]);
  const [permission, setPermission] = useState<Audio.PermissionResponse | null>(
    null
  );
  const [music, setMusic] = useState<Music>({
    index: 0,
    name: "",
    album: "",
    duration: 0,
    uri: "",
  });
  const [musics, setMusics] = useState<Array<Music>>([
    {
      index: 0,
      name: "",
      album: "",
      uri: "",
      duration: 0,
    },
  ]);
  const [musicsSearch, setMusicsSearch] = useState<Array<Music>>([
    {
      index: 0,
      name: "",
      album: "",
      uri: "",
      duration: 0,
    },
  ]);
  const [paginationControll, setPaginationControll] = useState<Pagination>({
    endCursor: "",
    hasNextPage: false,
    totalCount: 0,
  });

  useEffect(() => {
    MediaLibrary.requestPermissionsAsync().then(async (permission) => {
      if (permission.granted) {
        await MediaLibrary.getAssetsAsync({
          mediaType: "audio",
        }).then(async (mediaQuery) => {
          await MediaLibrary.getAlbumsAsync().then((result) =>
            setMusics(
              mediaQuery.assets.map(
                (asset): Music => {
                  return {
                    index: parseInt(asset.id),
                    name: asset.filename,
                    album: result
                      .filter((element) => {
                        if (element.id === asset.albumId) {
                          return element.title;
                        }
                      })
                      .map((element) => {
                        return element.title;
                      })
                      .toString(),
                    uri: asset.uri,
                    duration: asset.duration,
                  };
                }
              )
            )
          );
          /*   setPaginationControll({
            endCursor: mediaQuery.endCursor,
            hasNextPage: mediaQuery.hasNextPage,
            totalCount: mediaQuery.totalCount,
          }); */
        });
      }
    });
  }, []);

  useEffect(() => {
    if (musicsSearch.length !== 0) {
      createSound(musicsSearch[0])
        .then((sound) => {
          setMusic(musicsSearch[0]);
          setSoundObject(sound);
        })
        .catch((error) => {
          setSoundObject(null);
        });
    }
  }, []);

  useEffect(() => {
    try {
      if (soundObject) {
        soundObject.playAsync();
      }
      return function cleanup() {
        if (soundObject) {
          soundObject.stopAsync();
          soundObject.unloadAsync();
        }
      };
    } catch (error) {
      alert(error);
    }
  }, [soundObject]);
  //arruma essa paginação ta travando tudo
  /*     const fetchNewMusic = () => {
    return new Promise((resolve, reject) => {
      //pra que uma Promise se ela nao da resolve
      MediaLibrary.requestPermissionsAsync().then((permission) => {
        if (permission.granted) {
          MediaLibrary.getAssetsAsync({
            mediaType: "audio",
            after: paginationControll.endCursor,
          }).then((mediaQuery) => {
            setPaginationControll({
              endCursor: mediaQuery.endCursor,
              hasNextPage: mediaQuery.hasNextPage,
              totalCount: mediaQuery.totalCount,
            });
            setMusics(
              musics.concat(
                mediaQuery.assets.map(
                  (asset): Music => {
                    return {
                      index : parseInt(asset.id),
                      name: asset.filename,
                      uri: asset.uri,
                      duration: asset.duration,
                    };
                  }
                )
              )
            );
          });
        }
      });
    });
  }; */
  const createSound = async (music: Music): Promise<Audio.Sound> => {
    const { sound, status } = await Audio.Sound.createAsync(
      { uri: music.uri },
      { progressUpdateIntervalMillis: 1000 },
      statusHandler
    );
    return sound;
  };

  const changeMusic = (index: number) => {
    const song =
      musicsSearch[musicsSearch.findIndex((songs) => songs.index === index)];
    setMusic(song);
    createSound(song)
      .then((sound) => {
        setSoundObject(sound);
      })
      .catch((error) => {
        setSoundObject(null);
      });
  };

  const changeMusicTime = (position: number) => {
    soundObject?.setPositionAsync(position);
  };

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
    /*  forwardMusic() */
    /*        if (paginationControll.hasNextPage) {
          fetchNewMusic();
        } */
  };

  const forwardMusic = () => {
    if (
      musicsSearch[
        musicsSearch.findIndex((songs) => songs.index === music.index) + 1
      ]
    ) {
      changeMusic(
        musicsSearch[
          musicsSearch.findIndex((songs) => songs.index === music.index) + 1
        ].index
      );
    } else {
      /*  if (paginationControll.hasNextPage) {
          fetchNewMusic();
        } */
      changeMusic(musicsSearch[0].index);
    }
  };

  const backwardMusic = () => {
    if (
      musicsSearch.findIndex((songs) => songs.index === music.index) - 1 >=
      0
    ) {
      changeMusic(
        musicsSearch[
          musicsSearch.findIndex((songs) => songs.index === music.index) - 1
        ].index
      );
    } else {
      changeMusic(musicsSearch[musicsSearch.length - 1].index);
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
        const params = JSON.parse(String(soundObject?._lastStatusUpdate));
        if (
          params.positionMillis !== NaN &&
          params.positionMillis !== undefined
        ) {
          setCount(Math.floor(params.positionMillis / 1000));
          if (
            Math.floor(params.positionMillis / 1000) ===
            Math.floor(music.duration)
          ) {
            forwardMusic();
          }
        }
      } catch (error) {}
    }, 500);
  };

  const pauseMusic = async () => {
    if (soundObject !== null) {
      soundObject.pauseAsync();
      setPaused(!paused);
    }
  };

  return (
    <View style={styles.body}>
      <ImageBackground
        style={styles.displayMusicContainer}
        source={require("../../../assets/background.png")}
      >
        <View style={styles.library}>
          <Library
            setMusicsSearch={setMusicsSearch}
            musicsSearch={musicsSearch}
            musics={musics}
            changeMusic={changeMusic}
            musicName={music.name}
          />
            <View style={styles.menus}>
              <Text style={styles.musicName}>
                {music.name.substring(0, music.name.lastIndexOf("."))} -{" "}
                {music.album}
              </Text>
              <ProgressBar
                changeMusicTime={changeMusicTime}
                currentTime={count}
                durationTime={Math.floor(music.duration)}
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  library: {
    flexGrow: 5,
  },
  displayMusicContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#3E4040",
  },

  musicName: {
    color: "white",
    textTransform: "capitalize",
    flexWrap: "wrap",
    margin: 10,
  },
  menus: {
    flex: 1,
    position: "relative",
    backgroundColor: "black",
    borderTopColor: "white",
    borderTopWidth: 2,
    alignItems : 'center',
    justifyContent : 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Player;
