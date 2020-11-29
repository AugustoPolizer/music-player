import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { PermissionResponse } from "expo-media-library";
import * as MediaLibrary from "expo-media-library";
import { Music } from "../../types/commons";
import Timer from "./timer";
import PlayerButton from './playerButton'

const Player: React.FC = () => {
  const [currentMusic, setCurrentMusic] = useState<number>(0);
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);
  const [permission, setPermission] = useState<PermissionResponse | null>(null);
  const [musics, setMusics] = useState<Array<Music>>([{
    name: "",
    uri: "",
    duration: 0
  }]);

  useEffect(() => {
    MediaLibrary.requestPermissionsAsync().then((permission) => {
      if (permission.granted) {
        MediaLibrary.getAssetsAsync({
          mediaType: "audio",
        }).then((mediaQuery) => {
          setMusics(mediaQuery.assets.map((asset): Music => {
            return {
              name: asset.filename,
              uri: asset.uri,
              duration: asset.duration,
            };
          })
          );
        });
      }
      alert(soundObject)
    });
  }, []);

  const statusHandler = (status: any) => {
    if (status.didJustFinish) {
      if (currentMusic + 1 < musics.length) {
        setCurrentMusic(currentMusic + 1);
        startMusic();
      } else {
        setSoundObject(null);
      }
    }
  };

  const createMusic = async (music: Music) => {
    const { sound, status } = await Audio.Sound.createAsync(
      { uri: music.uri },
      { progressUpdateIntervalMillis: 1000 }
    );
    sound.setOnPlaybackStatusUpdate(statusHandler);
    return sound;
  }

  const startMusic = async () => {
    const permissionResponse = await getPermission();
    if (permissionResponse.granted) {
      if(soundObject === null){
        const sound = await createMusic(musics[currentMusic]);
        setSoundObject(sound);
        sound.playAsync();
      } else {
        soundObject.playAsync();
      }
    }
  };

  const pauseMusic = async () => {
    if (soundObject !== null) {
      soundObject.pauseAsync();
    }
  }

  const fowardMusic = () => {
    if(currentMusic + 1 < musics.length){
      if(soundObject !== null) {
        soundObject.stopAsync()
        .then(() => {
          setSoundObject(null);
          setCurrentMusic(currentMusic + 1);
          alert(currentMusic)
          startMusic();
        })
        .catch(error => {
          alert(error)
        })
      } else {
        setCurrentMusic(currentMusic + 1);
        startMusic();
      }
    }
  }

  const backwardMusic = () => {
    if(currentMusic - 1 >= 0){
      if(soundObject !== null) {
        soundObject.stopAsync()
        .then(() => {
          setSoundObject(null);
          setCurrentMusic(currentMusic - 1);
          alert(currentMusic)
          startMusic();
        })
        .catch(error => {
          alert(error)
        })
      } else {
        setCurrentMusic(currentMusic - 1);
        startMusic();
      }
    }
  }

  

  const getPermission = (): Promise<PermissionResponse> => {
    return new Promise<PermissionResponse>((resolve, reject) => {
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

  return (
    <View style={styles.displayMusicContainer}>
      <Text style={styles.musicName}>{musics[currentMusic].name}</Text>
      <View style={styles.buttonsContainer}>
        <PlayerButton text="play" onClick={startMusic} />
        <PlayerButton text="pause" onClick={pauseMusic} />
        <PlayerButton text="foward" onClick={fowardMusic}/>
        <PlayerButton text="backward" onClick={backwardMusic}/>
        <Timer
          currentTime={100}
          duration={1000}
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
    margin: 10,
  },

  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  musicName: {
    fontSize: 20
  },
});

export default Player;
