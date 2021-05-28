import React, { Component } from 'react'
import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { ErrorCode } from "config/errorCode";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import FlatListCustom from "components/flatListCustom";
import styles from './styles';
import { Container, Content, Radio } from 'native-base';
import Header from 'components/header';
import Utils from 'utils/utils';
import commonStyles from 'styles/commonStyles';
import { Constants } from 'values/constants';
import { Fonts } from 'values/fonts';
import ic_search_white from 'images/ic_search_white.png';
import ic_grid_white from 'images/ic_grid_white.png';
import ItemSetting from './itemSetting';
import { Colors } from 'values/colors';
import Button from 'components/button';
import BaseView from 'containers/base/baseView';
import ic_vietnam_flag from "images/ic_vietnam_flag.png"
import ic_enlang_flag from "images/ic_enlang_flag.png"
import I18n from 'react-native-i18n';
import Modal from "react-native-modal";
import StorageUtil from 'utils/storageUtil';
import { localizes } from 'locales/i18n';
import DeviceInfo from 'react-native-device-info';
import * as userActions from 'actions/userActions'
import * as courseActions from 'actions/courseActions'
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';

export class SettingView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            itemSelected: 1,
            showingChangLanguageModal: false
        }
        this.list = [
            { title: localizes('setting.notification') },
            { title: localizes('setting.changePass'), onPress: () => {this.props.navigation.navigate('ChangePass')}, forUser: true },
            { title: localizes('setting.language'), onPress: this.showModal },
            { title: localizes('setting.term') },
            { title: localizes('setting.privacy') },
            { title: localizes('setting.payment') },
            { title: localizes('setting.faq') },

        ]
    }

    componentDidMount = async () => {
        let user = await this.getProfile();
        const deviceLocale = I18n.locale
        this.list.push({ title: localizes('setting.appVersion'), subTitle: DeviceInfo.getVersion() })
        this.setState({
            user: user,
            itemSelected: deviceLocale == 'vi' ? 1 : deviceLocale == 'en' ? 2 : 1,
            appVersion: DeviceInfo.getVersion()
        })
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps;
            this.handleData();
        }
    }


    handleData = () => {
        let data = this.props.data;
        if (this.props.errorCode != ErrorCode.ERROR_INIT) {
            if (this.props.errorCode == ErrorCode.ERROR_SUCCESS) {
                if (this.props.action == getActionSuccess(ActionEvent.CHANGE_PASSWORD)) {
                    if (data != null && data.payload != null) {
                        this.showMessage(localizes("setting.changePassSuccess"))
                        this.state.isEdit = false
                        this.props.getProfile(this.state.user.id)
                    }
                }
                this.state.refreshing = false
                this.state.isLoading = false
            } else {
                this.handleError(this.props.errorCode, this.props.error);
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    renderNotLogin = () => {
        return (
            <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            </View>
        )
    }

    /**
     * Render item
     * @param {*} item
     * @param {*} index
     */
    renderItem = (item, index) => {
        return <ItemSetting
            key={index}
            item={item}
            user={this.state.user}
            index={index}
            length={this.list.length}
        />
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    title={localizes("setting.title")}
                    onBack={() => { this.onBack() }}
                />
                <FlatListCustom
                    onRef={(ref) => { this.flatListRef = ref }}
                    contentContainerStyle={{
                    }}
                    data={this.list}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.title}
                    showsHorizontalScrollIndicator={false}
                    footerComponent={() => {
                        if (this.state.user) {
                            return (
                                <Button
                                    onPress={() => { this.logout(); this.goHomeScreen(); this.showMessage("Logout success") }}
                                    title={"SING OUT"}
                                    titleStyle={{ color: Colors.COLOR_BLUE }}
                                    style={{ marginTop: Constants.MARGIN_X_LARGE }}
                                    border={{
                                        borderRadius: Constants.CORNER_RADIUS,
                                        borderWidth: 1,
                                        borderColor: Colors.COLOR_BLUE
                                    }} />
                            )
                        } else {
                            return null
                        }
                    }}
                />
                {this.changeLanguageDialog()}
            </View>
        )
    }

    hideModal = () => {
        this.setState({ showingChangLanguageModal: false })
    }


    /**
     * Show Model 
     */
    showModal = () => {
        this.setState({ showingChangLanguageModal: true })
    }

    /**
     * Change language dialog
     */
    changeLanguageDialog = () => (
        <Modal
            isVisible={this.state.showingChangLanguageModal}
            onBackButtonPress={() => {
                this.hideModal()
            }}
            animationIn={'slideInUp'}
            animationInTiming={400}
            backdropOpacity={0.7}
            onBackdropPress={this.hideModal}
            deviceHeight={Constants.MAX_HEIGHT}
            statusBarTranslucent={true}
            useNativeDriver={Platform.OS === 'android'}
            coverScreen={true}
            style={{
                flexGrow: 1,
                margin: 0,
                alignItems: 'center'
            }}
            avoidKeyboard={false}
        >
            <View style={styles.viewLanguage}>
                <Pressable
                    android_ripple={Constants.ANDROID_RIPPLE}
                    onPress={() => {
                        this.changeLanguage('vi')
                    }}
                    style={styles.viewVi}>
                    <Image source={ic_vietnam_flag} style={{ marginRight: Constants.MARGIN }}></Image>
                    <Text style={[commonStyles.text, styles.textVi]}>{localizes("setting.vietnamese")}</Text>
                    <View style={{
                        borderWidth: 2.5,
                        borderColor: this.state.itemSelected == 1 ? Colors.COLOR_PRIMARY : Colors.COLOR_GREY_LIGHT,
                        borderRadius: 100,
                        width: 18, height: 18,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {this.state.itemSelected == 1 && <View style={{
                            width: 8, height: 8,
                            backgroundColor: Colors.COLOR_PRIMARY, borderRadius: 100
                        }} />}
                    </View>
                </Pressable>
                <View style={{ width: "100%", height: 1, backgroundColor: Colors.COLOR_GREY_LIGHT }} />
                <Pressable
                    android_ripple={Constants.ANDROID_RIPPLE}
                    onPress={() => {
                        this.changeLanguage('en')
                    }}
                    style={[styles.viewVi, { justifyContent: "center", alignItems: "center" }]}>
                    <Image source={ic_enlang_flag} style={{ marginRight: Constants.MARGIN }}></Image>
                    <Text style={[commonStyles.text, styles.textVi]}>{localizes("setting.english")}</Text>
                    <View style={{
                        borderWidth: 2.5,
                        borderColor: this.state.itemSelected == 2 ? Colors.COLOR_PRIMARY : Colors.COLOR_GREY_LIGHT,
                        borderRadius: 100,
                        width: 18, height: 18,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {this.state.itemSelected == 2 && <View style={{
                            width: 8, height: 8,
                            backgroundColor: Colors.COLOR_PRIMARY, borderRadius: 100
                        }} />}
                    </View>
                </Pressable>
            </View>
        </Modal>
    )

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.itemSelected != this.state.itemSelected) {
    //         this.changeLanguage()
    //     }
    // }

    /**
     * change language event 
     */
    changeLanguage(lang) {
        I18n.locale = lang
        StorageUtil.storeItem(StorageUtil.LANGUAGE, lang)
        this.setState({ showingChangLanguageModal: false })
        this.goHomeScreen()
    }
}
const mapStateToProps = (state) => ({
    data: state.user.data,
    isLoading: state.user.isLoading,
    errorCode: state.user.errorCode,
    action: state.user.action,
})

const mapDispatchToProps = {
    ...userActions,
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingView)
