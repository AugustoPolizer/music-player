import React from "react";
import Player from "../../components/Player";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatckNavigatorParamList } from "../../types/navigation";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

type HomeScrennNavigator = StackNavigationProp<
  StatckNavigatorParamList,
  "Home"
>;

export type Props = {
  navigation: HomeScrennNavigator;
};

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.playerContainer}>
      <SafeAreaView style={styles.playerContainer}>
        <Player></Player>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  textLibrary: {
    color: "white",
    flex: 1,
  },
  playerContainer: {
    height : Dimensions.get('screen').height,
    width : Dimensions.get('screen').width,
  },
});

export default Home;
