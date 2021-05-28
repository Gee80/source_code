import React, { Component } from 'react'
import { View, Text, ScrollView, Image, Pressable, ImageBackground } from 'react-native'
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
import ItemCourse from 'containers/courses/list/itemCourse';
import img_iron_man from 'images/img_iron_man.jpg';
import cat1 from 'images/cat1.jpg';
import cat2 from 'images/cat2.jpg';
import cat3 from 'images/cat3.jpg';
import cat4 from 'images/cat4.jpg';
import cat5 from 'images/cat5.jpg';
import cat6 from 'images/cat6.jpg';
import cat7 from 'images/cat7.jpg';
import cat8 from 'images/cat8.jpg';
import CategoryListView from './list/category/categoryListView';
import { PathListView } from './list/paths/pathListView';
import ImageLoader from 'components/imageLoader';
import Button from 'components/button';
import BaseView from 'containers/base/baseView';
import * as userActions from 'actions/userActions'
import * as courseActions from 'actions/courseActions'
import * as categoryActions from 'actions/categoryActions'
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';
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
export class BrowseView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            dataCat: []
        }
        this.data = [
            {
                title: 'Software Development', data: [
                    {
                        resource: "https://vnappmob.sgp1.digitaloceanspaces.com/soro/lolivi/1536111242-A32995B2-43FF-4AF3-9C5C-15C54AE4921E.jpg",
                        title: "React-native: from zero to hero",
                        arthur: "Mark Zuckerberg",
                        level: "Beginner",
                        createdAt: 'Feb 2020',
                        long: '3h 45m',
                        rating: { star: 4, count: 512 }
                    },
                    {
                        resource: "https://vnappmob.sgp1.digitaloceanspaces.com/soro/lolivi/1536111242-A32995B2-43FF-4AF3-9C5C-15C54AE4921E.jpg",
                        title: "React-native: from zero to hero",
                        arthur: "Mark Zuckerberg",
                        level: "Beginner",
                        createdAt: 'Feb 2020',
                        long: '3h 45m',
                        rating: { star: 4, count: 512 }
                    },
                    {
                        resource: "https://vnappmob.sgp1.digitaloceanspaces.com/soro/lolivi/1536111242-A32995B2-43FF-4AF3-9C5C-15C54AE4921E.jpg",
                        title: "React-native: from zero to hero",
                        arthur: "Mark Zuckerberg",
                        level: "Beginner",
                        createdAt: 'Feb 2020',
                        long: '3h 45m',
                        rating: { star: 4, count: 512 }
                    },
                    {
                        resource: "https://vnappmob.sgp1.digitaloceanspaces.com/soro/lolivi/1536111242-A32995B2-43FF-4AF3-9C5C-15C54AE4921E.jpg",
                        title: "React-native: from zero to hero",
                        arthur: "Mark Zuckerberg",
                        level: "Beginner",
                        createdAt: 'Feb 2020',
                        long: '3h 45m',
                        rating: { star: 4, count: 512 }
                    },
                    {
                        resource: "https://vnappmob.sgp1.digitaloceanspaces.com/soro/lolivi/1536111242-A32995B2-43FF-4AF3-9C5C-15C54AE4921E.jpg",
                        title: "React-native: from zero to hero",
                        arthur: "Mark Zuckerberg",
                        level: "Beginner",
                        createdAt: 'Feb 2020',
                        long: '3h 45m',
                        rating: { star: 4, count: 512 }
                    },
                ]
            },
            {
                title: 'Software Development', data: [
                    {
                        resource: "https://vnappmob.sgp1.digitaloceanspaces.com/soro/lolivi/1536111242-A32995B2-43FF-4AF3-9C5C-15C54AE4921E.jpg",
                        title: "React-native: from zero to hero",
                        arthur: "Mark Zuckerberg",
                        level: "Beginner",
                        createdAt: 'Feb 2020',
                        long: '3h 45m',
                        rating: { star: 4, count: 512 }
                    },
                    {
                        resource: "https://vnappmob.sgp1.digitaloceanspaces.com/soro/lolivi/1536111242-A32995B2-43FF-4AF3-9C5C-15C54AE4921E.jpg",
                        title: "React-native: from zero to hero",
                        arthur: "Mark Zuckerberg",
                        level: "Beginner",
                        createdAt: 'Feb 2020',
                        long: '3h 45m',
                        rating: { star: 4, count: 512 }
                    },
                    {
                        resource: "https://vnappmob.sgp1.digitaloceanspaces.com/soro/lolivi/1536111242-A32995B2-43FF-4AF3-9C5C-15C54AE4921E.jpg",
                        title: "React-native: from zero to hero",
                        arthur: "Mark Zuckerberg",
                        level: "Beginner",
                        createdAt: 'Feb 2020',
                        long: '3h 45m',
                        rating: { star: 4, count: 512 }
                    },
                    {
                        resource: "https://vnappmob.sgp1.digitaloceanspaces.com/soro/lolivi/1536111242-A32995B2-43FF-4AF3-9C5C-15C54AE4921E.jpg",
                        title: "React-native: from zero to hero",
                        arthur: "Mark Zuckerberg",
                        level: "Beginner",
                        createdAt: 'Feb 2020',
                        long: '3h 45m',
                        rating: { star: 4, count: 512 }
                    },
                    {
                        resource: "https://vnappmob.sgp1.digitaloceanspaces.com/soro/lolivi/1536111242-A32995B2-43FF-4AF3-9C5C-15C54AE4921E.jpg",
                        title: "React-native: from zero to hero",
                        arthur: "Mark Zuckerberg",
                        level: "Beginner",
                        createdAt: 'Feb 2020',
                        long: '3h 45m',
                        rating: { star: 4, count: 512 }
                    },
                ]
            }
        ];
        this.dataCat = []
        this.dataPopularSkill = [
            { title: "Angular" },
            { title: "JavaScript" },
            { title: "Java" },
            { title: "C#" },
            { title: "Python" },
            { title: "React" },
            { title: "Flutter" },
        ]
        this.dataPath = [
            { title: 'React native', subTitle: '8 courses', source: 'https://codersera.com/blog/wp-content/uploads/2019/02/react-native.png' },
            { title: 'Flutter', subTitle: '5 courses', source: 'https://itcraftapps.com/wp-content/uploads/2019/03/Flutter-Cover.png' },
            { title: 'VueJS', subTitle: '2 courses', source: 'https://dragondev.vn/images/posts/q/1/F/q1FiADdO-vuejs-cta-main.jpg' },
        ]
        this.topAuthor = []
    }

    componentDidMount() {
        this.props.getCategories()
        this.props.getLectures()
        this.getProfile()
    }
    
    getProfile = async () => {
        let user = await StorageUtil.retrieveItem(StorageUtil.USER_PROFILE);
        if (user) {
            this.props.getProfile();
            this.setState({user: user})
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
                if (this.props.action == getActionSuccess(ActionEvent.GET_CATEGORIES)) {
                    if (data.data && data.data.payload) {
                        this.state.dataCat = []
                        this.state.dataCat = data.data.payload;
                    }
                } else if (this.props.action == getActionSuccess(ActionEvent.GET_LECTURES)) {
                    if (data.data && data.data.payload) {
                        this.topAuthor = []
                        this    .topAuthor = data.data.payload;
                    }
                }
            } else {
                this.handleError(this.props.errorCode, this.props.error);
            }
        }
    }

    renderNotLogin = () => {
        return (
            <View style={{ flexGrow: 1, marginBottom: Constants.MARGIN_X_LARGE }}>
                <Text style={[commonStyles.text, { fontSize: Fonts.FONT_SIZE_LARGE - 2, marginHorizontal: Constants.MARGIN_X_LARGE + 8 }]}>{localizes('browse.gotoLogin')}</Text>
                <Text style={[commonStyles.text, { marginHorizontal: Constants.MARGIN_X_LARGE + 8, opacity: 0.7 }]}>{localizes('browse.intro')}</Text>
                <Button
                    onPress={() => { this.props.navigation.navigate("Login") }}
                    style={{ marginHorizontal: Constants.MARGIN_X_LARGE }}
                    title={localizes('browse.signIn')}
                    titleStyle={{ fontWeight: 'bold', color: Colors.COLOR_WHITE }}
                    backgroundColor={Colors.COLOR_PRIMARY} />
            </View>
        )
    }

    renderCategory = () => {
        return (
            <CategoryListView
                dataCat={this.state.dataCat}
                navigation={this.props.navigation}
            />
        )
    }

    renderPopularSkill = () => {
        return (
            <View>
                <Text style={styles.txtPopularSkill}>{localizes("browse.popularSkill")}</Text>
                <FlatListCustom
                    onRef={(ref) => { this.flatListRef = ref }}
                    contentContainerStyle={{
                    }}
                    style={{
                    }}
                    data={this.dataPopularSkill}
                    renderItem={this.renderItemPopular}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    isShowEmpty={this.dataPopularSkill.length == 0}
                    isShowImageEmpty={true}
                    textForEmpty={""}
                />
            </View>
        )
    }

    renderPaths = () => {
        return (
            <PathListView
                dataPath={this.dataPath}
                navigation={this.props.navigation}
            />
        )
    }

    renderItemPopular = (item, index) => {
        return (
            <Pressable style={[styles.itemPopular, { marginRight: Constants.MARGIN_LARGE, marginLeft: index == 0 ? Constants.MARGIN_X_LARGE : 0 }]}>
                <Text style={styles.txtItemPopular}>{item.title}</Text>
            </Pressable>
        )
    }

    renderTopAuthors = () => {
        return (
            <View>
                <Text style={styles.txtTopAuthor}>{localizes('browse.topAuthor')}</Text>
                <FlatListCustom
                    onRef={(ref) => { this.flatListRef = ref }}
                    contentContainerStyle={{
                    }}
                    style={{
                    }}
                    data={this.topAuthor}
                    renderItem={this.renderItemTopAuthor}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    isShowEmpty={this.topAuthor.length == 0}
                    isShowImageEmpty={false}
                    textForEmpty={""}
                />
            </View>
        )
    }

    renderItemTopAuthor = (item, index) => {
        return (
            <Pressable style={[styles.itemTopAuthor, { marginRight: Constants.MARGIN_X_LARGE, marginLeft: index == 0 ? Constants.MARGIN_X_LARGE : 0 }]}>
                <ImageLoader path={item['user.avatar']}
                    resizeModeType={'cover'}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: Constants.BORDER_RADIUS
                    }} />
                <Text style={styles.txtItemAuthor}>{item['user.name']}</Text>
            </Pressable>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    title={localizes('bottomTab.browser')}
                    visibleBack={false}
                    visibleAccount={true}
                    user={this.state.user}
                    onBack={() => { }}
                    visibleMenu={true}
                    menus={LIST_MENU}
                    navigation={this.props.navigation}
                />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {Utils.isNull(this.state.user) ? this.renderNotLogin() : null}
                    {this.renderCategory()}
                    {this.renderPopularSkill()}
                    {this.renderPaths()}
                    {this.renderTopAuthors()}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.browse.data,
    isLoading: state.browse.isLoading,
    errorCode: state.browse.errorCode,
    action: state.browse.action,
})

const mapDispatchToProps = {
    ...userActions,
    ...categoryActions,
    ...courseActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseView)
