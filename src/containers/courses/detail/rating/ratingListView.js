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
import ItemRating from './itemRating';
import ic_star_yellow from 'images/ic_star_yellow.png'

class RatingListView extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            enableLoadMore: false,
            enableRefresh: true,
            refreshing: false
        }
        this.courseId = this.props.id;
        this.data = this.props.dataRatings;
    }

    componentDidMount = () => {
        if (!Utils.isNull(this.props.onRef)) {
            this.props.onRef(this);
        }
        // this.getRating()
    }

    getRating = () => {
        this.props.getCourseRating(this.props.courseId)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.props = nextProps;
            this.handleData();
            this.data = nextProps.dataRatings;
        }
    }

    handleData = () => {
        let data = this.props.data;
        if (this.props.errorCode != ErrorCode.ERROR_INIT) {
            if (this.props.errorCode == ErrorCode.ERROR_SUCCESS) {
                if (this.props.action == getActionSuccess(ActionEvent.GET_COURSE_RATING)) {
                    console.log("GET_COURSE_RATING data", data)
                    if (data.data && data.data.payload) {

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
            <ItemRating
                key={index}
                item={item}
                length={this.props.dataRatings.ratingList.length}
                onPress={this.onPress}
            />
        )
    }

    onPress = (item) => {

    }

    calculateStar = () => {
        let stars = this.data.stars
        let result = 0.0
        stars.forEach((e, i) => {
            result = result + (i + 1) * (e / 100)
        });
        return Math.round(result * 10) / 10
    }

    renderHeaderRating = () => {
        let dataRating = this.data != null && this.data.stars != null ? this.data.stars.slice().reverse() : [];

        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: Constants.MARGIN_X_LARGE,
                marginTop: Constants.MARGIN_X_LARGE
            }}>
                <View style={{}}>
                    <View style={{
                        backgroundColor: Colors.COLOR_GREY_BLUE_LIGHT,
                        borderRadius: Constants.BORDER_RADIUS,
                        alignItems: 'center',
                        width: 70, height: 70,
                        justifyContent: 'center',
                        paddingVertical: Constants.PADDING_X_LARGE,
                        paddingHorizontal: Constants.PADDING_X_LARGE
                    }}>
                        <Text style={{ ...commonStyles.textBold, fontSize: Fonts.FONT_SIZE_XX_LARGE - 4 }}>{this.data && this.calculateStar()}</Text>
                    </View>
                    <Text style={[commonStyles.textSmall, { textAlign: 'center', marginTop: Constants.MARGIN_LARGE }]}>{this.data != null && this.data.ratingList != null ? this.data.ratingList.length : 0} đánh giá</Text>
                </View>
                <View style={{ flex: 1, marginLeft: Constants.MARGIN_XX_LARGE }}>
                    {dataRating.map((item, index) => {
                        return (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ ...commonStyles.text, color: Colors.COLOR_YELLOW, alignItems: 'center' }}>{Math.abs(index - 5)} <Image source={ic_star_yellow} /></Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginHorizontal: Constants.MARGIN_X_LARGE }}>
                                    <View style={{
                                        height: 6, width: `${item}%`,
                                        backgroundColor: Colors.COLOR_GREY_LIGHT,
                                        borderRadius: Constants.CORNER_RADIUS
                                    }} />
                                    <View style={{
                                        height: 6, width: `${100 - item}%`,
                                        backgroundColor: Colors.COLOR_DRK_GREY,
                                        borderRadius: Constants.CORNER_RADIUS
                                    }} />
                                </View>
                                <Text style={{ ...commonStyles.textSmall, color: Colors.COLOR_GREEN, width: 30 }}>{this.data != null && this.data.stars != null ? item + '%' : '0%'}</Text>
                            </View>
                        )
                    })}

                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flexGrow: 1 }}>
                {this.renderHeaderRating()}
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
                    data={this.props.dataRatings && this.props.dataRatings.ratingList ? this.props.dataRatings.ratingList : []}
                    renderItem={this.renderItem}
                    enableLoadMore={this.state.enableLoadMore}
                    keyExtractor={item => item.id}
                    onLoadMore={() => { this.onLoadMore() }}
                    showsVerticalScrollIndicator={false}
                    isShowEmpty={!this.props.isLoading && this.props.dataRatings && this.props.dataRatings.ratingList.length == []}
                    isShowImageEmpty={true}
                    textForEmpty={''}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.rating.data,
    isLoading: state.rating.isLoading,
    errorCode: state.rating.errorCode,
    action: state.rating.action,
})

const mapDispatchToProps = {
    ...userActions,
    ...courseActions
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingListView);
