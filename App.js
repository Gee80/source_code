/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import AppNavigator from 'containers/navigation/appNavigator';
import store from './src/store';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import { MenuProvider } from 'react-native-popup-menu';
import I18n from 'react-native-i18n';
import StorageUtil from 'utils/storageUtil';

export default class App extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.setLanguage()
        SplashScreen.hide()
    }

    setLanguage() {
        StorageUtil.retrieveItem(StorageUtil.LANGUAGE).then((language) => {
            console.log('language', language);
            if (language != null) {
                I18n.locale = language;
                StorageUtil.storeItem(StorageUtil.LANGUAGE, language)
            } else {
                I18n.locale = 'vi';
                StorageUtil.storeItem(StorageUtil.LANGUAGE, 'vi')
            }
        }).catch((error) => {
            console.log(`Promise is rejected with error: ${error}`);
        });
    }

    render() {
        return (
            <Provider store={store}>
                <Root>
                    <MenuProvider>
                        <AppNavigator />
                    </MenuProvider>
                </Root>
            </Provider>
        );
    }
}
