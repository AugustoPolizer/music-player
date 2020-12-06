import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, TextInputComponent } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Music } from '../types/commons';

export type Props = {
  musics : Music[]
  setMusicsSearch : Function
}

const searcher = (text : string,fn : Function,musics : Music[])=>{
  fn(musics.filter((music) => {
    return music.name.toUpperCase().includes(text.toUpperCase())
  }))
}

const Search: React.FC<Props> = (props) => {
  const [textInput, setTextInput] = useState<TextInput>();
  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity onPress={() => {
        if (textInput)
          textInput.focus();
      }}>
        <Icon name="search" size={20} color="white" />
      </TouchableOpacity>
      <TextInput
        onChangeText={(text)=>{searcher(text,props.setMusicsSearch,props.musics)}}
        style={styles.searchInput}
        ref={(input) => {
          if (input)
            setTextInput(input)
        }}
        placeholder="Search"
        placeholderTextColor="white"
      />


    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    paddingBottom: 10
  },
  searchInput: {
    textAlign: "center",
    width: "90%",
    marginLeft: 10,
    backgroundColor: "rgba(100,100,100,0.1)",
    borderRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    color: "white",
  },
})


export default Search;