import React from 'react';
import { FlatList, StyleSheet } from 'react-native'
import MusicItem from './MusicItem';
import { Music } from '../../types/commons'

export type Props = {
  queue: Array<Music>
}

const MusicQueue: React.FC<Props> = (props) => {

  return (
    <FlatList
      data={props.queue} 
      renderItem={({item}) => <MusicItem music={item}/>}
      keyExtractor={(item) => item.uri}
      extraData={props.queue}
    />
  )
}

const styles = StyleSheet.create({

});

export default MusicQueue;