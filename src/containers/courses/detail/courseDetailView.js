import React, { Component } from 'react'
import {
    View, Text, BackHandler, Image, Pressable, ScrollView,
    StatusBar, Share, Animated, PermissionsAndroid, Platform
} from 'react-native';
import {
    Container, Content, Root, Tabs, ScrollableTab, Tab
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
import ItemCourse from '../list/itemCourse';
import BaseView from 'containers/base/baseView';
import ImageLoader from 'components/imageLoader';
import ic_back_white from 'images/ic_back_white.png';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ic_download_white from 'images/ic_download_white.png';
import ic_download_blue_gray from 'images/ic_download_blue_gray.png';
import ic_book_mark from 'images/ic_book_mark.png';
import ic_online from 'images/ic_online.png';
import ic_bookmark_yellow from 'images/ic_bookmark_yellow.png';
import ic_dropdown_white from 'images/ic_dropdown_white.png';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ic_menu_vertical from 'images/ic_menu_vertical.png';
import * as userActions from 'actions/userActions'
import * as courseActions from 'actions/courseActions'
import * as categoryActions from 'actions/categoryActions'
import * as paymentActions from 'actions/paymentActions'
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';
import DateUtil from 'utils/dateUtil';
import Button from 'components/button';
import RatingListView from './rating/ratingListView';
import QuestionListView from './question/questionListView';
import NoteListView from './note/noteListView';
import ServerPath from 'config/Server';
import VideoPlayer from 'components/videoPlayer';
import YoutubePlayer from 'react-native-youtube-iframe';
import loader_icon from 'images/loader-icon.png';
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress'
import { localizes } from "locales/i18n";

export class CourseDetailView extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            enableLoadMore: false,
            enableRefresh: true,
            refreshing: false,
            resource: null,
            viewDescription: false,
            enableScrollViewScroll: true,
            tabActive: 0,
            chapPlaying: { chap: 0, session: 0 },
            user: null,
            permission: false,
            likeStatus: false,
            videoPaused: false,
            videoMuted: false,
            currentTime: 0,
            video: null,
            play: true,
            loader: {
                rotate: new Animated.Value(0),
                MAX_VALUE: 360,
            },
            lesson: null,
            progress: 0,
            isDownloaded: true,
            progressCourse: null
        }
        let { id } = this.props.route.params;
        this.id = id
        this.dataCourse = null
        this.sections = [];
        this.ratings = null;
        this.video = null;
        this.tabs = [
            { id: 1, name: 'BÀI HỌC', user: false, },
            { id: 2, name: 'CÂU HỎI', user: true, },
            { id: 3, name: 'GHI CHÚ', user: true, },
            { id: 3, name: 'BÀI TẬP', user: true, },
            { id: 3, name: 'ĐÁNH GIÁ', user: false, },
        ];
    }

    componentDidMount = () => {
        this.getProfile()
    }

    getCourseDetail = () => {
        this.props.getCourseDetail(this.id)
    }

    getCourseDetailV2 = (userId) => {
        this.props.getCourseDetailV2(this.id, userId)
    }

    getProfile = async () => {
        let user = await StorageUtil.retrieveItem(StorageUtil.USER_PROFILE);
        console.log("user course detail", user);
        if (user != null) {
            this.getCourseSaveStatus()
            this.getCourseDetailV2(user.id)
        } else {
            this.getCourseDetail()
        }
        this.setState({ user: user })
    }

    getCourseRating = () => {
        this.props.getCourseRating(this.id)
    }

    getCourseSaveStatus = () => {
        this.props.getSaveCourseStatus(this.id)
    }

    getLessonVideo = (lessonId) => {
        this.setState({
            video: {
                videoUrl: ''
            }
        })
        this.props.getLessonVideo(this.id, lessonId);
    }

    getCourseProcess = () => {
        this.props.getCourseProcess(this.id)
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
                if (this.props.action == getActionSuccess(ActionEvent.GET_COURSE_DETAIL)) {
                    console.log("GET_COURSE_DETAIL data", data)
                    if (data.data && data.data.payload) {
                        this.dataCourse = data.data.payload
                        this.lectureId = this.dataCourse.instructorId
                        this.props.getLecture(this.lectureId)
                    }
                    if (this.state.user) this.props.getLessons(this.id)
                } else if (this.props.action == getActionSuccess(ActionEvent.GET_COURSE_DETAIL_V2)) {
                    console.log("GET_COURSE_DETAIL_V2 data", data)
                    if (data.data && data.data.payload) {
                        this.dataCourse = data.data.payload
                        this.lectureId = this.dataCourse.instructorId
                        this.dataLecture = this.dataCourse.instructor
                        this.state.permission = true
                        this.sections = []
                        this.sections = this.dataCourse.section;
                        this.ratings = this.dataCourse.ratings;
                    }
                    this.getCourseProcess()
                } else if (this.props.action == getActionSuccess(ActionEvent.GET_LECTURE)) {
                    console.log("GET_LECTURE data", data)
                    if (data.data && data.data.payload) {
                        this.dataLecture = data.data.payload
                    }
                } else if (this.props.action == getActionSuccess(ActionEvent.GET_LESSONS)) {
                    console.log("GET_LESSONS GET LESSONS data", data)
                    if (data.data && data.data.payload && data.data.payload.section) {
                        this.sections = []
                        this.sections = data.data.payload.section;
                        this.state.permission = true
                    }
                    if (data.data && data.data.errorCode == 401) {
                        this.state.permission = false
                    }
                } else if (this.props.action == getActionSuccess(ActionEvent.REGISTER_FREE_COURSE)) {
                    if (data.data && data.data.messsage == 'OK') {
                        this.showMessage("Đăng ký thành công")
                    }
                    if (data.data && data.data.errorCode) {
                        this.showMessage(localizes('error_in_process'))
                    }
                } else if (this.props.action == getActionSuccess(ActionEvent.GET_COURSE_RATING)) {
                    console.log("GET_COURSE_RATING data", data)
                    if (data.data && data.data.messsage == 'OK') {
                        this.showMessage("Đăng ký thành công")
                    }
                    if (data.data && data.data.errorCode) {
                        this.showMessage(localizes('error_in_process'))
                    }
                } else if (this.props.action == getActionSuccess(ActionEvent.SAVE_COURSE)) {
                    console.log("SAVE_COURSE data", data)
                    if (data.data && data.data.message == 'OK') {
                        this.state.likeStatus = data.data.likeStatus
                        if (data.data.likeStatus) {
                            this.showMessage("Lưu khóa học thành công")
                        } else {
                            this.showMessage(localizes('error_in_process'))
                        }
                    }
                    if (data.data && data.data.errorCode) {
                        this.showMessage(localizes('error_in_process'))
                    }
                } else if (this.props.action == getActionSuccess(ActionEvent.GET_SAVE_COURSE_STATUS)) {
                    console.log("GET_SAVE_COURSE_STATUS data", data)
                    if (data.data && data.data.message == 'OK') {
                        this.state.likeStatus = data.data.likeStatus
                    }
                    if (data.data && data.data.errorCode) {
                        this.showMessage(localizes('error_in_process'))
                    }
                } else if (this.props.action == getActionSuccess(ActionEvent.GET_LESSON_VIDEO)) {
                    console.log("GET_LESSON_VIDEO data", data)
                    if (data.data && data.data.payload) {
                        this.state.video = data.data.payload
                    }
                    if (data.data && data.data.errorCode) {
                        this.showMessage(localizes('error_in_process'))
                    }
                } else if (this.props.action == getActionSuccess(ActionEvent.GET_COURSE_PROCESS)) {
                    console.log("GET_COURSE_PROCESS data", data)
                    if (data.data && data.data.payload) {
                        this.state.progressCourse = data.data.payload
                        this.state.currentTime = Math.round((this.dataCourse.totalHours * (data.data.payload / 100)))
                    } else if (data.data && data.data.status == 400) {
                        this.state.permission = false
                    } else if (data.data && data.data.errorCode) {
                        this.showMessage(localizes('error_in_process'))
                    }
                }
                this.state.refreshing = false
            } else {
                this.handleError(this.props.errorCode, this.props.error);
            }
        }
    }

    handleRefresh = () => {

    }

    onPressItem = (id) => {
    }

    onShareCourse = () => {
        let url = ServerPath.API_URL.split("api.")
        console.log("urrl", url)
        Share.share({
            message: 'VietStudy: Study with me \n ' + `${url[0]}${url[1]}course-detail/${this.dataCourse.id}`,
            url: url[0] + url[1] + '/course-detail/' + this.dataCourse.id,
            title: "Share to social",
        }, {
            // Android only:
            dialogTitle: 'Share to social',
            // iOS only:
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        })
    }

    downloadVideo = async (url) => {
        const hasWritePermission = await this.hasPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        const hasReadPermission = await this.hasPermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        if (!hasWritePermission || !hasReadPermission) return;
        let dirs = Platform.OS == 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFS.DownloadDirectoryPath;
        this.setState({ isDownloaded: false });
        try {
            RNFetchBlob.config({
                fileCache: true,
                path: dirs + '/' + this.state.lesson.name.replace(/\s/g, '') + '.mp4',
            }).fetch('GET', url).progress((received, total) => {
                this.setState({ progress: received / total })
            }).then((res) => {
                this.downloaded = Platform.OS === "ios" ? res.data : res.path();
                this.showMessage(localizes('course.downloadSuccess'))
                this.setState({ progress: 1, isDownloaded: true });
            }).catch((error) => {
                console.log("error while download", error);
            })
        } catch {
            (error) => {
                console.log("download error", error);
            }
        }
    }

    onSaveCourse = () => {
        if (this.state.user) {
            this.props.saveCourse({ courseId: this.id })
        } else {
            this.showMessage("Bạn cần đăng nhập để lưu khóa học")
        }
    }

    render() {
        let videoUrl = this.state.video ? this.state.video.videoUrl : null
        return (
            <View style={{ flex: 1 }}>
                {videoUrl ? this.renderVideo(videoUrl) :
                    <ImageLoader
                        path={this.dataCourse != null ? this.dataCourse.imageUrl : ''}
                        resizeModeType={'cover'}
                        style={styles.courseResource} />}
                <ScrollView style={styles.viewInfo} contentContainerStyle={{ flexGrow: 1 }}>
                    {this.renderCourseInfo()}
                    {this.renderButton()}
                    {this.renderButtonBottom()}
                    {this.renderDescription()}
                    {this.renderLearnWhat()}
                    {this.renderRequirement()}
                    {/* {this.renderCourseSimilar()} */}
                    <View style={{ backgroundColor: Colors.COLOR_BLACK, flex: 1 }}>
                        {this.state.user != null ? this.renderTabs() : this.renderButtonLogin()}
                    </View>
                </ScrollView>
                <Pressable
                    onPress={() => { this.onBack() }}
                    android_ripple={Constants.ANDROID_RIPPLE}
                    style={styles.btnBack}>
                    <Image source={ic_back_white} style={{}} />
                </Pressable>
                <StatusBar translucent backgroundColor='transparent' />
                {this.showLoadingBar(this.props.isLoading)}
            </View>
        )
    }

    renderButtonLogin = () => {
        return (
            <Pressable style={styles.buttonSignIn} onPress={() => {
                this.showLoginView({ fromScreen: 'CourseDetail', id: this.id, callBack: this.getProfile })
            }}>
                <Text style={[commonStyles.text]}>{localizes('course.gotoLogin')}</Text>
            </Pressable>
        )
    }

    renderLoadingDownload = () => {
        if ((0 < this.state.progress || this.state.progress < 1) && !this.state.isDownloaded)
            return (
                <Progress.Circle
                    color={'#7be11e'}
                    style={{
                        position: 'absolute'
                    }}
                    progress={this.state.progress}
                    size={40}
                    indeterminate={false}
                    showsText={true}
                />
            )
    }

    renderVideo = (videoUrl) => {
        let thumbnail = this.dataCourse != null ? this.dataCourse.imageUrl : '';
        let isYoutube = videoUrl.indexOf('https://youtube.com') != -1;
        if (isYoutube) {
            let id = videoUrl.split('embed/')
            return (
                <View style={{ marginTop: 44 }}>
                    <YoutubePlayer
                        style={{}}
                        ref={'youtube'}
                        height={Constants.MAX_WIDTH * (9 / 16)}
                        width={Constants.MAX_WIDTH}
                        videoId={id[1]}
                        play={this.state.play}
                        onChangeState={event => {
                            if (event == 'playing') {
                                this.setState({
                                    play: true
                                })
                            }
                        }}
                        onReady={() => console.log("ready")}
                        onError={e => console.log(e)}
                        onPlaybackQualityChange={q => console.log(q)}
                        volume={50}
                        playbackRate={1}
                        webViewStyle={{ borderTopLeftRadius: Constants.CORNER_RADIUS, borderTopRightRadius: Constants.CORNER_RADIUS }}
                    />
                </View>
            )
        }
        return (
            <VideoPlayer
                style={[styles.courseResource, {
                    width: Constants.MAX_WIDTH,
                    height: Constants.MAX_WIDTH * (9 / 16),
                    backgroundColor: Colors.COLOR_BLACK,
                    marginTop: 44,
                }]}
                source={{ uri: videoUrl }}
                resizeMode='cover'
                paused={this.state.videoPaused}
                muted={this.state.videoMuted}
                onProgress={response => {
                    this.state.currentTime = response.currentTime;
                }}
                currentTime={this.state.currentTime}
                onLoad={response => {
                    const { width, height } = response.naturalSize;
                }}
                onEnd={response => {
                }}
                showOnStart={false}
                disableTitle={false}
                disableFullscreen={false}
                disableTimer={false}
                disableSeekbar={false}
                disablePlayPause={false}
                disableVignette={false}
            />
        )
    }

    renderCourseInfo = () => {
        let current = 0
        if (this.dataCourse && this.state.progressCourse)
            current = this.dataCourse.totalHours * (this.state.progressCourse / 100)
        return (
            <View style={{ padding: Constants.PADDING_X_LARGE }}>
                <Text style={[commonStyles.text, { fontSize: Fonts.FONT_SIZE_X_LARGE }]}>{this.dataCourse?.title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Pressable
                                style={styles.arthur}
                            >
                                <ImageLoader path={this.dataLecture?.avatar} resizeModeType={'cover'} style={styles.avtArthur} />
                                <Text numberOfLines={1} style={styles.nameArthur}>{this.dataLecture?.name}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.viewCat}>
                            <Text style={[commonStyles.textSmall, { marginTop: Constants.MARGIN_LARGE }]}>{DateUtil.convertFromFormatToFormat(this.dataCourse?.createdAt, DateUtil.FORMAT_DATE_TIME_ZONE_T, DateUtil.FORMAT_DATE_V2)} <Text style={{ ...commonStyles.textSmallBold }}>{'\u0387'} </Text> {this.dataCourse && StringUtil.convertNumberHourToStringTime(this.dataCourse.totalHours)}
                                <Text>   {localizes('course.watched')} : {StringUtil.convertNumberHourToStringTime(current)} ({this.state.progressCourse ? this.state.progressCourse : 0}%)</Text>
                            </Text>
                            <View style={styles.viewRating}>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderButton = () => {
        return (
            <View style={styles.viewBtn}>
                <Pressable
                    style={styles.btnAction}
                    onPress={() => { this.onSaveCourse() }}
                    android_ripple={Constants.ANDROID_RIPPLE}>
                    <View style={styles.imgBtnAction}>
                        <Image source={this.state.likeStatus ? ic_bookmark_yellow : ic_book_mark} />
                    </View>
                    <Text style={[commonStyles.text, { fontSize: Fonts.FONT_SIZE_XX_SMALL }]}>{localizes('course.favorite')}</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        if (this.state.user) {
                            if (this.state.video) {
                                if (this.state.video.videoUrl && this.state.video.videoUrl.indexOf('https://youtube.com') != -1) {
                                    this.showMessage(localizes('course.cannotDownload'))
                                } else
                                    this.downloadVideo(this.state.video.videoUrl)
                            } else
                                this.showMessage(localizes('course.pleaseChooseLesson'))
                        } else {
                            this.showMessage(localizes('course.neededLogin'))
                        }
                    }}
                    android_ripple={Constants.ANDROID_RIPPLE}
                    style={styles.btnAction}>
                    <View style={styles.imgBtnAction}>
                        <Image source={this.state.isDownloaded ? ic_download_white : ic_download_blue_gray} />
                    </View>
                    <Text style={[commonStyles.text, { fontSize: Fonts.FONT_SIZE_XX_SMALL }]}>{!this.state.isDownloaded ? localizes('course.downloading') : localizes('course.download')}</Text>
                    {this.renderLoadingDownload()}
                </Pressable>
                <Pressable
                    onPress={this.onShareCourse}
                    android_ripple={Constants.ANDROID_RIPPLE}
                    style={styles.btnAction}>
                    <View style={styles.imgBtnAction}>
                        <Image source={ic_online} />
                    </View>
                    <Text style={[commonStyles.text, { fontSize: Fonts.FONT_SIZE_XX_SMALL }]}>{localizes('course.share')}</Text>
                </Pressable>
            </View>
        )
    }

    renderDescription = () => {
        return (
            <View>
                <View style={styles.viewDes}>
                    <Text numberOfLines={this.state.viewDescription ? null : 3}
                        style={styles.txtDes}>
                        {this.dataCourse?.description}
                    </Text>
                    <View style={styles.btnDescription}>
                        <Pressable
                            onPress={() => { this.setState({ viewDescription: !this.state.viewDescription }) }}
                            android_ripple={Constants.ANDROID_RIPPLE}
                        >
                            <Image source={ic_dropdown_white} style={{
                                transform: [
                                    {
                                        rotate: this.state.viewDescription ?
                                            '-180deg' : '0deg'
                                    }
                                ]
                            }} />
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }

    renderButtonBottom = () => {
        let catId = this.dataCourse && this.dataCourse.categoryIds ? this.dataCourse.categoryIds[0] : null
        let courseLike = this.dataCourse ? this.dataCourse.coursesLikeCategory : [];
        return (
            <View style={{ paddingHorizontal: Constants.PADDING_X_LARGE }}>
                {/* <Pressable android_ripple={Constants.ANDROID_RIPPLE} style={styles.btnAction2}>
                    <Image source={ic_download_white} />
                    <Text style={commonStyles.text}>Take a learning check</Text>
                </Pressable> */}
                <Pressable
                    onPress={() => {
                        if (catId != null) {
                            this.props.navigation.push('CourseList', { categoryId: catId, categoryTitle: localizes('course.courseLikeCategory') })
                        } else if (courseLike != null) {
                            this.props.navigation.navigate('CourseLikeCategory', { dataCourses: courseLike })
                        }
                    }}
                    android_ripple={Constants.ANDROID_RIPPLE}
                    style={styles.btnAction2}>
                    {/* <Image source={ic_download_white} /> */}
                    <Text style={commonStyles.text}>{localizes('course.viewCourseLikeCategory')}</Text>
                </Pressable>
            </View>

        )
    }

    renderButtonRegister = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: Constants.PADDING_LARGE }}>
                <Pressable
                    style={styles.buttonSignIn}
                    onPress={() => {
                        if (this.dataCourse)
                            if (this.dataCourse.price === 0) {
                                this.props.registerFreeCourse({ courseId: this.id })
                            }
                    }}>
                    {this.dataCourse ?
                        this.dataCourse.price === 0 ?
                            <Text style={commonStyles.text}>{localizes('course.enroll').toUpperCase()}</Text> :
                            <Text style={commonStyles.text}>{localizes('course.buy')} {StringUtil.formatStringCashNoUnit(this.dataCourse.price)}</Text>
                        : null}
                </Pressable>
            </View>
        )
    }

    renderLearnWhat = () => {
        return (
            <View style={styles.viewLearnWhat}>
                <Text style={{ ...commonStyles.text }}>{localizes('course.whatStudy')}</Text>
                <View style={styles.itemLearnWhatContainer}>
                    {this.dataCourse && this.dataCourse.learnWhat ?
                        this.dataCourse.learnWhat.map((item, index) => {
                            return (
                                <View key={index} style={styles.viewItemLearnWhat}>
                                    <Pressable style={styles.itemLearnWhat}>
                                        <Text numberOfLines={1} style={styles.nameArthur}>{item}</Text>
                                    </Pressable>
                                </View>
                            )
                        }) : null}
                </View>
            </View>
        )
    }

    renderRequirement = () => {
        return (
            <View style={styles.viewRequirement}>
                <Text style={{ ...commonStyles.text }}>{localizes('course.requirement')}</Text>
                <View style={styles.itemLearnWhatContainer}>
                    {this.dataCourse && this.dataCourse.requirement ?
                        this.dataCourse.requirement.map((item, index) => {
                            return (
                                <View key={index} style={styles.viewItemLearnWhat}>
                                    <Pressable style={styles.itemLearnWhat}>
                                        <Text numberOfLines={1} style={styles.nameArthur}>{item}</Text>
                                    </Pressable>
                                </View>
                            )
                        }) : null}
                </View>
                {!this.state.permission && this.state.user && this.renderButtonRegister()}
            </View>
        )
    }

    renderCourseSimilar = () => {
        return (
            <View>
                <Pressable>
                    <Text style={{ ...commonStyles.text }}>{localizes('course.courseLikeCategory')}</Text>
                    <Image />
                </Pressable>
            </View>
        )
    }

    renderTabs = () => {
        let { tabActive } = this.state;
        return (
            <View style={styles.bottom}>
                <Tabs
                    initialPage={0}
                    renderTabBar={() => (
                        <ScrollableTab
                            tabsContainerStyle={{ backgroundColor: Colors.COLOR_BLACK }}
                            style={{
                                borderWidth: 0,
                                backgroundColor: Colors.COLOR_BLACK,
                                elevation: 0
                            }}
                        />
                    )}
                    locked={false}
                    tabContainerStyle={{ elevation: 4, borderBottomWidth: 0, backgroundColor: Colors.COLOR_BLACK }}
                    tabBarUnderlineStyle={{ height: 3, backgroundColor: Colors.COLOR_BLUE, borderRadius: Constants.CORNER_RADIUS }}
                >
                    {this.state.permission && <Tab
                        heading={localizes('course.lesson')}
                        tabStyle={{ backgroundColor: Colors.COLOR_BLACK }}
                        activeTabStyle={{ backgroundColor: Colors.COLOR_BLACK }}
                        textStyle={{ color: Colors.COLOR_DRK_GREY }}
                        activeTextStyle={{ color: Colors.COLOR_TEXT }}
                    >
                        <View style={{ flex: 1, backgroundColor: Colors.COLOR_BLACK }}>
                            {this.renderListSession()}
                        </View>
                    </Tab>}
                    {this.state.permission && <Tab
                        heading={localizes('course.question')}
                        tabStyle={{ backgroundColor: Colors.COLOR_BLACK }}
                        activeTabStyle={{ backgroundColor: Colors.COLOR_BLACK }}
                        textStyle={{ color: Colors.COLOR_DRK_GREY }}
                        activeTextStyle={{ color: Colors.COLOR_TEXT }}
                    >
                        <View style={{ flex: 1, backgroundColor: Colors.COLOR_BLACK }}>
                            {this.renderQuestions()}
                        </View>
                    </Tab>}
                    {this.state.permission && <Tab
                        heading={localizes('course.note')}
                        tabStyle={{ backgroundColor: Colors.COLOR_BLACK }}
                        activeTabStyle={{ backgroundColor: Colors.COLOR_BLACK }}
                        textStyle={{ color: Colors.COLOR_DRK_GREY }}
                        activeTextStyle={{ color: Colors.COLOR_TEXT }}
                    >
                        <View style={{ flex: 1, backgroundColor: Colors.COLOR_BLACK }}>
                            {this.renderNotes()}
                        </View>
                    </Tab>}
                    <Tab
                        heading={localizes('course.rating')}
                        tabStyle={{ backgroundColor: Colors.COLOR_BLACK }}
                        activeTabStyle={{ backgroundColor: Colors.COLOR_BLACK }}
                        textStyle={{ color: Colors.COLOR_DRK_GREY }}
                        activeTextStyle={{ color: Colors.COLOR_TEXT }}
                    >
                        <View style={{ backgroundColor: Colors.COLOR_BLACK, flex: 1 }}>
                            {this.renderRating()}
                        </View>
                    </Tab>
                    {this.state.permission && <Tab
                        heading={localizes('course.exercise')}
                        tabStyle={{ backgroundColor: Colors.COLOR_BLACK }}
                        activeTabStyle={{ backgroundColor: Colors.COLOR_BLACK }}
                        textStyle={{ color: Colors.COLOR_DRK_GREY }}
                        activeTextStyle={{ color: Colors.COLOR_TEXT }}
                    >
                        <View style={{ backgroundColor: Colors.COLOR_BLACK }}>
                            {this.renderListSession()}
                        </View>
                    </Tab>}
                </Tabs>
            </View>
        )
    }

    onChangeTab = (tab) => {
        this.setState({ tabActive: tab })
    }

    renderListSession = () => {
        if (this.state.user == null) {
            return (
                <Pressable style={styles.buttonSignIn} onPress={() => {
                    this.showLoginView({ fromScreen: 'CourseDetail', id: this.id, callBack: this.getProfile })
                }}>
                    <Text style={[commonStyles.text]}>SIGN IN</Text>
                </Pressable>
            )
        } else if (!this.state.permission) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: Constants.PADDING_XX_LARGE }}>
                    <Pressable
                        style={styles.buttonSignIn}
                        onPress={() => {
                            if (this.dataCourse)
                                if (this.dataCourse.price === 0) {
                                    this.props.registerFreeCourse({ courseId: this.id })
                                }
                        }}>
                        {this.dataCourse ?
                            this.dataCourse.price === 0 ?
                                <Text style={commonStyles.text}>THAM GIA KHÓA HỌC</Text> :
                                <Text style={commonStyles.text}>Mua khóa học với giá {StringUtil.formatStringCashNoUnit(this.dataCourse.price)}</Text>
                            : null}
                    </Pressable>
                </View>
            )
        }
        return (
            <FlatListCustom
                onRef={(ref) => { this.flatListRef = ref }}
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: Colors.COLOR_BLACK,
                    marginHorizontal: Constants.MARGIN_X_LARGE
                }}
                style={{
                    flex: 1,
                }}
                data={this.sections}
                renderItem={this.renderItem}
                enableLoadMore={this.state.enableLoadMore}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                isShowEmpty={this.data == 0}
                isShowImageEmpty={true}
                textForEmpty={""}
                nestedScrollEnabled
            />
        )
    }

    renderRating = () => {
        return (
            <RatingListView
                onRef={input => {
                    this.ratingView = input;
                }}
                courseId={this.id}
                dataRatings={this.ratings}
            />
        )
    }

    renderQuestions = () => {
        return (
            <QuestionListView
                onRef={input => {
                    this.questionList = input;
                }}
                courseId={this.id}
            />
        )
    }

    getListSections = () => {
        let sections = []
        this.sections.forEach(item => {
            let lessons = []
            item.lesson != null && item.lesson.forEach((e) => {
                lessons.push({ id: e.id, name: e.name, numberOrder: e.numberOrder })
            })

            sections.push({
                id: item.id,
                numberOrder: item.numberOrder,
                lessons: lessons
            })
        })
        return sections
    }

    renderNotes = () => {
        return (
            <NoteListView
                onRef={input => {
                    this.noteList = input;
                }}
                courseId={this.id}
                lessonId={this.state.lessonId}
            />
        )
    }

    /**
     * Render item
     * @param {*} item
     * @param {*} index
     */
    renderItem = (item, index) => {
        return (
            <View>
                <View style={styles.itemSession}>
                    <View style={styles.sessionNum}>
                        <Text style={commonStyles.text}>{item.numberOrder}</Text>
                    </View>
                    <View style={styles.sessionInfo}>
                        <Text style={styles.sessionTitle}>{item.name}</Text>
                        <Text style={styles.sessionDuration}>{StringUtil.convertNumberHourToStringTime(item.sumHours)}</Text>
                    </View>
                    <Image source={ic_menu_vertical} />
                </View>
                <FlatListCustom
                    onRef={(ref) => { this.flatListChap = ref }}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                    data={item.lesson}
                    renderItem={this.renderItemChap}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    isShowEmpty={item.listChap == null || item.listChap.length == 0}
                    isShowImageEmpty={true}
                    textForEmpty={""}
                />
            </View>
        )
    }

    renderItemChap = (item, index) => {
        return (
            <Pressable
                onPress={() => { this.getLessonVideo(item.id); this.setState({ lesson: item }) }}
                style={styles.chapItem}>
                <View style={{
                    ...styles.chapLearned,
                    backgroundColor: item.learned ? Colors.COLOR_GREEN : Colors.COLOR_DRK_GREY
                }} />
                <Text style={[[styles.chapTitle, { color: this.state.chapPlaying.chap == index ? Colors.COLOR_GREEN : Colors.COLOR_TEXT }]]}>{item.name}</Text>
                <Text style={commonStyles.textSmall}>{StringUtil.convertNumberHourToStringTime(item.hours)}</Text>
            </Pressable>
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
    ...categoryActions,
    ...courseActions,
    ...paymentActions
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailView);
