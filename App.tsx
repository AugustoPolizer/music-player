import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Text } from 'react-native';

export default function App() {
  const renderItem = ({ item } : {item: {key: string}}) => {
    return (
      <TouchableOpacity onPress={() => alert('You tapped the button')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}> {item.key} </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        data={[
            { key: 'Augusto' },
            { key: 'Bruno' },
            { key: 'Gabrielle' },
            { key: 'Polizer'}
          ]}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white'
  }
});
