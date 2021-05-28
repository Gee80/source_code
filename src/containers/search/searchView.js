import React, { Component } from 'react'
import { View, Text, ScrollView, Image, Pressable, StatusBar, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { ErrorCode } from "config/errorCode";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import FlatListCustom from "components/flatListCustom";
import styles from './styles';
import { Container, Content, Root, Header } from 'native-base';
import Utils from 'utils/utils';
import commonStyles from 'styles/commonStyles';
import { Constants } from 'values/constants';
import { Fonts } from 'values/fonts';
import { Colors } from 'values/colors';
import ic_search_white from 'images/ic_search_white.png';
import ic_grid_white from 'images/ic_grid_white.png';
import ic_cancel_white from 'images/ic_cancel_white.png';
import Button from 'components/button';
import BaseView from 'containers/base/baseView';
import * as userActions from 'actions/userActions'
import * as courseActions from 'actions/courseActions'
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';
import ItemCourseSearch from './itemCourseSearch';
import { localizes } from 'locales/i18n';

export class SearchView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            stringSearch: null,
            typing: false,
            typingTimeout: 500,
            showSearchList: true,
            enableLoadMore: false,
            enableRefresh: true,
            refreshing: false
        }
        this.data = []
        this.filterSearch = {
            limit: Constants.PAGE_SIZE,
            offset: 0,
            keyword: this.state.stringSearch,
            opt: {
                sort: {
                    attribute: 'updatedAt',
                    rule: 'DESC'
                },
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
    }

    componentDidMount() {
        if (this.search) {
            this.search.focus()
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
                if (this.props.action == getActionSuccess(ActionEvent.SEARCH)) {
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
                }
                this.state.refreshing = false
                this.state.isLoadingMore = false
            } else {
                this.handleError(this.props.errorCode, this.props.error);
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.search) {
            this.search.focus()
        }
    }

    /**
     * Manager text input search 
     * @param {*} stringSearch 
     */
    onChangeTextInput = (stringSearch) => {
        const self = this;
        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout)
        }
        this.filterSearch.keyword = stringSearch
        self.setState({
            stringSearch: stringSearch == "" ? null : stringSearch,
            typing: false,
            typingTimeout: setTimeout(() => {
                this.props.search(this.filterSearch)
                this.data=  []
                this.setState({ showSearchList: stringSearch == null || stringSearch.trim() == "" ? false : true })
            }, 500)
        });
    }

    renderItem = (item, index) => {
        return (
            <ItemCourseSearch
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

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ ...commonStyles.header }}>
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <TextInput
                            autoFocus
                            style={styles.inputSearch}
                            placeholder={`${localizes('search')} ...`}
                            placeholderTextColor={Colors.COLOR_TEXT_HOLDER}
                            ref={r => (this.search = r)}
                            value={this.state.stringSearch}
                            onChangeText={this.onChangeTextInput}
                            keyboardType="default"
                            underlineColorAndroid='transparent'
                            returnKeyType={"search"}
                        />
                        {this.state.stringSearch != null && <Pressable
                            android_ripple={Constants.ANDROID_RIPPLE}
                            style={{
                                flex: 0,
                                padding: Constants.PADDING_LARGE
                            }}
                            onPress={() => {
                                this.setState({ stringSearch: null, showSearchList: false })
                            }}
                        >
                            <Image source={ic_cancel_white} />
                        </Pressable>}
                    </View>
                </Header>
                {this.state.showSearchList &&
                    <FlatListCustom
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
                        isShowEmpty={!this.props.isLoading && this.data.length == []}
                        isShowImageEmpty={true}
                        textForEmpty={''}
                    />}
                <StatusBar
                    animated={true}
                    hidden={false}
                    barStyle={'light-content'}
                    backgroundColor={Colors.COLOR_TAB}
                />
                {this.showLoadingBar(this.props.isLoading)}
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.search.data,
    isLoading: state.search.isLoading,
    errorCode: state.search.errorCode,
    action: state.search.action,
})

const mapDispatchToProps = {
    ...userActions,
    ...courseActions
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView)
