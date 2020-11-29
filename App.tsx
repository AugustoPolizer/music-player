import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';
import { Home, } from './src/screens';
import { StatckNavigatorParamList } from './src/types/navigation';

Audio.setAudioModeAsync({
  staysActiveInBackground: true
})

const Stack = createStackNavigator<StatckNavigatorParamList>();

const App: React.FC<{}> = () => {
  // TODO: Checar se não é possível implementar isso de uma forma melhor
  
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;

