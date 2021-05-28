import React, { Component } from "react";
import {
    View, Platform, PermissionsAndroid, ToastAndroid, Pressable,
} from "react-native";
import {
    Button, Content, Text,
    Input, Item, Spinner,
} from "native-base";
import { Constants } from "values/constants";
import commonStyles from 'styles/commonStyles';
import { Colors } from "values/colors";
import { ErrorCode } from "config/errorCode";
import StorageUtil from "utils/storageUtil";
import DateUtil from "utils/dateUtil";
import Utils from 'utils/utils'
import Toast from 'react-native-root-toast';
import StringUtil from "utils/stringUtil";
import { async } from "rxjs/internal/scheduler/async";
import { Fonts } from "values/fonts";
import NetInfo from "@react-native-community/netinfo";
import { CommonActions } from '@react-navigation/native';
import { localizes } from "locales/i18n";

const resetActionLogin = CommonActions.reset({
    index: 0,
    routes: [{ name: 'Login' }],
});

const CHANNEL_ID = 'aaChannelId'
const CHANNEL_NAME = 'Thông báo chung'

/**
 * All component should be inherit from this
 */
class BaseView extends Component {

    constructor(props) {
        super(props);
        this.className = this.constructor.name;
        this.baseView = this;
    }

    /**
     * Has permission
     */
    hasPermission = async (permissions) => {
        if (Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            permissions
        );

        if (hasPermission) return true;

        const status = await PermissionsAndroid.request(
            permissions
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            console.log("Permission denied by user.");
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.log("Permission revoked by user.");
        }

        return false;
    }

    render() {
        return (
            <View></View>
        );
    }

    /**
     * Show toast message
     * @param {*} message 
     * @param {*} duration 
     * @param {*} type 
     */
    showMessage(message, duration = 30000, type = 'warning') {
        try {
            if (Platform.OS === 'ios') {
                if (!global.isShowMessageError) {
                    global.isShowMessageError = true;
                    Toast.show(message, {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.CENTER,
                    });
                }
            } else {
                if (!global.isShowMessageError) {
                    global.isShowMessageError = true;
                    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.CENTER);
                }
            }
            setTimeout(() => {
                global.isShowMessageError = false
            }, 5000);
        } catch (e) {
            global.isShowMessageError = false
            console.log(e);
        }
    }

    showLoginView(route) {
        if (!Utils.isNull(route)) {
            this.props.navigation.navigate('Login', { fromScreen: route.fromScreen, param: { ...route } })
        } else {
            this.props.navigation.navigate('Login')
        }
    }

    componentWillUnmount() {
    }

    handlerBackButton = () => {
        console.log(this.className, 'back pressed')
        if (this.onBackPressed()) {
            return true
        } else if (this.props.navigation) {
            this.onBack()
        } else {
            return false
        }
        return true
    }

    onBackPressed() {
        return false
    }

    onBack = () => {
        if (this.props.navigation) {
            this.props.navigation.goBack()
        }
    }

    goHomeScreen() {
        this.props.navigation.dispatch(resetAction)
    }

    goLoginScreen() {
        this.props.navigation.dispatch(resetActionLogin)
    }

    goHome = () => {
        this.props.navigation.navigate("Main")
    }

    renderSeparators = () => {
        return (
            <Hr color={Colors.COLOR_GREY_LIGHT} width={1} style={{ opacity: 0.4 }} />
        )
    }

    logout() {
        StorageUtil.deleteItem(StorageUtil.USER_PROFILE);
        StorageUtil.storeItem(StorageUtil.USER_PROFILE, null);
        StorageUtil.deleteItem(StorageUtil.USER_TOKEN);
        StorageUtil.storeItem(StorageUtil.USER_TOKEN, null);
        StorageUtil.deleteItem(StorageUtil.FIREBASE_TOKEN);
        StorageUtil.storeItem(StorageUtil.FIREBASE_TOKEN, null);
        global.token = "";
        global.firebaseToken = "";
        // firebase.auth().signOut();
    }

    /**
     * Handle error
     * @param {} errorCode 
     */
    handleError(errorCode, error) {
        switch (errorCode) {
            case ErrorCode.ERROR_COMMON:
                this.showMessage(localizes('error_in_process'))
                break
            case ErrorCode.NO_CONNECTION:
                NetInfo.fetch().then(state => {
                    console.log("Connection type", state.type);
                    console.log("Is connected?", state.isConnected);
                    if (state.isConnected) {
                        this.showMessage(localizes('error_connect_to_server'))
                    } else {
                        this.showMessage(localizes('error_network'))
                    }
                });
                break

            default:
        }
    }

    /**
     * Handle connection change
     */
    handleConnectionChange = (isConnected) => {
        console.log(`is connected: ${isConnected}`)
    }

    /**
     * Show loading bar
     * @param {*} isShow 
     */
    showLoadingBar(isShow) {
        return isShow ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
                <Spinner style={{}} color={Colors.COLOR_PRIMARY}>

                </Spinner>
            </View> : null
    }


    async componentDidMount() {
        this.checkPermission();
    }

    getLanguage = () => {
        StorageUtil.retrieveItem(StorageUtil.LANGUAGE).then((language) => {
            if (language != null) {
                this.language = language
            } else {
                this.language = 'vi'
            }
        })
    }

    getProfile = async () => {
        let user = await StorageUtil.retrieveItem(StorageUtil.USER_PROFILE);
        return user;
    }

    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
        } else {
            this.requestPermission();
        }
    }

    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
        } catch (error) {
            console.log('permission rejected');
        }
    }
}

export default BaseView;
