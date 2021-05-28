import React, { Component } from 'react'
import { View, Text, BackHandler, ScrollView } from 'react-native'
import {
    Container, Content, Root,
} from 'native-base'
import { connect } from 'react-redux'
import { Constants } from 'values/constants';
import { Colors } from 'values/colors';
import TextInputCustom from 'components/textInputCustom';
import Header from 'components/header';
import ic_eye_grey from 'images/ic_eye_grey.png';
import ic_eye_lock_grey from 'images/ic_eye_lock_grey.png';
import styles from '../login/styles';
import Button from 'components/button';
import commonStyles from 'styles/commonStyles';
import { Fonts } from 'values/fonts';
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';
import { ErrorCode } from 'config/errorCode';
import * as userActions from 'actions/userActions';
import Utils from 'utils/utils';
import BaseView from 'containers/base/baseView';
import { localizes } from 'locales/i18n';

class ChangePasswordView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            user: null,
            errorSignIn: null,
            hidePassword: true,
            newPassword: '',
            confirmPassword: '',
            password: '',
        };
        this.hidePassword = true;
    }

    componentDidMount = async () => {
        let user = await this.getProfile(); this.props.getProfile()
        this.handleProfile(user)
    }

    handleProfile = (user) => {
        this.setState({ user: user })
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
                    if (data && data.data != null && data.data.message != null) {
                        this.showMessage(localizes('changePass.success'))
                        setTimeout(() => { this.onBack() }, 500)
                    } else if (data != null && data.data && data.data.status == 400) {
                        this.showMessage(localizes('changePass.error'))
                    }
                }
            } else if (this.props.errorCode == ErrorCode.ERROR_500 || this.props.errorCode == ErrorCode.ERROR_400) {
                this.showMessage(localizes('changePass.error'))
            } else {
                this.handleError(this.props.errorCode, this.props.error);
            }
        }
    }

    validateData() {
        const { password, newPassword, confirmPassword } = this.state;
        if (Utils.isNull(password)) {
            this.showMessage(localizes('changePass.fillPassword'));
            this.password.focus();
            return false
        } else if (Utils.isNull(newPassword)) {
            this.showMessage(localizes('changePass.fillNewPassword'));
            this.newPassword.focus();
            return false
        } else if (Utils.isNull(confirmPassword)) {
            this.showMessage(localizes('changePass.fillRePassword'));
            this.confirmPassword.focus();
            return false
        } else if (newPassword.length < 8) {
            this.showMessage(localizes('changePass.fillNewPasswordLength'));
            this.newPassword.focus();
            return false
        } else if (newPassword != confirmPassword) {
            this.showMessage(localizes('changePass.passwordMissMatch'));
            this.confirmPassword.focus();
            return false
        }
        return true;
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={""}
                    onBack={() => { this.onBack() }}
                />
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{ flexGrow: 1, backgroundColor: Colors.COLOR_BACKGROUND, paddingHorizontal: Constants.PADDING_LARGE }}>
                    <View style={{ marginHorizontal: Constants.MARGIN_X_LARGE, marginTop: Constants.MARGIN_XX_LARGE }}>
                        <Text style={{ ...commonStyles.textBold, fontSize: Fonts.FONT_SIZE_XX_LARGE }}>{localizes("changePass.title")}</Text>
                        {/* <Text style={{ ...commonStyles.text, width: "80%", marginTop: Constants.MARGIN_XX_LARGE }}>{localizes("forgotPassword.guide")}</Text> */}
                    </View>
                    {this.renderForm()}
                    {this.renderButton()}
                </ScrollView>
                {this.showLoadingBar(this.props.isLoading)}
            </View>
        )
    }

    renderForm = () => {
        let { password, newPassword, confirmPassword } = this.state;
        return (
            <View style={{ marginTop: Constants.MARGIN_XX_LARGE }}>
                <TextInputCustom
                    onRef={(ref) => (this.password = ref)}
                    oneLine={true}
                    label={localizes('changePass.password')}
                    placeholder={localizes('changePass.password')}
                    value={password}
                    secureTextEntry={this.state.hidePassword}
                    onChangeText={(txt) => {
                        this.setState({ password: txt });
                    }}
                    onSubmitEditing={() => {
                        this.newPassword.focus()
                    }}
                    returnKeyType={'done'}
                    contentRight={this.state.hidePassword ? ic_eye_lock_grey : ic_eye_grey}
                    onPressRight={this.managePasswordVisibility}
                />
                <TextInputCustom
                    onRef={(ref) => (this.newPassword = ref)}
                    oneLine={true}
                    label={localizes('changePass.newPassword')}
                    placeholder={localizes('changePass.newPassword')}
                    value={newPassword}
                    secureTextEntry={this.state.hidePassword}
                    onChangeText={(txt) => {
                        this.setState({ newPassword: txt });
                    }}
                    onSubmitEditing={() => {
                        this.confirmPassword.focus()
                    }}
                    returnKeyType={'next'}
                    contentRight={this.state.hidePassword ? ic_eye_lock_grey : ic_eye_grey}
                    onPressRight={this.managePasswordVisibility}
                />
                <TextInputCustom
                    onRef={(ref) => (this.confirmPassword = ref)}
                    oneLine={true}
                    label={localizes('changePass.confirmPassword')}
                    placeholder={localizes('changePass.confirmPassword')}
                    value={confirmPassword}
                    secureTextEntry={this.state.hidePassword}
                    onChangeText={(txt) => {
                        this.setState({ confirmPassword: txt });
                    }}
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                    returnKeyType={'done'}
                    contentRight={this.state.hidePassword ? ic_eye_lock_grey : ic_eye_grey}
                    onPressRight={this.managePasswordVisibility}
                />
            </View>
        );
    };

    managePasswordVisibility = () => {
        const last = this.state.password;
        this.setState({ hidePassword: !this.state.hidePassword, password: '' });
        setTimeout(() => {
            this.setState({ password: last });
        }, 0);
    };


    renderButton = () => {
        return (
            <View style={{ marginTop: Constants.MARGIN }}>
                <Button
                    onPress={() => {
                        if (this.validateData()) {
                            let data = {
                                id: this.state.user.id,
                                oldPass: this.state.password,
                                newPass: this.state.newPassword
                            }
                            this.props.changePassword(data)
                        }
                    }}
                    title={localizes("changePass.txtChange").toUpperCase()}
                    titleStyle={{ fontWeight: 'bold', color: '#a5a5a5' }}
                    backgroundColor={Colors.COLOR_DRK_GREY} />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.changPass.data,
    isLoading: state.changPass.isLoading,
    errorCode: state.changPass.errorCode,
    action: state.changPass.action,
})

const mapDispatchToProps = {
    ...userActions
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordView)
