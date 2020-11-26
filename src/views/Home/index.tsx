import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Home() {
  return (
    <Text style={styles.helloMsg}>
      Home
    </Text>
  )
}

const styles = StyleSheet.create({
  helloMsg: {
    color: "orange"
  }
});