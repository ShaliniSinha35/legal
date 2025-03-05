import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { View,Text } from 'react-native';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (

    <View style={{padding:15}}>
  <Searchbar
      placeholder="Search by CNR number"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={{backgroundColor:'#f0f0f0'}}
    />
    </View>
  
  );
};

export default SearchBar;
