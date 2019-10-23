import React, {PureComponent} from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { onCreateContact, onFirstNameChange, onLastNameChange, onPhoneNumberChange,
         onAlternateNumberChange, onAddressChange, onEmailChange, clear } from '../models/Home/homeAction';
import { bindActionCreators } from 'redux';
import { getPrimaryId } from './../database/homeSchema';
import { BACK } from '../image'

//const fields = [ 'First Name', 'Last Name', 'Phone Number', 'Alternate Number', 'Email', 'Address'];
 


const mapStateToProps = state => {
    return { 
            data: state.homeReducer.data,
            error:state.homeReducer.error,
            firstname: state.homeReducer.firstname,
            lastname: state.homeReducer.lastname,
            contactno: state.homeReducer.contactno,
            alternateno: state.homeReducer.alternateno,
            email: state.homeReducer.email,
            address: state.homeReducer.address,
            isLoading: state.homeReducer.isLoading
        }
  }
  
   mapDispatchToProps = dispatch => {
    return {
      ...bindActionCreators({ 
          onCreateContact, 
          onFirstNameChange, 
          onLastNameChange, 
          onEmailChange,
          onPhoneNumberChange,
          onAlternateNumberChange,
          onAddressChange,
          clear
         }, dispatch)
  };
  }

export class CreateContact extends PureComponent {

    constructor(props) {
        super(props);
       this.status = this.props.navigation.getParam('status'); 
       this.detail = this.props.navigation.getParam('detail');
    }

 
  componentWillMount() {
     this.props.clear();
    if(this.status === 1) {
        this.props.onFirstNameChange(this.detail.first_name);
        this.props.onLastNameChange(this.detail.last_name);
        this.props.onPhoneNumberChange(this.detail.phone_no);
        this.props.onAlternateNumberChange(this.detail.alternate_no);
        this.props.onEmailChange(this.detail.email);
        this.props.onAddressChange(this.detail.address);
    } 
  }

  componentWillReceiveProps(nextProps) {
   if(nextProps.data !== this.props.data) {
       if ( this.status === 1) {
        Alert.alert(
            'Alert',
            'Contact Successfully Updated',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
        
            ],
            { cancelable: false }
          )
       }
       else {
    Alert.alert(
        'Alert',
        'Contact Successfully Saved',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
          {text: 'OK', onPress: () => this.props.navigation.goBack()},
    
        ],
        { cancelable: false }
      )
   }
}
}
  

  onChangeText(text,index) {
      console.log('index ==>', index)
      switch(index) {
       case 0:
           this.props.onFirstNameChange(text)
           break;
       case 1:
           this.props.onLastNameChange(text)
           break;
       case 2:
           this.props.onPhoneNumberChange(text)
           break;
        case 3:
           this.props.onAlternateNumberChange(text)
           break;
        case 4:
           this.props.onEmailChange(text)
           break;
         case 5:
           this.props.onAddressChange(text)        
      } 
  }

  mapValueToSchema() {
      let index;
  if (this.status === 1) {
   index = this.detail.id
  }   else { 
  index = getPrimaryId();
  }
  const newContact = {
    id: index,
    first_name: this.props.firstname,
    last_name: this.props.lastname,
    phone_no: Number(this.props.contactno),
    alternate_no: Number(this.props.alternateno),
    email: this.props.email,
    address: this.props.address
}
if (this.props.firstname.trim() == '')
{
Alert.alert('Enter name')
} else if (this.props.contactno.trim() == '') {
Alert.alert('Enter Phone Number')
} else {
this.props.onCreateContact(newContact);
}
  }

renderHeader() {
    return(
     <View style={{ justifyContent: 'space-between', alignItems: 'center', height: 80, flexDirection: 'row', marginHorizontal: 10}}> 
        <TouchableOpacity
        onPress={() => this.props.navigation.goBack()}
        >
            <Image 
            style={{ height: 20, width: 20 }}
            source={BACK}
            />
            </TouchableOpacity>  
        <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold'}}>{ this.status === 1 ? 'Edit Contact' : 'Create Contact'}</Text>
      <View />
     </View>
    );
}

renderTextInput() {
    const fields= [
        {
        name: 'First Name',
        value: this.props.firstname
    },
    {
        name: 'Last Name',
        value: this.props.lastname
    },
    {
        name: 'Phone Number',
        value: String(this.props.contactno)
    },
    {
        name: 'Alternate Number',
        value: String(this.props.alternateno)
    },
    {
        name: 'Email',
        value: this.props.email,
    },
    {
        name: 'Address',
        value: this.props.address
    }
    ]
    return(
        <View style={{ flex: 0.8, backgroundColor: 'white' }}>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={fields}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                renderItem={({ item, index }) => this.renderRow(item, index)}
            />
        </View>

    );
}

FlatListItemSeparator() {
    return (
        <View style={{ backgroundColor: 'black', height: 1, width: '90%', marginLeft: '5%'}} />
    )
}
renderRow(item, i) {
 return (
    <TextInput
    placeholder={item.name}
    placeholderTextColor={'#A9A9A9'}
    style={{ color: 'grey', fontSize: 14, marginLeft: 15, width: '90%', height: 45, marginLeft: '5%' }}
    returnKeyType='next'
    //onFocus={() => this.navigationMethod()}
    //ref={(input) => { this.searchText = input; }}
     onChangeText={(text) => this.onChangeText(text, i)}
    value={item.value}
    underlineColorAndroid='transparent'
    />
 );
}

renderButton() {
    return (
    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center'}}>
      <TouchableOpacity 
      onPress={() => this.mapValueToSchema()}
      style={{ backgroundColor: 'grey', borderRadius: 16, width: 150, height: 60, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, padding: 5 }}>SAVE</Text>
      </TouchableOpacity>
    </View>
    );
}

render() {
    console.log('data=>', this.props.data);
    return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
      {this.renderHeader()}
      {this.renderTextInput()}
      {this.renderButton()}
    </View>
    );
}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContact);