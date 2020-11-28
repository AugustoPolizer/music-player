import React, {useState} from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {StatckNavigatorParamList} from '../../types/navigation'

type HomeScrennNavigator = StackNavigationProp<
  StatckNavigatorParamList,
  'Playlists'
>;

export type PlayList = {
  name: string,
}

export type Props = {
  navigation: HomeScrennNavigator
}

const Playlists: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>
        PlayLists
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default Playlists;