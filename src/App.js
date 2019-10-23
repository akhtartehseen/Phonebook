import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import getStore from './store';
import Home from './components/Home';
import CreateContact from './components/CreateContact';
import ContactDetail from './components/ContactDetail';

const AppNavigator = createStackNavigator({

    Home: Home,
    CreateContact: CreateContact,
    ContactDetail: ContactDetail
},
{
    headerMode: 'none'
}

);

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

// connect(state => ({
//     nav: state.nav
// }));

const RootStack = createAppContainer(AppNavigator);

// const AppWithNavigationState = connect(state => ({
//     nav: state.nav,
// }))(({ dispatch, nav }) => (
//     <AppNavigator navigation={{ dispatch, state: nav }} />
// ));

// class AppWithNavigationState extends Component {
//     render() {
//         return (
//             <AppNavigator
//                 navigation={{
//                     dispatch: this.props.dispatch,
//                     state: this.props.nav
//                 }}
//             />
//         );
//     }
// }

const store = getStore(navReducer);

export default function NCAP() {
    console.disableYellowBox = true;
    return (
        <Provider store={store}>
            <RootStack />
        </Provider>
    );
}


// npm i react-native-image-placeholder