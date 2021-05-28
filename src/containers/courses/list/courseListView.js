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
import ItemCourse from './itemCourse';
import BaseView from 'containers/base/baseView';
import * as userActions from 'actions/userActions'
import * as courseActions from 'actions/courseActions'
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';
import CategoryId from 'enum/categoryId';


class CourseListView extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            enableLoadMore: false,
            isLoadingMore: false,
            enableRefresh: true,
            refreshing: false,
            page: 0 //user for request list course recommend
        }
        let { categoryId, categoryTitle } = this.props.route.params;
        this.categoryId = categoryId;
        this.categoryTitle = categoryTitle
        this.data = []
        this.course = {
            id: 1,
            title: 'Software Development'
        }

        this.filter = {
            limit: Constants.PAGE_SIZE,
            page: 0
        }
        this.filterSearch = {
            limit: Constants.PAGE_SIZE,
            offset: 0,
            keyword: '',
            opt: {
                sort: {
                    attribute: 'updatedAt',
                    rule: 'DESC'
                },
                category: [
                    this.categoryId
                ],
                time: [
                    {
                        min: 0,
                        max: 1000
                    }
                ],
                price: [
                    {
                        min: 0,
                        max: 100000000
                    }
                ]
            }
        }
        this.filterRecommend = {
            id: null,
            limit: Constants.PAGE_SIZE,
            offset: Constants.PAGE_SIZE * this.state.page
        }
        this.filterGetCourseTopRate = {
            page: 1,
            limit: Constants.PAGE_SIZE
        }
        this.filterGetCourseTopSell = {
            page: 1,
            limit: Constants.PAGE_SIZE
        }
    }

    componentDidMount = () => {
        this.handleGetCourse()
    }

    handleGetCourse = () => {
        switch (this.categoryId) {
            case CategoryId.NEW_RELEASE:
                this.props.getNewCourses(this.filter);
                return;
            case CategoryId.TOP_RATE:
                this.props.getCourseTopRate(this.filterGetCourseTopRate);
                return;
            case CategoryId.TOP_SELL:
                this.props.getCourseTopSell(this.filterGetCourseTopSell);
                return;
            default:
                this.props.search(this.filterSearch);
                return;
        }
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
                if (this.props.action == getActionSuccess(ActionEvent.GET_NEW_COURSES)) {
                    if (data.data && data.data.payload) {
                        let payload = data.data.payload
                        if (payload.length > 0) {
                            this.state.enableLoadMore = !(payload.length < Constants.PAGE_SIZE)
                            payload.forEach(element => {
                                this.data.push({ ...element })
                            });
                            this.showNoData = false
                        } else {
                            this.state.enableLoadMore = false
                            this.showNoData = true;
                        }
                    } else {
                        this.state.enableLoadMore = false
                        this.showNoData = true;
                    }
                } else if (this.props.action == getActionSuccess(ActionEvent.SEARCH)) {
                    if (data.data && data.data.payload.rows) {
                        let payload = data.data.payload.rows
                        if (payload.length > 0) {
                            this.state.enableLoadMore = !(payload.length < Constants.PAGE_SIZE)
                            payload.forEach(element => {
                                this.data.push({ ...element })
                            });
                            this.showNoData = false
                        } else {
                            this.state.enableLoadMore = false
                            this.showNoData = true;
                        }
                    } else {
                        this.state.enableLoadMore = false
                        this.showNoData = true;
                    }
                } else if (this.props.action == getActionSuccess(ActionEvent.GET_COURSE_TOP_RATE)
                    || this.props.action == getActionSuccess(ActionEvent.GET_COURSE_TOP_SELL)) {
                    if (data.data && data.data.payload) {
                        let payload = data.data.payload
                        if (payload.length > 0) {
                            this.state.enableLoadMore = !(payload.length < Constants.PAGE_SIZE)
                            payload.forEach(element => {
                                this.data.push({ ...element })
                            });
                            this.showNoData = false
                        } else {
                            this.state.enableLoadMore = false
                            this.showNoData = true;
                        }
                    } else {
                        this.state.enableLoadMore = false
                        this.showNoData = true;
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
            <ItemCourse
                key={index}
                item={item}
                horizontal={false}
                length={this.data.length}
                onPress={this.onPress}
            />
        )
    }

    onPress = (item) => {
        this.props.navigation.push('CourseDetail', { id: item.id })
    }

    onLoadMore = () => {
        if (this.state.enableLoadMore) {
            this.state.isLoadingMore = true;
            this.updateFilter()
            this.handleGetCourse()
        }
    }

    updateFilter = () => {
        switch (this.categoryId) {
            case Constants.NEW_RELEASE:
                this.filter.page = Math.round(this.data.length / Constants.PAGE_SIZE)
                return;
            case CategoryId.TOP_RATE:
                this.filterGetCourseTopRate.page = Math.round(this.data.length / Constants.PAGE_SIZE)
                return;
            case CategoryId.TOP_SELL:
                this.filterGetCourseTopSell.page = Math.round(this.data.length / Constants.PAGE_SIZE)
                return;
            default:
                this.filterSearch.offset = Math.round(this.data.length / Constants.PAGE_SIZE)
                return;
        }
    }

    handleRefresh = () => {
        this.state.refreshing = true
        this.data = []
        this.filter = {
            limit: Constants.PAGE_SIZE,
            page: 0
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    title={""}
                    onBack={this.onBack}
                />
                <View style={{
                    paddingHorizontal: Constants.PADDING_X_LARGE,
                    paddingVertical: Constants.MARGIN_XX_LARGE
                }}>
                    <Text style={[commonStyles.text, { fontSize: Fonts.FONT_SIZE_X_LARGE }]}>{this.categoryTitle}</Text>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseListView);
