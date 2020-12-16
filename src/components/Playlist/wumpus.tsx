import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";

export type Props = {};

const Playlist: React.FC<Props> = (props) => {
  return (
    <View style={styles.wupusPlaylist}>
      <Image
        style={styles.imageWumpus}
        resizeMode={"contain"}
        resizeMethod={"scale"}
        width={50}
        height={50}
        source={require("../../../assets/wumpus.gif")}
      />
      <Text>There isn't nothing to Wumpus hear here.</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  wupusPlaylist: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageWumpus: {
    alignItems: "center",
    justifyContent: "center",
    width: 220,
    height: 220,
  },
});

export default Playlist;
