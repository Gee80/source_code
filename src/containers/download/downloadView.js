import React, { Component } from 'react'
import { View, Text, ScrollView, Image, Pressable, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { ErrorCode } from "config/errorCode";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import FlatListCustom from "components/flatListCustom";
import styles from './styles';
import { Container, Content } from 'native-base';
import Header from 'components/header';
import Utils from 'utils/utils';
import commonStyles from 'styles/commonStyles';
import { Constants } from 'values/constants';
import { Fonts } from 'values/fonts';
import { Colors } from 'values/colors';
import ic_search_white from 'images/ic_search_white.png';
import ic_grid_white from 'images/ic_grid_white.png';
import img_iron_man from 'images/img_iron_man.jpg';
import img_download from 'images/img_download.png';
import img_download_guide_1 from 'images/img_download_guide_1.png';
import img_download_guide_2 from 'images/img_download_guide_2.png';
import Button from 'components/button';
import * as userActions from 'actions/userActions'
import * as courseActions from 'actions/courseActions'
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';
import BaseView from 'containers/base/baseView';
import ItemCourseSave from './itemCourseSave'
import StorageUtil from 'utils/storageUtil';
import i18n, { localizes } from "locales/i18n";

const LIST_MENU = [
    {
        name: localizes('userProfile.title'),
        screen: 'UserProfile',
        value: 1
    },
    {
        name: localizes('setting.title'),
        screen: 'Setting',
        value: 2
    }
]
export class DownloadView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            enableLoadMore: false,
            enableRefresh: true,
            refreshing: false
        }
        this.data = []
    }

    componentDidMount = () => {
        this.getProfile()
    }

    getProfile = async () => {
        let user = await StorageUtil.retrieveItem(StorageUtil.USER_PROFILE);
        if (user) {
            this.setState({ user: user })
            this.props.getCourseSave()
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
                if (this.props.action == getActionSuccess(ActionEvent.GET_COURSE_SAVE)) {
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

    onPress = (item) => {
        this.props.navigation.navigate("CourseDetail", { id: item.id })
    }

    /**
     * Render item
     * @param {*} item
     * @param {*} index
     */
    renderItem = (item, index) => {
        return (
            <ItemCourseSave
                key={index}
                item={item}
                length={this.data.length}
                onPress={this.onPress}
            />
        )
    }

    renderList = () => {
        return (
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
                isShowEmpty={!this.props.isLoading && this.data == []}
                isShowImageEmpty={true}
                textForEmpty={''}
            />
        )
    }

    renderHeaderDownload = () => {
        return (
            <View>
                <View style={styles.viewHeaderDownload}>
                    <Image source={img_download} style={styles.imgDownload} />
                    <Text style={styles.titleDownload}>{localizes('favorite.titleIntro')}</Text>
                    <Text style={styles.txtContentDownload}>{localizes('favorite.intro')}</Text>
                </View>
                {this.state.user ? <Button
                    onPress={() => { this.props.navigation.navigate("Search") }}
                    title={localizes('favorite.gotoSearch')}
                    titleStyle={{ fontWeight: 'bold', color: Colors.COLOR_WHITE }}
                    backgroundColor={Colors.COLOR_PRIMARY} /> :
                    <Button
                        onPress={() => { this.props.navigation.navigate("Login") }}
                        title={localizes('favorite.gotoLogin')}
                        titleStyle={{ fontWeight: 'bold', color: Colors.COLOR_WHITE }}
                        backgroundColor={Colors.COLOR_PRIMARY}
                    />}
            </View>
        )
    }

    renderDownloadGuide = () => {
        return (
            <View style={styles.viewHowTo}>
                <Text style={styles.txtHowTo}>{localizes('favorite.how')}</Text>
                <View style={styles.viewDownloadGuide}>
                    <Image source={img_download_guide_1} style={styles.imgDownloadGuide} />
                    <Image source={img_download_guide_2} style={styles.imgDownloadGuide} />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    title={localizes('favorite.title')}
                    visibleBack={false}
                    visibleAccount={true}
                    user={this.state.user}
                    onBack={() => { }}
                    visibleMenu={true}
                    menus={LIST_MENU}
                    navigation={this.props.navigation}
                />
                {this.data.length == 0 && <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                        <RefreshControl
                            progressViewOffset={Constants.HEIGHT_HEADER_OFFSET_REFRESH}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                        />
                    }>
                    {this.renderHeaderDownload()}
                    {this.renderDownloadGuide()}
                </ScrollView>}
                {this.data.length > 0 && this.renderList()}
                {this.showLoadingBar(this.props.isLoading)}
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.download.data,
    isLoading: state.download.isLoading,
    errorCode: state.download.errorCode,
    action: state.download.action,
})

const mapDispatchToProps = {
    ...userActions,
    ...courseActions
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadView)
