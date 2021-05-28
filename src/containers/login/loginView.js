import React, { Component } from 'react'
import { View, Text, BackHandler, StatusBar, Keyboard } from 'react-native'
import {
    Container, Content, Root,
} from 'native-base'
import { connect } from 'react-redux'
import { Constants } from 'values/constants';
import { Colors } from 'values/colors';
import * as userActions from 'actions/userActions';
import TextInputCustom from 'components/textInputCustom';
import Header from 'components/header';
import ic_eye_grey from 'images/ic_eye_grey.png';
import ic_eye_lock_grey from 'images/ic_eye_lock_grey.png';
import styles from './styles';
import Button from 'components/button';
import BaseView from 'containers/base/baseView';
import StorageUtil from 'utils/storageUtil';
import Utils from 'utils/utils';
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';
import { ErrorCode } from 'config/errorCode';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { localizes } from 'locales/i18n';

class LoginView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            hidePassword: true,
            password: '',
            email: '',
            user: null,
            errorSignIn: null,
        };
        this.hidePassword = true;
    }

    async componentDidMount() {
    }


    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps;
            this.handleData();
        }
    }

    signOutGG = async (data) => {
        try {
            if (!Utils.isNull(data)) {
                await GoogleSignin.signOut();
            }
        } catch (error) {
            console.log("error sign out google", error);
        }
    };

    loginGoogle = async () => {
        Keyboard.dismiss();
        try {
            await this.signOutGG('Google');
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.configure({
                webClientId:
                    '661179561027-ii0ksq3las4t9s5qagt16q2o8pqr4d8l.apps.googleusercontent.com',
                offlineAccess: true
            });
            const { user } = await GoogleSignin.signIn();
            let userInfo = user
            const data = {
                user: {
                    email: userInfo.email,
                    id: userInfo.id
                }
            };
            this.props.loginGoogle(data);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log('user cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('operation (e.g. sign in) is in progress already');
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('play services not available or outdated');
                // play services not available or outdated
            } else {
                // some other error happened
                console.log(error);
            }
        }
    };

    handleData = () => {
        let data = this.props.data;
        if (this.props.errorCode != ErrorCode.ERROR_INIT) {
            if (this.props.errorCode == ErrorCode.ERROR_SUCCESS) {
                if (this.props.action == getActionSuccess(ActionEvent.LOGIN) || this.props.action == getActionSuccess(ActionEvent.LOGIN_GOOGLE)) {
                    if (data != null) {
                        StorageUtil.storeItem(StorageUtil.USER_PROFILE, data.userInfo);
                        StorageUtil.storeItem(StorageUtil.USER_TOKEN, data.token);
                        global.token = data.token;
                        if (this.props.route.params && this.props.route.params.fromScreen) {
                            this.props.navigation.pop(2)
                            setTimeout(() => { this.props.navigation.navigate(this.props.route.params.fromScreen, this.props.route.params.param.id && { id: this.props.route.params.param.id }) })
                        } else {
                            this.goHomeScreen()
                        }
                    }
                }
            } else if (this.props.errorCode == ErrorCode.ERROR_400) {
                this.showMessage(localizes('login.error'))
            } else {
                this.handleError(this.props.errorCode, this.props.error);
            }
        }
    }


    managePasswordVisibility = () => {
        const last = this.state.password;
        this.setState({ hidePassword: !this.state.hidePassword, password: '' });
        setTimeout(() => {
            this.setState({ password: last });
        }, 0);
    };

    validateData() {
        const { email, password } = this.state;
        if (email == null) {
            this.showMessage(localizes('login.fillEmail'));
            this.email.focus()
            return false;
        } else if (email.trim() == '') {
            this.showMessage(localizes('login.fillEmail'));
            this.email.focus()
            return false;
        } else if (!Utils.validateEmail(email.trim())) {
            this.showMessage(localizes('login.fillEmailRightFormat'));
            this.email.focus()
            return false;
        } else if (Utils.isNull(password)) {
            this.showMessage(localizes('login.fillPassword'));
            this.password.focus();
            return false;
        }
        return true;
    }

    onChangePassword = (password) => {
        this.setState({
            password,
        });
    }

    onChangeEmailOrPhone = (email) => {
        this.setState({
            email,
        });
    }

    login = async () => {
        let { email, password } = this.state
        if (this.validateData()) {
            let user = {
                email: email,
                password: password
            }
            this.props.login(user)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={localizes('login.title').toUpperCase()}
                    onBack={() => { this.onBack() }}
                />
                <Content style={{ flex: 1, backgroundColor: Colors.COLOR_BACKGROUND, paddingHorizontal: Constants.PADDING_LARGE }}>
                    {this.renderForm()}
                    {this.renderButton()}
                </Content>
                <StatusBar translucent={false} backgroundColor='black' />
                {this.showLoadingBar(this.props.isLoading)}
            </View>
        )
    }

    renderForm = () => {
        let { email, password, validateEmail, validatePass } = this.state;
        return (
            <View style={{ marginTop: Constants.MARGIN_XX_LARGE }}>
                <TextInputCustom
                    onRef={(r) => (this.email = r)}
                    oneLine={true}
                    label={localizes('login.email')}
                    placeholder={localizes('login.email')}
                    warnLabel={validateEmail}
                    value={email}
                    onChangeText={(txt) => {
                        this.setState({ email: txt });
                    }}
                    onSubmitEditing={() => {
                        this.password.focus();
                    }}
                    keyboardType={"email-address"}
                    returnKeyType={'next'}
                />
                <TextInputCustom
                    onRef={(ref) => (this.password = ref)}
                    oneLine={true}
                    label={localizes('login.password')}
                    warnLabel={validatePass}
                    placeholder={localizes('login.password')}
                    value={password}
                    secureTextEntry={this.state.hidePassword}
                    onChangeText={(txt) => {
                        this.setState({ password: txt });
                    }}
                    onSubmitEditing={() => {
                        this.login()
                    }}
                    returnKeyType={'done'}
                    contentRight={this.state.hidePassword ? ic_eye_lock_grey : ic_eye_grey}
                    onPressRight={this.managePasswordVisibility}
                />
            </View>
        );
    };

    renderButton = () => {
        return (
            <View style={{ marginTop: Constants.MARGIN }}>
                <Button
                    onPress={this.login}
                    title={localizes('login.title').toUpperCase()}
                    titleStyle={{ fontWeight: 'bold', color: '#a5a5a5' }}
                    backgroundColor={Colors.COLOR_DRK_GREY} />
                <Button
                    onPress={() => { this.props.navigation.navigate("Register") }}
                    title={localizes('login.signUp').toUpperCase()}
                    border={{ borderWidth: 1, borderColor: Colors.COLOR_BLUE }}
                    titleStyle={{ fontWeight: 'bold', color: Colors.COLOR_BLUE }} />
                <Button
                    onPress={() => { this.props.navigation.navigate('ForgetPass') }}
                    title={localizes('login.forgotPass').toUpperCase()}
                    titleStyle={{ fontWeight: 'bold', color: Colors.COLOR_BLUE }} />
                <Button title={localizes('login.googleSignIn').toUpperCase()}
                    onPress={this.loginGoogle}
                    titleStyle={{ fontWeight: 'bold', color: Colors.COLOR_BLUE }}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.login.data,
    isLoading: state.login.isLoading,
    errorCode: state.login.errorCode,
    action: state.login.action,
})

const mapDispatchToProps = {
    ...userActions
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
