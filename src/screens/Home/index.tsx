import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {StatckNavigatorParamList} from '../../types/navigation'
import {PlayList} from '../../types/commons'

type HomeScrennNavigator = StackNavigationProp<
  StatckNavigatorParamList,
  'Home'
>;

export type Props = {
  navigation: HomeScrennNavigator
}

const Home: React.FC<Props> = ({ navigation }) => {
  const [playLists, setPlayLists] = useState<Array<PlayList>>([])

  return (
    <View>
      <Text> Home</Text>
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