import * as React from 'react';
import {StyleSheet} from 'react-native'
import { Searchbar } from 'react-native-paper';

class Search extends React.Component {
  state = {
    searchQuery: '',
  };

  _onChangeSearch = query => {
    this.setState({ searchQuery: query });
    console.log(query);
  }

  render() {
    const { searchQuery } = this.state;
    return (
      <Searchbar
        placeholder="Search"
        onChangeText={this._onChangeSearch}
        value={searchQuery}
        style={styles.search}
      />
    );
  }
}
const styles = StyleSheet.create({
    search:{
        marginLeft:'3%',
        marginRight:'3%'
    }
});
export default Search;