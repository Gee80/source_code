import React, { Component } from 'react'
import { View, Text, BackHandler, ScrollView, Pressable, PermissionsAndroid, Image } from 'react-native'
import {
    Container, Content, Root,
} from 'native-base'
import { connect } from 'react-redux'
import { Constants } from 'values/constants';
import { Colors } from 'values/colors';
import TextInputCustom from 'components/textInputCustom';
import Header from 'components/header';
import styles from './styles';
import Button from 'components/button';
import Utils from 'utils/utils';
import commonStyles from 'styles/commonStyles';
import { Fonts } from 'values/fonts';
import ImageLoader from 'components/imageLoader';
import StorageUtil from 'utils/storageUtil';
import BaseView from 'containers/base/baseView';
import * as userActions from 'actions/userActions';
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DialogCustom from 'components/dialogCustom';
import ic_image from 'images/ic_image.png';
import { ErrorCode } from 'config/errorCode';
import i18n, { localizes } from "locales/i18n";

const CANCEL_INDEX = 2;
const optionsCamera = { 
    title: "Select avatar",
    storageOptions: {
        skipBackup: true,
        path: "images"
    }
};
class UserProfileView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            name: null,
            phone: null,
            email: null,
            avatar: null,
            isEdit: false,
            isLoading: false,
            visibleDialog: false
        };
    }

    componentDidMount = async () => {
        let user = await this.getProfile(); this.props.getProfile()
        this.handleProfile(user)
    }

    handleProfile = (user) => {
        this.setState({ user: user, name: user.name, phone: user.phone, email: user.email, avatar: user.avatar })
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
                if (this.props.action == getActionSuccess(ActionEvent.EDIT_PROFILE)) {
                    if (data != null && data.payload != null) {
                        this.showMessage(localizes("userProfile.success"))
                        this.state.isEdit = false
                        this.props.getProfile(this.state.user.id)
                    }
                } else if (this.props.action == getActionSuccess(ActionEvent.GET_PROFILE)) {
                    if (data != null && data.payload != null) {
                        this.state.user = data.payload
                        this.handleProfile(data.payload)
                        StorageUtil.storeItem(StorageUtil.USER_PROFILE, data.payload)
                    }
                }
                this.state.refreshing = false
                this.state.isLoading = false
            } else {
                this.handleError(this.props.errorCode, this.props.error);
            }
        }
    }

    validateData() {
        const { name, phone } = this.state;
        if (name == null) {
            this.showMessage(localizes('userProfile.fillName'));
            this.name.focus()
            return false;
        } else if (name.trim() == '') {
            this.showMessage(localizes('userProfile.fillName'));
            this.name.focus()
            return false;
        } else if (phone == null) {
            this.showMessage(localizes('userProfile.fillPhone'));
            this.phone.focus()
            return false;
        } else if (!Utils.validatePhone(phone.trim())) {
            this.showMessage(localizes('userProfile.fillPhoneRightFormat'));
            this.phone.focus();
            return false;
        } else if (Utils.validatePhoneContainSpecialCharacter(phone.trim()) ||
            Utils.validatePhoneContainWord(phone.trim())) {
            this.showMessage(localizes('userProfile.fillPhoneRightFormat'));
            this.phone.focus();
            return false;
        } else if (phone.trim().length != 10 || phone.charAt(0) != '0') {
            this.showMessage(localizes('userProfile.fillPhoneRightFormat'));
            this.phone.focus();
            return false;
        }
        return true;
    }

    onEditData = (url = null) => {
        if (this.validateData()) {
            if (this.state.avatar == null || (this.state.avatar && this.state.avatar.indexOf('http') != -1)) {
                let data = {
                    name: this.state.name,
                    phone: this.state.phone,
                    avatar: url ? url : this.state.avatar
                }
                this.props.editProfile(data)
            } else {
                this.uploadImage(this.state.avatar)
            }
        }
    }

    uploadImage = (uri) => {
        this.setState({
            isLoading: true,
            isEdit: false
        })
        let fr = storage().ref(`user/${this.state.user.id}/avatar`);
        fr.putFile(uri, { contentType: 'image/jpeg' }).on(
            storage.TaskEvent.STATE_CHANGED,
            snapshot => {
                if (snapshot.state == "success") {
                    fr.getDownloadURL().then((url) => {
                        this.setState({
                            avatar: url
                        }, () => {
                            this.onEditData(url)
                        })
                    })
                }
            }, error => {
                setError(error);
            }
        );
    }

    /**
 * Attach file
 */
    attachFile = () => {
        this.showDialog();
    };

    /**
     * Show dialog
     */
    showDialog() {
        this.setState({
            visibleDialog: true
        });
    }

    /**
     * hide dialog
     */
    hideDialog() {
        this.setState({
            visibleDialog: false
        });
    }

    /**
     * Called when selected type
     * @param {*} index
     */
    onSelectedType(index) {
        if (index !== CANCEL_INDEX) {
            if (index === 0) {
                this.takePhoto();
            } else if (index === 1) {
                this.showDocumentPicker();
            }
        } else {
            this.hideDialog();
        }
    }

    /**
      * Show document picker
      */
    showDocumentPicker = async fileType => {
        const hasCameraPermission = await this.hasPermission(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (!hasCameraPermission) {
            this.hideDialog();
            return;
        }
        try {
            launchImageLibrary({
                mediaType: 'photo',
                quality: 1
            }, response => {
                const { error, uri } = response;
                this.hideDialog();
                if (uri && !error) {
                    this.setState({
                        avatar: uri
                    })
                } else if (error) {
                    console.log("The photo picker error. Check ImagePicker.launchCamera func", error)
                }
            });
        } catch (error) {
            console.log("image picker", error);
        }
    };

    takePhoto = async () => {
        const hasCameraPermission = await this.hasPermission(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (!hasCameraPermission) return;
        launchCamera({
            mediaType: 'photo',
            quality: 1
        }, response => {
            const { error, uri } = response;
            this.hideDialog();
            if (uri && !error) {
                this.setState({
                    avatar: uri
                })
            } else if (error) {
                console.log("The photo picker error. Check ImagePicker.launchCamera func", error)
            }
        });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    title={localizes('userProfile.title').toUpperCase()}
                    onBack={this.onBack}
                />
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{
                        flex: 1,
                        paddingHorizontal: Constants.PADDING_X_LARGE
                    }}>
                    {Utils.isNull(this.state.user) ? this.renderNotLogin() : this.renderInfo()}
                </ScrollView>
            </View>
        )
    }

    renderFileSelectionDialog() {
        return (
            <DialogCustom
                visible={this.state.visibleDialog}
                isVisibleTitle={true}
                isVisibleContentForChooseImg={true}
                contentTitle={localizes("dialog.title")}
                onTouchOutside={() => {
                    this.setState({ visibleDialog: false });
                }}
                onPressX={() => {
                    this.setState({ visibleDialog: false });
                }}
                onPressCamera={() => {
                    this.onSelectedType(0);
                }}
                onPressGallery={() => {
                    this.onSelectedType(1);
                }}
            />
        );
    }

    renderNotLogin = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={commonStyles.text}>{localizes('userProfile.gotoSignIn')}</Text>
                <Pressable style={styles.buttonSignIn} onPress={() => {
                    this.props.navigation.navigate("Login")
                }}>
                    <Text style={[commonStyles.text]}>{localizes('userProfile.signIn').toUpperCase()}</Text>
                </Pressable>
            </View>
        )
    }

    renderInfo = () => {
        let { user, email, phone, avatar, name } = this.state;
        return (
            <View style={{ flex: 1, marginTop: Constants.MARGIN_X_LARGE }}>
                <View style={{ alignItems: 'center', marginBottom: Constants.MARGIN_XX_LARGE }}>
                    <ImageLoader path={this.state.avatar} style={{ width: 80, height: 80, borderRadius: Constants.BORDER_RADIUS }} resizeModeType={'cover'} />
                    {this.state.isEdit && <Pressable
                        onPress={() => { this.showDialog() }}
                        style={{
                            backgroundColor: Colors.COLOR_DRK_GREY,
                            position: 'absolute',
                            bottom: - 12,
                            right: Constants.MAX_WIDTH / 2 - 58,
                            padding: 8,
                            borderRadius: 56
                        }}>
                        <Image source={ic_image} />
                    </Pressable>}
                </View>
                <TextInputCustom
                    editable={this.state.isEdit}
                    onRef={(r) => (this.name = r)}
                    oneLine={true}
                    label={localizes('userProfile.userName')}
                    placeholder={localizes('userProfile.userName')}
                    value={name}
                    onChangeText={(txt) => {
                        this.setState({ name: txt });
                    }}
                    onSubmitEditing={() => {
                    }}
                    returnKeyType={'next'}
                />
                <TextInputCustom
                    editable={this.state.isEdit}
                    onRef={(r) => (this.phone = r)}
                    oneLine={true}
                    label={localizes('userProfile.phone')}
                    placeholder={localizes('userProfile.phone')}
                    value={phone}
                    onChangeText={(txt) => {
                        this.setState({ phone: txt });
                    }}
                    onSubmitEditing={() => {
                    }}
                    keyboardType={"phone-pad"}
                    returnKeyType={'done'}
                />
                <TextInputCustom
                    editable={false}
                    onRef={(r) => (this.email = r)}
                    oneLine={true}
                    label={localizes('userProfile.email')}
                    placeholder={localizes('userProfile.email')}
                    value={email}
                    onChangeText={(txt) => {
                        this.setState({ email: txt });
                    }}
                    onSubmitEditing={() => {
                    }}
                    keyboardType={"email-address"}
                    returnKeyType={'next'}
                />
                <View style={{ marginTop: Constants.MARGIN_X_LARGE }}>
                    {this.state.isEdit ?
                        <Button
                            onPress={() => { this.onEditData() }}
                            title={localizes('userProfile.save').toUpperCase()}
                            border={{ borderWidth: 1, borderColor: Colors.COLOR_BLUE }}
                            titleStyle={{ fontWeight: 'bold', color: Colors.COLOR_BLUE }} />
                        : <Button
                            onPress={() => { this.setState({ isEdit: true }, () => { this.name.focus() }) }}
                            title={localizes('userProfile.edit').toUpperCase()}
                            titleStyle={{ fontWeight: 'bold', color: '#a5a5a5' }}
                            backgroundColor={Colors.COLOR_DRK_GREY} />}
                </View>
                {this.renderFileSelectionDialog()}
                {this.showLoadingBar(this.props.isLoading || this.state.isLoading)}
            </View>
        );
    };

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


export default connect(mapStateToProps, mapDispatchToProps)(UserProfileView)
