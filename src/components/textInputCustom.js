import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    Animated,
    TouchableWithoutFeedback,
    StyleSheet,
    Platform,
    Keyboard,
    Pressable,
} from 'react-native';
import { Container, Header, Content, Form, Item, Label, Textarea } from 'native-base';
import PropTypes from 'prop-types';
import commonStyles from 'styles/commonStyles';
import { Colors } from 'values/colors';
import { Constants } from 'values/constants';
import { Fonts } from 'values/fonts';
import Utils from 'utils/utils';
import StringUtil from 'utils/stringUtil';

/**
 * This is text input custom without using state to change value
 * You can use this component instead of TextInput
 */

export default class TextInputCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value ? props.value : '',
            isFocus: false
        };
        this.animate = new Animated.Value(0);
    }

    keyboardDidShow = () => { };

    keyboardDidHide = () => { };

    componentDidMount = () => {
        this.keyboardEventListeners = [
            Keyboard.addListener('keyboardDidShow', this.keyboardDidShow),
            Keyboard.addListener('keyboardDidHide', this.keyboardDidHide),
        ];
        Animated.spring(this.animate, {
            toValue: this.state.value == '' || this.state.value == null ? 0 : 1,
            friction: 5,
        }).start();
        if (this.state.value == '' || this.state.value == null) {
        } else {
            this.setState({
                isFocus: true,
            });
        }
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
        });
    }

    componentWillUnmount() {
        this.keyboardEventListeners && this.keyboardEventListeners.forEach((eventListener) => eventListener.remove());
    }

    render() {
        const { multiLines, oneLine } = this.props;
        return (
            <View>
                {multiLines ? this.renderInputMultiLines() : null}
                {oneLine ? this.renderInputOneLine() : null}
            </View>
        );
    }

    renderInputOneLine() {
        const {
            inputNormalStyle,
            autoCapitalize,
            returnKeyType,
            placeholder,
            onSubmitEditing,
            keyboardType,
            secureTextEntry,
            styleInputGroup,
            onPressRight,
            onPressLeft,
            styleIcon,
            placeholderTextColor,
            onBlur,
            onSelectionChange,
            blurOnSubmit,
            onFocus,
            numberOfLines,
            contentLeft,
            contentRight,
            label,
        } = this.props;
        const { isFocus, value } = this.state;
        return (
            <View style={[styles.input, styleInputGroup, {borderBottomColor: isFocus? Colors.COLOR_BLUE: Colors.COLOR_TEXT_HOLDER, borderBottomWidth: 2}]}>
                {contentLeft && (
                    <Pressable onPress={onPressLeft} style={{ padding: Constants.PADDING_LARGE }}>
                        <Image source={contentLeft} style={[styleIcon]} />
                    </Pressable>
                )}
                <View style={{ flex: 1 }}>
                    {this.renderLabel()}
                    <TextInput
                        {...this.props}
                        ref={(ref) => {
                            if (this.props.onRef) this.props.onRef(ref);
                        }}
                        secureTextEntry={secureTextEntry}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor || Colors.COLOR_TEXT_HOLDER}
                        returnKeyType={returnKeyType}
                        autoCapitalize={autoCapitalize}
                        style={[
                            styles.inputText,
                            {
                                textAlignVertical: 'center',
                                paddingTop: Constants.PADDING_LARGE
                            },
                            inputNormalStyle,
                        ]}
                        value={value}
                        onChangeText={this.changeText}
                        onSubmitEditing={onSubmitEditing}
                        keyboardType={keyboardType}
                        onSelectionChange={onSelectionChange}
                        blurOnSubmit={true}
                        onFocus={this.onfocus}
                        onBlur={this.onBlur}
                        numberOfLines={numberOfLines}
                    />
                </View>
                {contentRight && (
                    <Pressable onPress={onPressRight} style={{ padding: Constants.PADDING_LARGE }}>
                        <Image source={contentRight} style={[styleIcon]} />
                    </Pressable>
                )}
            </View>
        );
    }

    renderInputMultiLines() {
        const {
            inputNormalStyle,
            onBlur,
            onFocus,
            styleInputGroup,
            placeholder,
            visibleHr,
            placeholderTextColor,
            label,
            numberOfLines,
            onSubmitEditing
        } = this.props;
        const { isFocus, value } = this.state;
        let top = this.animate.interpolate({
            inputRange: [0, 1],
            outputRange: [12, 4],
        });
        return (
            <View style={[styles.input, styles.inputMultiline, styleInputGroup]}>
                <View style={{ flex: 1 }}>
                    {this.renderLabel()}
                    <TextInput
                        {...this.props}
                        ref={(ref) => {
                            if (this.props.onRef) this.props.onRef(ref);
                        }}
                        style={[
                            styles.inputText,
                            {
                                textAlignVertical: label && (isFocus || !StringUtil.isNullOrEmpty(value))
                                    ? 'top'
                                    : numberOfLines > 1 ? 'top' : 'center',
                                paddingTop: (isFocus || !StringUtil.isNullOrEmpty(value))
                                    && Platform.OS === 'ios' ? Constants.PADDING_LARGE : Constants.PADDING_LARGE
                            },
                            inputNormalStyle,
                        ]}
                        value={value}
                        placeholder={placeholder}
                        onChangeText={this.changeText}
                        blurOnSubmit={false}
                        multiline={true}
                        numberOfLines={numberOfLines}
                        onSubmitEditing={onSubmitEditing}
                        onFocus={this.onfocus}
                        onBlur={this.onBlur}
                        placeholderTextColor={placeholderTextColor || Colors.COLOR_TEXT_HOLDER}
                    />
                </View>
                {this.renderIconRight()}
            </View>
        );
    }

    /**
     * Render label
     */
    renderLabel() {
        const { label, warnLabel, isInputAction, isMultiLines } = this.props;
        const { value, isFocus } = this.state;
        let top = this.animate.interpolate({
            inputRange: [0, 1],
            outputRange: [8, 3],
        });
        return (
            label && (
                <Animated.Text
                    numberOfLines={1}
                    style={[
                        styles.label,
                        { position: isMultiLines && (isFocus || !StringUtil.isNullOrEmpty(value)) ? 'relative' : 'absolute' },
                        isInputAction || !StringUtil.isNullOrEmpty(value)
                            ? {
                                top: 3,
                                fontSize: !Utils.isNull(value) ? Fonts.FONT_SIZE_X_SMALL : Fonts.FONT_SIZE_MEDIUM,
                                opacity: !Utils.isNull(value) ? 1 : 0,
                                color: !Utils.isNull(warnLabel) ? Colors.COLOR_RED : Colors.COLOR_BLUE,
                            }
                            : {
                                top: top,
                                fontSize: (isFocus || !StringUtil.isNullOrEmpty(value)) ? Fonts.FONT_SIZE_X_SMALL : Fonts.FONT_SIZE_MEDIUM,
                                opacity: (isFocus || !StringUtil.isNullOrEmpty(value)) ? 1 : 0,
                                color: !Utils.isNull(warnLabel) ? Colors.COLOR_RED : Colors.COLOR_BLUE,
                            },
                    ]}
                >
                    {!Utils.isNull(warnLabel) ? warnLabel : label}
                </Animated.Text>
            )
        );
    }

    /**
     * On focus
     */
    onfocus = () => {
        const { onFocus } = this.props;
        Animated.spring(this.animate, {
            toValue: 1,
            friction: 5,
        }).start();
        if (onFocus) {
            onFocus();
        }
        this.setState({
            isFocus: true,
        });
    };

    /**
     * On blur
     */
    onBlur = () => {
        const { onBlur } = this.props;
        Animated.spring(this.animate, {
            toValue: this.state.value == '' || this.state.value == null ? 0 : 1,
            friction: 5,
        }).start();
        if (onBlur) {
            onBlur();
        }
        this.setState({
            isFocus: this.state.value == '' || this.state.value == null ? false : true,
        });
    };

    changeText = (text) => {
        this.setState({
            value: text,
        });
        if (this.props.onChangeText) this.props.onChangeText(text);
    };

    renderIconRight() {
        const {
            styleIcon,
            contentRight,
            onPressRight
        } = this.props;
        return contentRight && (
            <TouchableOpacity onPress={onPressRight} style={{ padding: Constants.PADDING_LARGE }}>
                <Image source={contentRight} style={[styleIcon]} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        marginHorizontal: Constants.MARGIN_X_LARGE,
        marginVertical: Constants.MARGIN,
        borderRadius: Constants.CORNER_RADIUS,
        paddingHorizontal: Constants.PADDING,
        backgroundColor: Colors.COLOR_TEXT_INPUT_BG
    },
    inputText: {
        ...commonStyles.text,
        flex: 1,
        margin: 0,
        paddingVertical: Constants.PADDING + 2,
        paddingHorizontal: Constants.PADDING_LARGE,
    },
    label: {
        position: 'absolute',
        paddingHorizontal: Constants.PADDING_LARGE,
        backgroundColor: 'transparent',
        left: 0,
        right: 0
    },
    icon: {
        padding: Constants.PADDING_LARGE,
    },
    inputMultiline: {
        height: 'auto',
        minHeight: 50,
    },
});
