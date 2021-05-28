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
import ItemCategory from './itemCategory';
import styles from "./styles";
import cat1 from 'images/cat1.jpg';
import cat2 from 'images/cat2.jpg';
import cat3 from 'images/cat3.jpg';
import cat4 from 'images/cat4.jpg';
import cat5 from 'images/cat5.jpg';
import cat6 from 'images/cat6.jpg';
import cat7 from 'images/cat7.jpg';
import cat8 from 'images/cat8.jpg';
import { localizes } from 'locales/i18n';

export class CategoryList extends BaseView {

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
            <ItemCategory
                key={index}
                item={item}
                index={index}
                onPress={this.onPress}
            />
        )
    }

    onPress = (item) => {
        this.props.navigation.navigate('CourseList', { categoryId: item.id, categoryTitle: item.name })
    }

    render() {
        return (
            <View>
                <ImageBackground
                    source={cat1}
                    imageStyle={styles.imgBackground}
                    style={styles.itemCategory}
                >
                    <Pressable
                        onPress={() => { this.props.navigation.navigate('CourseList', { categoryId: Constants.NEW_RELEASE, categoryTitle: localizes("newRelease_v2") }) }}
                        android_ripple={Constants.ANDROID_RIPPLE}
                        style={styles.btnCat}>
                        <Text numberOfLines={2} style={styles.txtCat}>{localizes("newRelease")}</Text>
                    </Pressable>
                </ImageBackground>
                <ImageBackground
                    source={cat2}
                    imageStyle={styles.imgBackground}
                    style={styles.itemCategory}
                >
                    <Pressable
                        onPress={() => { this.props.navigation.navigate('RecommendList') }}
                        android_ripple={Constants.ANDROID_RIPPLE}
                        style={styles.btnCat}>
                        <Text numberOfLines={2} style={styles.txtCat}>{localizes("recommend")}</Text>
                    </Pressable>
                </ImageBackground>
                <FlatListCustom
                    onRef={(ref) => { this.flatListRef = ref }}
                    contentContainerStyle={{
                        flexGrow: 1
                    }}
                    style={{
                    }}
                    data={this.props.dataCat}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    itemPerCol={2}
                    isShowEmpty={this.props.dataCat.length == 0}
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
