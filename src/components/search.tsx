import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, TextInputComponent } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Music } from '../types/commons';

export type Props = {
  setTextForSearch : Function
}


const Search: React.FC<Props> = (props) => {
  const [textInput, setTextInput] = useState<TextInput>();
  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity onPress={() => {
        if (textInput)
          textInput.focus();
      }}>
        <Icon name="search" size={20} color="black" />
      </TouchableOpacity>
      <TextInput
        onChangeText={(text)=>{props.setTextForSearch(text)}}
        style={styles.searchInput}
        ref={(input) => {
          if (input)
            setTextInput(input)
        }}
        placeholder="Search"
        placeholderTextColor="black"
      />


    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flex : 1,
    flexDirection: "row",
    paddingBottom: 10
  },
  searchInput: {
    textAlign: "center",
    width : '95%',
    marginLeft: 10,
    backgroundColor: "rgba(100,100,100,0.1)",
    borderRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    color: "black",
  },
})


export default Search;