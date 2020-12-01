import React from 'react';
import Player  from '../../components/Player'
import { Dimensions, StyleSheet, View} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatckNavigatorParamList } from '../../types/navigation'
import { ScrollView } from 'react-native-gesture-handler';

type HomeScrennNavigator = StackNavigationProp<
  StatckNavigatorParamList,
  'Home'
>;

export type Props = {
  navigation: HomeScrennNavigator
}

const Home: React.FC<Props> = ({ navigation }) => {

  return(
    <ScrollView >
      <View style={styles.playerContainer}>
        <Player ></Player>
      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  playerContainer: {
    height : Dimensions.get('window').height,
    width : Dimensions.get('window').width,
    paddingTop : 24,
  }
});

export default Home;