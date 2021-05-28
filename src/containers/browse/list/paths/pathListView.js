import React, { Component } from 'react'
import { View, Text, BackHandler, Image, Pressable, ImageBackground } from 'react-native';
import {
    Container, Content, Header, Root
} from "native-base";
import { connect } from 'react-redux'
import { ActionEvent, getActionSuccess } from "actions/actionEvent";
import { ErrorCode } from "config/errorCode";

import BaseView from 'containers/base/baseView';
import StringUtil from "utils/stringUtil";
import commonStyles from "styles/commonStyles";
import { Fonts } from "values/fonts";
import { Constants } from "values/constants";
import { Colors } from "values/colors";
import Utils from "utils/utils";
import StorageUtil from "utils/storageUtil";

import FlatListCustom from "components/flatListCustom";
import ItemPath from './itemPath';
import styles from "./styles";
import { localizes } from 'locales/i18n';

export class PathListView extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            enableLoadMore: false,
            enableRefresh: true,
            refreshing: false
        }
    }

    componentDidMount = () => {
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props !== nextProps) {
            this.props = nextProps;
        }
    }

    /**
     * Render item
     * @param {*} item
     * @param {*} index
     */
    renderItem = (item, index) => {
        return (
            <ItemPath
                key={index}
                item={item}
                index={index}
                onPress={this.onPress}
                horizontal={true}
            />
        )
    }

    onPress = () => {

    }

    render() {
        return (
            <View>
                <View style={styles.viewTitle}>
                    <Text style={styles.titleList}>{localizes('browse.path')}</Text>
                    <Text style={[commonStyles.textSmall, { fontSize: Fonts.FONT_SIZE_XX_SMALL }]}>{localizes('more')}</Text>
                </View>
                <FlatListCustom
                    onRef={(ref) => { this.flatListRef = ref }}
                    contentContainerStyle={{
                        flexGrow: 1
                    }}
                    style={{
                    }}
                    data={this.props.dataPath}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    itemPerCol={1}
                    isShowEmpty={this.props.dataPath.length == 0}
                    isShowImageEmpty={false}
                    textForEmpty={""}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PathListView);
