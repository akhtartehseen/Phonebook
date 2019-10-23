import { combineReducers } from 'redux';
 import homeReducer from './Home/homeReducer';
// import dataReducer from './dataReducer';
// import loginReducer from './loginReducer';
// import homeReducer from './homeReducer';
// import MyProfileReducer from './MyProfileReducer';
// import signUpReducer from './signUpReducer';
// import MyFavouriteReducer from './MyFavouriteReducer';
// import ItineraryReducer from './ItineraryReducer';
// import createInspirationReducer from './createInspirationReducer';
// import createItineraryReducer from './createItineraryReducer';
// import commentReducer from './commentReducer';

export default function getRootReducer(navReducer) {
    return combineReducers({
         nav: navReducer,
         homeReducer: homeReducer
        // cars,
        // dataReducer,
        // loginReducer,
        // homeReducer,
        // MyProfileReducer,
        // signUpReducer,
        // MyFavouriteReducer,
        // ItineraryReducer,
        // createInspirationReducer,
        // createItineraryReducer,
        // commentReducer

    });
}
  ////react-native link react-native-device-info
///  npm install --save react-native-device-info
/// npm install react-native-google-places-autocomplete --save
/// npm install react-native-maps --save
/// npm install --save react-native-open-maps
///  npm i -S react-native-simple-dialogs
///npm install react-native-star-rating --save
// asset command:
///react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res