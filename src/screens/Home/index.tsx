import React from 'react';
import Player  from '../../components/Player'
import { StyleSheet, View} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatckNavigatorParamList } from '../../types/navigation'

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
      <Player></Player>
    </View>
  )
}

const styles = StyleSheet.create({
  playerContainer: {
    paddingTop: 50
  }
});

export default Home;