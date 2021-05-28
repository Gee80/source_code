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
import BaseView from 'containers/base/baseView';
import * as userActions from 'actions/userActions'
import * as courseActions from 'actions/courseActions'
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';
import ItemQuestion from './itemQuestion';
import ic_star_yellow from 'images/ic_star_yellow.png'

class QuestionListView extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            enableLoadMore: false,
            enableRefresh: true,
            refreshing: false
        }
        this.courseId = this.props.courseId;
        this.data = [];
        this.filter = {
            page: 1,
            pageSize: Constants.PAGE_SIZE
        }
    }

    componentDidMount = () => {
        if (!Utils.isNull(this.props.onRef)) {
            this.props.onRef(this);
        }
        this.props.getQuestions(this.filter.page, this.filter.pageSize, this.props.courseId, this.props.lessonId)
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
                if (this.props.action == getActionSuccess(ActionEvent.GET_QUESTIONS)) {
                    console.log("GET_QUESTIONS data", data)
                    if (data.data && data.data.payload) {
                        let payload = data.data.payload.questions;
                        if (this.filter.page == 1) this.data = []
                        this.state.enableLoadMore = !(payload.length < Constants.PAGE_SIZE)
                        payload.forEach((e) => {
                            this.data.push({ ...e })
                        })
                    } else {
                        this.state.enableLoadMore = false
                    }
                }
                this.state.refreshing = false
                this.state.isLoadingMore = false
            } else {
                this.handleError(this.props.errorCode, this.props.error);
            }
        }
    }

    onPressItem = (id) => {
    }

    /**
     * Render item
     * @param {*} item
     * @param {*} index
     */
    renderItem = (item, index) => {
        return (
            <ItemQuestion
                key={index}
                item={item}
                length={this.data.length}
                onPress={this.onPress}
            />
        )
    }

    onPress = (item) => {

    }

    render() {
        return (
            <View style={{ flexGrow: 1 }}>
                <FlatListCustom
                    onRef={(ref) => { this.flatListRef = ref }}
                    contentContainerStyle={{
                        marginHorizontal: Constants.MARGIN_LARGE,
                        flexGrow: 1
                    }}
                    style={{
                        flex: 1,
                        marginTop: Constants.MARGIN_XX_LARGE
                    }}
                    data={this.data}
                    renderItem={this.renderItem}
                    enableLoadMore={this.state.enableLoadMore}
                    keyExtractor={item => item.id}
                    onLoadMore={() => { this.onLoadMore() }}
                    showsVerticalScrollIndicator={false}
                    isShowEmpty={!this.props.isLoading && this.data.length == []}
                    isShowImageEmpty={true}
                    textForEmpty={''}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.question.data,
    isLoading: state.question.isLoading,
    errorCode: state.question.errorCode,
    action: state.question.action,
})

const mapDispatchToProps = {
    ...userActions,
    ...courseActions
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionListView);
