import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export type Props = {
  onSearch: (newSearch: string) => void
}

const Search: React.FC<Props> = (props) => {
  const [isSearching, setIsSearching] = useState<Boolean>(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setIsSearching(true)}>
        <Icon name="search" size={20} color="white" />
      </TouchableOpacity>
      {isSearching &&
        <TextInput
          onChangeText={props.onSearch}
          style={styles.searchInput}
        />
      }

    </View>
  )
}

const styles = StyleSheet.create({
  searchInput: {
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    color: "white"
  },
})


export default Search;