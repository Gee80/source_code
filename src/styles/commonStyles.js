import React from "react-native";
import { Dimensions } from 'react-native';
import { Constants } from 'values/constants'
import { Fonts } from 'values/fonts'
import { Colors } from 'values/colors'
import { Platform } from "react-native";

const { StyleSheet } = React;
const window = Dimensions.get('window');

export default {
    text: {
        color: Colors.COLOR_TEXT,
        fontSize: Fonts.FONT_SIZE_X_MEDIUM,
    },
    textPlaceHolder: {
        color: Colors.COLOR_DRK_GREY,
        fontSize: Fonts.FONT_SIZE_X_MEDIUM,
    },
    textBold: {
        color: Colors.COLOR_TEXT,
        fontSize: Fonts.FONT_SIZE_X_MEDIUM,
        fontWeight: 'bold'
    },
    textItalic: {
        color: Colors.COLOR_TEXT,
        fontSize: Fonts.FONT_SIZE_X_MEDIUM,
        margin: Constants.MARGIN,
        fontStyle: 'italic',
    },
    textBoldItalic: {
        color: Colors.COLOR_TEXT,
        fontSize: Fonts.FONT_SIZE_X_MEDIUM,
        margin: Constants.MARGIN,
        fontStyle: 'italic',
    },
    title: {
        color: Colors.COLOR_TEXT,
        fontSize: Fonts.FONT_SIZE_LARGE,
        margin: Constants.MARGIN,
    },
    titleBold: {
        color: Colors.COLOR_TEXT,
        fontSize: Fonts.FONT_SIZE_LARGE,
        margin: Constants.MARGIN,
        fontWeight: 'bold'
    },
    textSmall: {
        color: Colors.COLOR_TEXT,
        fontSize: Fonts.FONT_SIZE_X_SMALL,
    },
    textSmallBold: {
        color: Colors.COLOR_TEXT,
        fontSize: Fonts.FONT_SIZE_XX_SMALL,
        fontWeight: 'bold'
    },
    textSmallItalic: {
        color: Colors.COLOR_TEXT,
        fontSize: Fonts.FONT_SIZE_XX_SMALL,
        fontStyle: 'italic'
    },
    buttonStyle: {
        borderRadius: Constants.CORNER_RADIUS,
        margin: Constants.MARGIN_X_LARGE,
        padding: Constants.PADDING
    },
    inputText: {
        paddingVertical: Constants.PADDING_LARGE,
        paddingHorizontal: Constants.MARGIN_X_LARGE
    },
    shadowOffset: {
        elevation: Constants.ELEVATION,
        shadowOffset: {
            width: Constants.SHADOW_OFFSET_WIDTH,
            height: Constants.SHADOW_OFFSET_HEIGHT
        },
        shadowOpacity: Constants.SHADOW_OPACITY,
        shadowColor: Colors.COLOR_GREY_LIGHT
    },
    header: {
        backgroundColor: Colors.COLOR_TAB,
        borderBottomWidth: 0,
        alignItems: 'center'
    },
    cardView: {
        elevation: Constants.ELEVATION,
        shadowOffset: {
            width: Constants.SHADOW_OFFSET_WIDTH,
            height: Constants.SHADOW_OFFSET_HEIGHT
        },
        shadowOpacity: Constants.SHADOW_OPACITY,
        shadowColor: Colors.COLOR_GREY_LIGHT,
        backgroundColor: Colors.COLOR_WHITE,
        paddingHorizontal: Constants.PADDING_LARGE,
        paddingVertical: Constants.PADDING_LARGE,
        borderRadius: Constants.CORNER_RADIUS,
        marginVertical: Constants.MARGIN_LARGE,
    }
};