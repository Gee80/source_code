import React, { Component } from 'react';
import { Pressable, Text } from 'react-native';
import { Constants } from 'values/constants';
import { Colors } from 'values/colors';
import commonStyles from 'styles/commonStyles'

const Button = ({ title, onPress, style, border, backgroundColor, titleStyle }) => {
    return (
        <Pressable
            android_ripple={{
                color: Colors.COLOR_GREY_LIGHT,
                borderless: false,
            }}
            onPress={() => { onPress() }}
            style={[{
                marginHorizontal:Constants.MARGIN_X_LARGE,
                // width: Constants.MAX_WIDTH - Constants.MARGIN_XX_LARGE,
                padding: Constants.PADDING_LARGE,
                marginVertical: Constants.MARGIN_LARGE,
                justifyContent: 'center',
                alignItems: 'center', backgroundColor: Colors.COLOR_PRIMARY,
                borderRadius: Constants.CORNER_RADIUS,
                backgroundColor: backgroundColor
            }, style, border]}>
            <Text style={[commonStyles.text, titleStyle]}>{title}</Text>
        </Pressable>
    )
};

export default Button;