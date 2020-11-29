import React from 'react';
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
      <Text> Home</Text>
      <Button
        title="Tocar músicas"
        onPress={() => navigation.navigate('Play')}
      />
      <Button
        title="Criar playlist"
        onPress={() => navigation.navigate('Playlists')}
      />
    </View>
  )
}

const styles = StyleSheet.create({

});

export default Home;