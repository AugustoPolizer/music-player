import React from 'react';
import Player from '../../components/Player'
import { Dimensions, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatckNavigatorParamList } from '../../types/navigation'
import { StatusBar } from 'expo-status-bar';

type HomeScrennNavigator = StackNavigationProp<
  StatckNavigatorParamList,
  'Home'
>;

export type Props = {
  navigation: HomeScrennNavigator
}

const Home: React.FC<Props> = ({ navigation }) => {

  return (
    <View style={styles.playerContainer}>
      <StatusBar style="light" />
      <Player ></Player>
    </View>
  )
}

const styles = StyleSheet.create({
  playerContainer: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  }
});

export default Home;