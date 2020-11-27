import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native'

export interface Props {
  queue: Array<Music>;
}

const MusicQueue: React.FC<Props> = (props) => {
  
  return (
    <FlatList
      data={props.queue} 
      renderItem={({item}) => <Text> { item.name } </Text>}
      keyExtractor={(item) => item.uri}
      extraData={props.queue}
    />
  )
}

const styles = StyleSheet.create({

});

export default MusicQueue;