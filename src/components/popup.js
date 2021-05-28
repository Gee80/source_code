import React, { Component } from "react";
import { View, StatusBar, Image,
    StyleSheet,Pressable, ScrollView, Text
} from "react-native";
import {
    Container, Content
} from "native-base";
import { Colors } from "values/colors";
import { Constants } from "values/constants";
import commonStyles from "styles/commonStyles";
import StringUtil from "utils/stringUtil";
import { Fonts } from "values/fonts";
import Modal from "react-native-modal";
import DateUtil from "utils/dateUtil";
import Utils from "utils/utils";

export default class Popup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: '',
            visible: false
        };
        this.idSelling = null;
    }

    componentDidUpdate = (prevProps, prevState) => {
    }

    componentWillMount = () => {
        this.getSourceUrlPath();
    }

    componentWillReceiveProps (nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps
        }
    }

    showModal () {
        this.setState({
            visible: true
        })
    }

    hideModal () {
        this.setState({
            visible: false
        })
    }

    render () {
        const { content, onPressYes, onPressNo, modalVisible, isVisibleButtonNo } = this.props;
        return (
            <Modal
                ref={"modalPopup"}
                style={{
                    backgroundColor: 'transparent',
                    margin: 0,
                    justifyContent: 'center',
                }}
                isVisible={this.state.visible}
                onBackButtonPress={() => {
                    this.hideModal()
                }}
                backdropOpacity={0.5}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationInTiming={500}
                animationOutTiming={500}
                backdropTransitionInTiming={500}
                backdropTransitionOutTiming={500}
                useNativeDriver={true}
                coverScreen={true}
                deviceHeight={Constants.MAX_HEIGHT}
            >
                <View style={[styles.viewContainer]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: Fonts.FONT_SIZE_XX_MEDIUM }} >
                            {content()}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: "row-reverse",
                        marginTop: Constants.MARGIN_X_LARGE * 1.5
                    }}>
                        <Pressable
                            style={{ marginRight: Constants.MARGIN_LARGE }}
                            onPress={() => {
                                this.hideModal()
                                if (onPressYes != null) {
                                    onPressYes()
                                }
                            }
                            }>
                            <Text style={[commonStyles.textBold, {
                                ...Fonts.FONT_500,
                                color: Colors.COLOR_BLUE_SEA, margin: 0,
                                fontSize: Fonts.FONT_SIZE_MEDIUM
                            }]}>
                                Yes
                            </Text>
                        </Pressable>
                        {isVisibleButtonNo == false ? null :
                            <Pressable
                                style={{ marginRight: Constants.MARGIN_XX_LARGE }}
                                onPress=
                                {() => {
                                    this.hideModal()
                                    if (onPressNo != null) {
                                        onPressNo()
                                    }
                                }
                                }>
                                <Text style={[commonStyles.textBold, {
                                    ...Fonts.FONT_500,
                                    color: Colors.COLOR_BLUE_SEA,
                                    margin: 0, fontSize: Fonts.FONT_SIZE_MEDIUM
                                }]}>
                                    No
                                </Text>
                            </Pressable>
                        }
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.COLOR_BLACK_OPACITY_50
    },
    viewContainer: {
        backgroundColor: Colors.COLOR_WHITE,
        marginHorizontal: Constants.MARGIN_X_LARGE,
        width: screen.width - Constants.MARGIN_XX_LARGE,
        paddingHorizontal: Constants.MARGIN_X_LARGE,
        borderRadius: Constants.CORNER_RADIUS,
        borderColor: Colors.COLOR_DRK_GREY,
        paddingBottom: Constants.PADDING_LARGE + Constants.MARGIN,
        paddingTop: Constants.PADDING_LARGE + Constants.MARGIN
    }
});