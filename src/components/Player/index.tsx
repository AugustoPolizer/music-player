import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import Timer from "./timer";
import Controllers from "./controllers";
import { Music } from "../../types/commons";
import Library from "./Library";
import { Sound } from "expo-av/build/Audio";

const Player: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [currentMusic, setCurrentMusic] = useState<number>(0);
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [permission, setPermission] = useState<Audio.PermissionResponse | null>(
    null
  );
  const [musics, setMusics] = useState<Array<Music>>([
    {
      name: "",
      uri: "",
      duration: 0,
    },
  ]);
  useEffect(() => {
    Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX;
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
    timerStart();
    if (currentMusic + 1 < musics.length) {
      setCurrentMusic(currentMusic + 1);
    }
  };

  const backwardMusic = async () => {
    timerStart();
    if (currentMusic - 1 >= 0) {
      setCurrentMusic(currentMusic - 1);
    }
  };
  const formateToMinutes = (seconds: number) => {
    return String(
      (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ":" : ":0") + seconds
    );
  };

  const startMusic = async () => {
    timerStart();
    const permissionResponse = await getPermission();
    soundObject?.playAsync();
    setPaused(false);
  };
  const timerStart = async () => {
    setInterval(()=>{
      try {
        const status = (JSON.parse(String(soundObject?._lastStatusUpdate)))
        if(status.positionMillis !== NaN && status.positionMillis !== undefined){
          setCount(Math.floor(status.positionMillis/500))
        }
      } catch (error) {
        
      }
    },1000)
  };
  const pauseMusic = async () => {
    if (soundObject !== null) {
      soundObject.pauseAsync();
      setPaused(!paused);
    }
  };
 
  return (
    <ImageBackground style={styles.displayMusicContainer} source={{uri: "https://static.vecteezy.com/system/resources/previews/001/337/734/non_2x/geometric-gradient-black-background-free-vector.jpg" }}>
      <View style={styles.scrollView}>
        <Library musics={musics} />
      </View>
      <View style={styles.menus}>
        <Text style={styles.musicName}>
          {String(musics[currentMusic].name).substring(
            0,
            String(musics[currentMusic].name).lastIndexOf(".")
          )}
        </Text>
        <Timer
          currentTime={formateToMinutes(count)}
          durationTime={formateToMinutes(
            Math.floor(musics[currentMusic].duration)
          )}
        />
        <Controllers
          soundObject={soundObject}
          forwardMusic={forwardMusic}
          backwardMusic={backwardMusic}
          pauseMusic={pauseMusic}
          startMusic={startMusic}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  displayMusicContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3E4040",
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
    borderColor : 'rgb(100,100,100)'
  },
  menus: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "20%",
    width: "100%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
   
  },
});

export default Player;
