import 'react-native-gesture-handler';
import React from 'react';
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
  
  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}



export default App;

