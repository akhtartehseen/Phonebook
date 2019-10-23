import React, {PureComponent} from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, Alert, Image, Linking, Platform} from 'react-native';
import { connect } from 'react-redux';
import { onCreateContact, onFirstNameChange, onLastNameChange, onPhoneNumberChange,
         onAlternateNumberChange, onAddressChange, onEmailChange } from '../models/Home/homeAction';
import { bindActionCreators } from 'redux';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { getPrimaryId } from './../database/homeSchema';
import { BACK, CALL, MESSAGE } from '../image'


//const fields = [ 'First Name', 'Last Name', 'Phone Number', 'Alternate Number', 'Email', 'Address'];
 const fields= [
    {
    name: 'First Name',
},
{
    name: 'Last Name',
},
{
    name: 'Phone Number',
},
{
    name: 'Alternate Number',
},
{
    name: 'Email',
},
{
    name: 'Address',
}
]


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
          onAddressChange
         }, dispatch)
  };
  }

export class ContactDetail extends PureComponent {

    constructor(props) {
        super(props);
       this.detail = this.props.navigation.getParam('data'); 
    }

  componentWillMount() {
    //this.props.getContact();
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
        <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold'}}>Contact Detail</Text>

      <TouchableOpacity
      onPress={() => this.props.navigation.navigate('CreateContact', {
          status: 1,
          detail: this.detail
      })}
      >
      <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold'}}>Edit</Text>   
            </TouchableOpacity>  
     </View>
    );
}

renderImage() {
    return (
     <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
         <View style={{ borderRadius: 45, backgroundColor: '#DCDCDC', height: 100, width: 100, justifyContent: 'center', alignItems: 'center' }}>
             <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold'}}>{this.detail.first_name.charAt(0)}</Text>
         </View>
         <View style={{ borderRadius: 45, backgroundColor: 'white', height: 40, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
             <Text style={{ color: 'black', fontSize: 18, fontWeight: '300'}}>{this.detail.first_name} {this.detail.last_name}</Text>
         </View>
     </View>
    );
}

callMessageView() {
    return (
    <View style={{ height: 80, width: '80%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', marginTop: 15, marginLeft: '10%' }}>
     <TouchableOpacity
     onPress={() => this.sendMessage()}
     >
         <Image 
         source={MESSAGE}
         style={{ height: 40, width: 40}}
         resizeMode= 'contain'
         />

     </TouchableOpacity>
     <TouchableOpacity
     onPress={() => this.makeCall()}
     >
         <Image 
         source={CALL}
         style={{ height: 40, width: 40}}
         resizeMode= 'contain'
         />

     </TouchableOpacity>
    </View>
    );
}

sendMessage() {
  let  url = `sms:${this.detail.phone_no}${Platform.OS === "ios" ? "&" : "?"}body=${""}`

    Linking.openURL(url);
}

makeCall() {
       // console.log('callNumber ----> ', phone);
       RNImmediatePhoneCall.immediatePhoneCall(String(this.detail.phone_no));
        // let phoneNumber = this.detail.phone_no;
        // if (Platform.OS !== 'android') {
        // phoneNumber = `telprompt:${this.detail.phone_no}`;
        // }
        // else  {
        // phoneNumber = `tel:${this.detail.phone_no}`;
        // }
        // Linking.canOpenURL(phoneNumber)
        // .then(supported => {
        // if (!supported) {
        //     Alert.alert('Phone number is not available');
        //   } else {
        //     return Linking.openURL(phoneNumber);
        // }
        // })
        // .catch(err => console.log(err));
}

detailsView() {
return (
<View style={{ width: '90%', marginLeft:'5%'}}>
<View style={{ borderBottomWidth: 1, borderBottomColor: '#A9A9A9', height: 60, justifyContent: 'center'}}>    
<Text>Mobile No</Text>
<Text>{this.detail.phone_no}</Text>
</View>
<View style={{ borderBottomWidth: 1, borderBottomColor: '#A9A9A9', height: 60, justifyContent: 'center'}}>    
<Text>Alternate No</Text>
<Text>{this.detail.alternate_no}</Text>
</View>
<View style={{ borderBottomWidth: 1, borderBottomColor: '#A9A9A9', height: 60, justifyContent: 'center'}}>    
<Text>Address</Text>
<Text>{this.detail.address}</Text>
</View>
</View>
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
    console.log('detail=>', this.detail);
    return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
      {this.renderHeader()}
      {this.renderImage()}
      {this.callMessageView()}
      {this.detailsView()}
    </View>
    );
}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetail);