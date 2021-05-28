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

class ForgetPasswordView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
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

    handleData = () => {
        let data = this.props.data;
        if (this.props.errorCode != ErrorCode.ERROR_INIT) {
            if (this.props.errorCode == ErrorCode.ERROR_SUCCESS) {
                if (this.props.action == getActionSuccess(ActionEvent.FORGOT_PASSWORD)) {
                    if (data != null) {
                        this.showMessage(localizes('forgotPassword.sendSuccess'))
                        setTimeout(() => {
                            this.onBack()
                        })
                    }
                }
            } else if (this.props.errorCode == ErrorCode.ERROR_500 || this.props.errorCode == ErrorCode.ERROR_400) {
                this.showMessage(localizes('forgotPassword.emailNotRegistered'))
            } else {
                this.handleError(this.props.errorCode, this.props.error);
            }
        }
    }

    validateData() {
        const { email } = this.state;
        if (email == null) {
            this.showMessage(localizes('forgotPassword.fillEmail'));
            this.email.focus()
            return false;
        } else if (email.trim() == '') {
            this.showMessage(localizes('forgotPassword.fillEmail'));
            this.email.focus()
            return false;
        } else if (!Utils.validateEmail(email.trim())) {
            this.showMessage(localizes('forgotPassword.fillEmailRightFormat'));
            this.email.focus()
            return false;
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
                        <Text style={{ ...commonStyles.textBold, fontSize: Fonts.FONT_SIZE_XX_LARGE }}>{localizes("forgotPassword.title")}</Text>
                        <Text style={{ ...commonStyles.text, width: "80%", marginTop: Constants.MARGIN_XX_LARGE }}>{localizes("forgotPassword.guide")}</Text>
                    </View>
                    {this.renderForm()}
                    {this.renderButton()}
                </ScrollView>
                {this.showLoadingBar(this.props.isLoading)}
            </View>
        )
    }

    renderForm = () => {
        let { email } = this.state;
        return (
            <View style={{ marginTop: Constants.MARGIN_XX_LARGE }}>
                <TextInputCustom
                    onRef={(r) => (this.email = r)}
                    oneLine={true}
                    label={localizes('forgotPassword.email')}
                    placeholder={localizes('forgotPassword.email')}
                    value={email}
                    onChangeText={(txt) => {
                        this.setState({ email: txt });
                    }}
                    onSubmitEditing={() => {
                        if (this.validateData()) {
                            this.props.forgotPassword({ email: this.state.email.toLowerCase() })
                        }
                    }}
                    returnKeyType={'done'}
                    keyboardType={'email-address'}
                />
            </View>
        );
    };

    renderButton = () => {
        return (
            <View style={{ marginTop: Constants.MARGIN }}>
                <Button
                    onPress={() => {
                        if (this.validateData()) {
                            let filter = { email: this.state.email.toLowerCase() }
                            this.props.forgotPassword(filter)
                        }
                    }}
                    title={localizes("forgotPassword.sendEmail").toUpperCase()}
                    titleStyle={{ fontWeight: 'bold', color: '#a5a5a5' }}
                    backgroundColor={Colors.COLOR_DRK_GREY} />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.forgotPass.data,
    isLoading: state.forgotPass.isLoading,
    errorCode: state.forgotPass.errorCode,
    action: state.forgotPass.action,
})

const mapDispatchToProps = {
    ...userActions
}


export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordView)
