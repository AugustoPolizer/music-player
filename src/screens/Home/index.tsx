import React from 'react';
import Player  from '../../components/Player'
import { StyleSheet, Text, View, Button } from 'react-native';
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
    <View>
      <Player></Player>
    </View>
  )
}

const styles = StyleSheet.create({

});

export default Home;