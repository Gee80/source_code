'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, View, TextInput } from 'react-native';
import { Tabs, ScrollableTab, Tab } from 'native-base';
import commonStyles from 'styles/commonStyles';
import { Colors } from 'values/colors';
import { Constants } from 'values/constants';
import { Fonts } from 'values/fonts';
import Utils from 'utils/utils';

export default class TabsCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        const {
            tabs = [],
            child,
            isRenderTabBar,
            initialPage,
            onChangeTab,
            onScroll,
            disableScroll = false,
            elevation = Constants.ELEVATION
        } = this.props;
        return (
            <Tabs
                initialPage={initialPage}
                renderTabBar={
                    isRenderTabBar
                        ? () => (
                            <ScrollableTab
                                tabsContainerStyle={{ backgroundColor: Colors.COLOR_WHITE }}
                                style={styles.scrollableTab}
                            />
                        )
                        : null
                }
                locked={disableScroll}
                tabContainerStyle={{ elevation: 4, borderBottomWidth: 0 }}
                tabBarUnderlineStyle={[styles.tabBarUnderlineStyle]}
                onChangeTab={(event) => onChangeTab && onChangeTab(event)}
                onScroll={(event) => onScroll && onScroll(event)}
            >
                {tabs.map((tab, index) => {
                    return (
                        <Tab
                            key={index.toString()}
                            heading={tab.name}
                            tabStyle={styles.tabStyle}
                            activeTabStyle={styles.activeTabStyle}
                            textStyle={styles.textStyle}
                            activeTextStyle={styles.activeTextStyle}
                        >
                            {child(tab)}
                        </Tab>
                    );
                })}
            </Tabs>
        );
    };
}

TabsCustom.defaultProps = {};

TabsCustom.propTypes = {};

const styles = {
    tabBarUnderlineStyle: {
        backgroundColor: Colors.COLOR_PRIMARY,
        height: 3,
    },

    tabStyle: {
        backgroundColor: Colors.COLOR_WHITE,
        borderBottomWidth: Constants.BORDER_WIDTH,
        borderBottomColor: Colors.COLOR_WHITE,
    },

    activeTextStyle: {
        ...commonStyles.textBold,
        color: Colors.COLOR_PRIMARY,
    },

    activeTabStyle: {
        backgroundColor: Colors.COLOR_WHITE,
    },

    textStyle: {
        ...commonStyles.textBold,
        color: Colors.COLOR_GREY_LIGHT
    },

    scrollableTab: {
        borderWidth: 0,
        backgroundColor: Colors.COLOR_WHITE,
        elevation: 0
    },
};
