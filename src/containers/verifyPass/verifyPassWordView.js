import React, { Component } from 'react'
import { View, Text, BackHandler } from 'react-native'
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

class VerifyPasswordView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hidePassword: true,
            newPassword: '',
            confirmPassword: '',
            email: '',
            user: null,
            errorSignIn: null,
            validateNewPassword: null,
            validateConfirmPassword: null,
        };
        this.hidePassword = true;
    }

    async componentDidMount() {
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
        return true;
    }

    login() {
        if (this.validateData()) {
            //TODO: login
        }
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

    render() {
        return (
            <Container style={styles.container}>
                <Root>
                    <Header
                        title={""}
                        onBack={() => { }}
                    />
                    <Content
                        contentContainerStyle={{ flexGrow: 1 }}
                        style={{ flexGrow: 1, backgroundColor: Colors.COLOR_BACKGROUND, paddingHorizontal: Constants.PADDING_LARGE }}>
                        <View style={{ marginHorizontal: Constants.MARGIN_X_LARGE, marginTop: Constants.MARGIN_XX_LARGE }}>
                            <Text style={{ ...commonStyles.textBold, fontSize: Fonts.FONT_SIZE_XX_LARGE }}>Verify password</Text>
                            <Text style={{ ...commonStyles.text, width: "80%", marginTop: Constants.MARGIN_XX_LARGE }}>Enter your new password and confirm password</Text>
                        </View>
                        {this.renderForm()}
                        {this.renderButton()}
                    </Content>
                </Root>
            </Container >
        )
    }

    renderForm = () => {
        let { newPassword, validateNewPassword, confirmPassword, validateConfirmPassword } = this.state;
        return (
            <View style={{ marginTop: Constants.MARGIN_XX_LARGE }}>
                <TextInputCustom
                    onRef={(ref) => (this.newPassword = ref)}
                    oneLine={true}
                    label={'New password'}
                    warnLabel={validateNewPassword}
                    placeholder={'Please input new password'}
                    value={newPassword}
                    secureTextEntry={this.state.hidePassword}
                    onChangeText={(txt) => {
                        this.setState({ newPassword: txt, validateNewPassword: null });
                    }}
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                    returnKeyType={'done'}
                    contentRight={this.state.hidePassword ? ic_eye_lock_grey : ic_eye_grey}
                    onPressRight={this.managePasswordVisibility}
                    onBlur={() => {
                        this.setState({ validateNewPassword: null });
                    }}
                />
                <TextInputCustom
                    onRef={(ref) => (this.confirmPassword = ref)}
                    oneLine={true}
                    label={'Confirm new password'}
                    warnLabel={validateConfirmPassword}
                    placeholder={'Please input confirm password'}
                    value={confirmPassword}
                    secureTextEntry={this.state.hidePassword}
                    onChangeText={(txt) => {
                        this.setState({ confirmPassword: txt, validateConfirmPassword: null });
                    }}
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                    }}
                    returnKeyType={'done'}
                    contentRight={this.state.hidePassword ? ic_eye_lock_grey : ic_eye_grey}
                    onPressRight={this.managePasswordVisibility}
                    onBlur={() => {
                        this.setState({ validateConfirmPassword: null });
                    }}
                />
            </View>
        );
    };

    renderButton = () => {
        return (
            <View style={{ marginTop: Constants.MARGIN }}>
                <Button title={"CONFIRM"} titleStyle={{ fontWeight: 'bold', color: '#a5a5a5' }} backgroundColor={Colors.COLOR_DRK_GREY} />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPasswordView)
