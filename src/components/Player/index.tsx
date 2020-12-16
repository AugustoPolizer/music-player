import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import Controllers from "./controllers";
import { Music } from "../../types/commons";
import Library from "../Playlist/library";
import ProgressBar from "./progressBar";
import { LogBox } from 'react-native';

const Player: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [soundObject, setSoundObject] = useState(new Audio.Sound());
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
  useEffect(() => {
    LogBox.ignoreAllLogs();
    musics.splice(0, musics.length);
    MediaLibrary.requestPermissionsAsync().then(async (permission) => {
      if (permission.granted) {
        await query("0");
      }
    });
  }, []);

  function priority(opt: any) {
    if (!(opt instanceof Array)) {
      opt = Array.prototype.slice.call(arguments);
    }
    return function (a: any, b: any) {
      for (var i = 0; i < opt.length; ++i) {
        var option = opt[i];
        if (typeof option === "string") {
          option = [option, "+"];
        }
        if (option.length < 2) {
          option[1] = "+";
        }
        if (a[option[0]] !== b[option[0]]) {
          if (a[option[0]] === undefined) return 1;
          if (b[option[0]] === undefined) return -1;
          if (
            typeof a[option[0]] === "string" ||
            typeof b[option[0]] === "string"
          ) {
            return (
              option[1] === "+"
                ? String(a[option[0]]).toLowerCase() <
                  String(b[option[0]]).toLowerCase()
                : String(a[option[0]]).toLowerCase() >
                  String(b[option[0]]).toLowerCase()
            )
              ? -1
              : 1;
          } else {
            return (
              option[1] === "+"
                ? a[option[0]] < b[option[0]]
                : a[option[0]] > b[option[0]]
            )
              ? -1
              : 1;
          }
        }
      }
      return 0;
    };
  }

  const query = async (after: string) => {
    await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      after,
    }).then((result) => {
      result.assets.forEach(async (assets) => {
        await MediaLibrary.getAlbumsAsync().then((result) =>
          result.filter((e) => {
            e.id === assets.albumId
              ? musics.push({
                  index: parseInt(assets.id),
                  name: assets.filename,
                  album: e.title,
                  uri: assets.uri,
                  duration: assets.duration,
                })
              : false;
          })
        );
      });
      result.totalCount != musics.length
        ? query(result.endCursor)
        : setMusics([
            ...musics.sort(priority(["album", "name", ["name", "-"]])),
          ]);
    });
  };

  const createSound = async (music: Music) => {
    await Audio.Sound.createAsync(
      { uri: music.uri },
      { progressUpdateIntervalMillis: 1000 },
    ).then(result=>setSoundObject(result.sound)).catch(alert);
  };
  const playMusic = () => {
    try {
      if (soundObject) {
        soundObject.playAsync();
      }
    } catch (error) {
      alert(error);
    }
  };
  const stopAllMusic = () => {
    try {
      if (soundObject) {
        soundObject.stopAsync();
        soundObject.unloadAsync();
      }
    } catch (error) {
      alert(error);
    }
  };

  const changeMusic = async(index: number) => {
    const song =
      musicsSearch[musicsSearch.findIndex((songs) => songs.index === index)];
    setMusic(song);
    await createSound(song)
      .catch((error) => alert(error))
      .then(stopAllMusic)
      .then(playMusic)
      .catch((error) => {
        alert(error);
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

  const statusHandler = () => {
  };

  const forwardMusic = () => {
    if (
      musicsSearch.findIndex((songs) => songs.index === music.index) + 1 >=
      0
    ) {
      changeMusic(
        musicsSearch[
          musicsSearch.findIndex((songs) => songs.index === music.index) + 1
        ].index
      );
    } else {
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
    }
  };

  return (
    <View style={styles.body}>
      {/*   <ImageBackground
        style={styles.displayMusicContainer}
        source={require("../../../assets/background.png")}
      > */}
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
      {/*  </ImageBackground> */}
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
    textTransform: "capitalize",
    flexWrap: "wrap",
    margin: 10,
    color: "white",
  },
  menus: {
    flex: 1,
    position: "relative",
    backgroundColor: "#575758",
    borderTopColor: "white",
    borderTopWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Player;
