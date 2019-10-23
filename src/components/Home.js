import React, {PureComponent} from 'react';
import { Text, View, TouchableOpacity, SectionList, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { onCreateContact, getContact, onSearchChange, searchContact, clear } from '../models/Home/homeAction';
import { bindActionCreators } from 'redux';


const DATA = [];

const mapStateToProps = state => {
    return { 
            data: state.homeReducer.data,
            error:state.homeReducer.error,
          isLoading: state.homeReducer.isLoading,
           search: state.homeReducer.search,
        }
  }
  
   mapDispatchToProps = dispatch => {
    return {
      ...bindActionCreators({ onCreateContact, getContact, onSearchChange, searchContact, clear }, dispatch)
  };
  }

export class Home extends PureComponent {

  // constructor() {
  // }

  componentWillMount() {
    this.props.getContact();
    
  }

  // componentDidMount() {
  //   for(let i = 65; i <= 90; i++){
  //     let item = {
  //       title: String.fromCharCode(i),
  //       data: this.filter(String.fromCharCode(i))
  //     }
  //    DATA.push(item);
  //    }
  // }

  componentWillReceiveProps(nextProps) {
    if(this.props.search !== nextProps.search) {
      console.log('search ==>', nextProps.search);
       if(nextProps.search.length == " ") {
        console.log('getContact');
         this.props.getContact();
       } else {
        console.log('searchContact');
      this.props.searchContact(nextProps.search)
       }
    }
  }

renderHeader() {
    return(
     <View style={{ justifyContent: 'space-between', alignItems: 'center', height: 80, flexDirection: 'row', marginHorizontal: 10}}> 
        <Text style={{ fontSize: 28, color: 'black', fontWeight: 'bold', fontFamily: 'Arial'}}>Contacts</Text>
        <TouchableOpacity
        onPress={() => this.props.navigation.navigate('CreateContact')}
        >
            <Text style={{ fontSize: 12, color: 'black'}}>Create Contact</Text>
        </TouchableOpacity>
     </View>
    );
}

 filter(letter) {
  var filteredNames = this.props.data.filter(item => {
     return item.first_name.charAt(0) === letter;
  });
  return filteredNames;
}

onChangeText(text) {

this.props.onSearchChange(text);

}

renderSearch() {
return (
<View style={{ marginTop: 10, width: '90%', marginLeft: '5%', borderRadius: 16, borderWidth: 1, height: 40 }}>
<TextInput
    placeholder={'Search'}
    placeholderTextColor={'#A9A9A9'}
    style={{ color: 'grey', fontSize: 14, marginLeft: 15, width: '90%', height: 45, marginLeft: '5%' }}
    returnKeyType='next'
    //onFocus={() => this.navigationMethod()}
    //ref={(input) => { this.searchText = input; }}
     onChangeText={(text) => this.onChangeText(text)}
    value={this.props.search}
    underlineColorAndroid='transparent'
    />
</View>
);
}

renderContacts() {

const DATA = [
  {
    title: 'A',
    data:  this.filter('A'),
  },
  {
    title: 'B',
    data: this.filter('B'),
  },
  {
    title: 'C',
    data: this.filter('C'),
  },
  {
    title: 'D',
    data: this.filter('D'),
  },
  {
    title: 'E',
    data: this.filter('E'),
  },
  {
    title: 'F',
    data: this.filter('F'),
  },
  {
    title: 'G',
    data: this.filter('G'),
  },
  {
    title: 'H',
    data: this.filter('H'),
  },
  {
    title: 'I',
    data: this.filter('I'),
  },
  {
    title: 'J',
    data: this.filter('J'),
  },
  {
    title: 'K',
    data: this.filter('K'),
  },
  {
    title: 'L',
    data: this.filter('L'),
  },
  {
    title: 'M',
    data: this.filter('M'),
  },
  {
    title: 'N',
    data: this.filter('N'),
  },
  {
    title: 'O',
    data: this.filter('O'),
  },
  {
    title: 'P',
    data: this.filter('P'),
  },
  {
    title: 'Q',
    data: this.filter('Q'),
  },
  {
    title: 'R',
    data: this.filter('R'),
  },
  {
    title: 'S',
    data: this.filter('S'),
  },
  {
    title: 'T',
    data: this.filter('T'),
  },
  {
    title: 'U',
    data: this.filter('U'),
  }, {
    title: 'V',
    data: this.filter('V'),
  },
  {
    title: 'W',
    data: this.filter('W'),
  },
  {
    title: 'X',
    data: this.filter('X'),
  },
  {
    title: 'Y',
    data: this.filter('Y'),
  },
  {
    title: 'Z',
    data: this.filter('Z'),
  },
];
console.log('DATA==>', DATA);
return (
<View style={{ marginTop: Platform.OS == 'ios' ? 20 : 20, height: '80%' }}>
<SectionList
 ItemSeparatorComponent={this.FlatListItemSeparator}
sections={DATA}
 renderSectionHeader={({ section }) => (
   section.data.length>0?<Text style={styles.SectionHeaderStyle}> {section.title} </Text>:null
 )}
 renderItem={({ item }) => (
   // Single Comes here which will be repeatative for the FlatListItems
   <Text
     style={styles.SectionListItemStyle}
     onPress={this.navigateToDetail.bind(this, item)}
    >
     {item.first_name}
   </Text>
 )}
 ItemSeparatorComponent={this.renderItemSeparator}
 keyExtractor={(item, index) => index}
/>
</View>
  );
}

renderItemSeparator() {
  return (
  <View style={{ height: 1, backgroundColor: '#DCDCDC'}}/>
  );
}

navigateToDetail(item) {
  this.props.navigation.navigate('ContactDetail', {
    data: item,
  })
}


render() {
    console.log('data=>', this.props.data);
  
    return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {this.renderHeader()}
   
      {this.props.isLoading
      ?
      <View />
      :
      <View>
      {this.renderSearch()}
      {this.renderContacts()}
      </View>
      }
     <View style={{ height: 100}} />
    </View>
    );
}
}

const styles = StyleSheet.create({
  SectionHeaderStyle: {
    backgroundColor: '#DCDCDC',
    fontSize: 12,
    padding: 5,
    color: '#fff',
  },
  SectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: '#000',
    backgroundColor: '#F5F5F5',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);