import React from 'react'
import { View, StatusBar, Image, Text, Pressable } from 'react-native'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Colors } from 'values/colors'
import { Constants } from 'values/constants'
import { Header as HeaderNB } from "native-base";
import commonStyles from 'styles/commonStyles';
import ic_back_white from "images/ic_back_white.png";
import ImageLoader from './imageLoader'
import ic_menu_vertical from 'images/ic_menu_vertical.png';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

export default class Header extends React.Component {
    render() {
        return (
            <HeaderNB style={{ ...commonStyles.header }}>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    {this.props.visibleBack ?
                        <Pressable
                            android_ripple={{
                                color: Colors.COLOR_WHITE,
                                borderless: false,
                            }}
                            style={{
                                flex: 0,
                                padding: Constants.PADDING_LARGE
                            }}
                            onPress={() => {
                                if (this.props.onBack)
                                    this.props.onBack();
                            }}
                        >
                            <Image source={ic_back_white} />
                        </Pressable>
                        : null}
                    <View style={{
                        flex: 1
                    }}>
                        <Text numberOfLines={1} style={[commonStyles.title, {
                            textAlign: "left",
                            marginHorizontal: this.props.visibleBack ? Constants.MARGIN_XX_LARGE : Constants.MARGIN_X_LARGE,
                        }]}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {this.props.visibleAccount && this.renderUser()}
                        {this.props.visibleMenu && this.renderMenu()}
                    </View>
                </View>
                <StatusBar
                    animated={true}
                    backgroundColor={this.props.headerColor}
                    barStyle={this.props.barStyle}  // dark-content, light-content and default
                    hidden={false}  //To hide statusBar
                // translucent={this.props.barTranslucent}  //allowing light, but not detailed shapes
                />
            </HeaderNB>
        )
    }

    renderUser = () => {
        return (
            <Pressable
                android_ripple={Constants.ANDROID_RIPPLE}
                onPress={() => {
                    if (this.props.onPressAccount) this.props.onPressAccount()
                    else this.props.navigation.navigate('UserProfile')
                }}>
                <ImageLoader
                    path={this.props.user?.avatar}
                    resizeModeType={'cover'}
                    style={{ width: 28, height: 28, borderRadius: Constants.BORDER_RADIUS }} />
            </Pressable>
        )
    }

    renderMenu = () => {
        return (
            <View style={{ marginLeft: Constants.MARGIN_X_LARGE }}>
                <Pressable onPress={() => this.menuOption.open()}>
                    <Image source={ic_menu_vertical} />
                </Pressable>
                <Menu
                    style={{
                        backgroundColor: '#414952'
                    }}
                    ref={ref => (this.menuOption = ref)}
                >
                    <MenuTrigger text="" />
                    <MenuOptions>
                        {this.props.menus && this.props.menus.map((item, index) => {
                            return (
                                <MenuOption
                                    key={index}
                                    style={{ backgroundColor: '#414952' }}
                                    onSelect={() => {
                                        if (item.screen != null) {
                                            this.props.navigation?.navigate(item.screen)
                                        } else {
                                        }
                                    }}
                                >
                                    <View style={{ padding: Constants.PADDING_LARGE }}  >
                                        <Text style={{ ...commonStyles.text }}>{item.name}</Text>
                                    </View>
                                </MenuOption>
                            )
                        })}
                    </MenuOptions>
                </Menu>
            </View>
        );
    }


}

Header.propTypes = {
    title: PropTypes.string,
    // onBack: PropTypes.function,
}

Header.defaultProps = {
    title: '',
    visibleBack: true,
    barStyle: 'light-content',
    headerColor: Colors.COLOR_TAB
}