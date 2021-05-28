import React, { Component } from 'react'
import { View, Text, BackHandler, Image, Pressable, RefreshControl } from 'react-native';
import {
    Container, Content, Root
} from "native-base";
import { connect } from 'react-redux';
import { ErrorCode } from "config/errorCode";
import StringUtil from "utils/stringUtil";
import commonStyles from "styles/commonStyles";
import { Fonts } from "values/fonts";
import { Constants } from "values/constants";
import { Colors } from "values/colors";
import Utils from "utils/utils";
import StorageUtil from "utils/storageUtil";
import FlatListCustom from "components/flatListCustom";
import styles from "./styles";
import Header from 'components/header'
import ItemCourse from '../itemCourse';
import BaseView from 'containers/base/baseView';
import * as userActions from 'actions/userActions'
import * as courseActions from 'actions/courseActions'
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';
import ItemCourseWatching from './itemCourseWatching';


class WatchingListView extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            enableLoadMore: false,
            enableRefresh: true,
            refreshing: false,
            page: 0
        }
        this.data = []
    }

    componentDidMount = () => {
        this.getCourseWatching()
    }

    getCourseWatching = () => {
        this.props.getCourseWatching()
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
                if (this.props.action == getActionSuccess(ActionEvent.GET_COURSE_WATCHING)) {
                    console.log("GET_COURSE_WATCHING data list", data)
                    if (data.data && data.data.payload) {
                        this.data = []
                        this.data = data.data.payload
                    }
                }
                this.state.refreshing = false
                this.state.isLoadingMore = false
            } else {
                this.handleError(this.props.errorCode, this.props.error);
            }
        }
    }

    /**
     * Render item
     * @param {*} item
     * @param {*} index
     */
    renderItem = (item, index) => {
        return (
            <ItemCourseWatching
                key={index}
                item={item}
                horizontal={false}
                length={this.data.length}
                onPress={this.onPress}
            />
        )
    }

    onPress = (item) => {
        this.props.navigation.navigate('CourseDetail', { id: item.id })
    }

    onLoadMore = () => {
        if (this.data.length % Constants.PAGE_SIZE == 0 && this.state.enableLoadMore) {
            this.state.isLoadingMore = true;
        }
    }

    handleRefresh = () => {
        this.state.refreshing = true
        this.getCourseWatching()
    }

    renderNotLogin = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -100 }}>
                <Text style={commonStyles.text}>Please sign in to view your recommend courses</Text>
                <Pressable style={styles.buttonSignIn} onPress={() => {
                    this.props.navigation.navigate("Login")
                }}>
                    <Text style={[commonStyles.text]}>SIGN IN</Text>
                </Pressable>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    title={""}
                    onBack={this.onBack}
                />
                <View style={{ paddingHorizontal: Constants.PADDING_X_LARGE, paddingVertical: Constants.MARGIN_XX_LARGE }}><Text style={[commonStyles.text, { fontSize: Fonts.FONT_SIZE_X_LARGE }]}>ĐANG HỌC</Text></View>
                <FlatListCustom
                    onRef={(ref) => { this.flatListRef = ref }}
                    contentContainerStyle={{
                        marginHorizontal: Constants.MARGIN_LARGE,
                        flexGrow: 1
                    }}
                    style={{
                        flex: 1
                    }}
                    data={this.data}
                    renderItem={this.renderItem}
                    enableLoadMore={this.state.enableLoadMore}
                    keyExtractor={item => item.id}
                    onLoadMore={() => { this.onLoadMore() }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            progressViewOffset={Constants.HEIGHT_HEADER_OFFSET_REFRESH}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                        />
                    }
                    isShowEmpty={!this.props.isLoading && this.data.length == []}
                    isShowImageEmpty={true}
                    textForEmpty={''}
                />
                {!this.state.refreshing && !this.state.isLoadingMore && this.showLoadingBar(this.props.isLoading)}
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.course.data,
    isLoading: state.course.isLoading,
    errorCode: state.course.errorCode,
    action: state.course.action,
})

const mapDispatchToProps = {
    ...userActions,
    ...courseActions
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchingListView);
