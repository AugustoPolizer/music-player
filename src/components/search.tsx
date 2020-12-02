import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export type Props = {
  onSearch: (newSearch: string) => void
}

const Search: React.FC<Props> = (props) => {

  return (
    <TextInput
      onChangeText={props.onSearch}
      style={styles.searchInput}
      placeholder={"Search"}
    />
  )
}

const styles = StyleSheet.create({
  searchInput: {
    width: "95%",
    height: 40,
    textAlign: "center",
    borderRadius: 20,
    backgroundColor: "white",
    marginBottom: 20,
  },
})


export default Search;