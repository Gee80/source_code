import React, { PureComponent } from 'react';
import { View, Text, Switch, Image, Pressable } from 'react-native';
import commonStyles from 'styles/commonStyles';
import { Colors } from 'values/colors';
import { Constants } from 'values/constants';
import { Fonts } from 'values/fonts';
import ic_menu_vertical from 'images/ic_menu_vertical.png';
import ImageLoader from 'components/imageLoader';
import { Rating, AirbnbRating } from 'react-native-ratings';
import img_background_gradient from 'images/img_background_gradient.png';
import styles from './styles';
import StringUtil from 'utils/stringUtil';
import DateUtil from 'utils/dateUtil';
import ic_see_grey from 'images/ic_see_grey.png'

class ItemCourseWatching extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props != nextProps) {
            this.props = nextProps;
            this.state.isEnabled = nextProps.item?.isEnabled
        }
    }

    render() {
        const { item, index, length, onPress, horizontal } = this.props;
        let view = horizontal ? this.horizontal() : this.vertical()
        return view;
    }

    horizontal = () => {
        const { item, index, length, onPress, horizontal } = this.props;
        return (
            <Pressable
                onPress={() => { onPress(item) }}
                style={horizontal && {
                    width: Constants.MAX_WIDTH * 0.6,
                    marginRight: Constants.MARGIN_LARGE,
                    marginLeft: index == 0 ? Constants.MARGIN_X_LARGE : 0
                }}>
                <View style={{
                    flexDirection: horizontal ? 'column' : 'row',
                    alignItems: 'flex-start',
                    flex: 1,
                    paddingVertical: Constants.PADDING_LARGE + 2,
                }}>
                    <View>
                        <ImageLoader path={item.courseImage} resizeModeType={'cover'}
                            style={{
                                width: horizontal ? Constants.MAX_WIDTH * 0.6 : 110,
                                height: horizontal ? Constants.MAX_WIDTH * 0.4 : 60,
                                borderRadius: 6
                            }} />
                        {horizontal && <Image source={img_background_gradient} style={styles.imgGradient} />}
                        {horizontal && <Text numberOfLines={2} style={styles.titleHorizontal}>{item.courseTitle}</Text>}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                        <View style={{ marginTop: horizontal ? 4 : -4, marginHorizontal: horizontal ? 8 : 8, flex: 1 }}>
                            {!horizontal && <Text numberOfLines={2} style={styles.titleVertical}>{item.title}</Text>}
                            <Text style={styles.txtArthur}>{item.instructorName}</Text>
                            {/* <Text style={[commonStyles.textSmall, { color: Colors.COLOR_TEXT_HOLDER, marginRight: Constants.MARGIN_X_LARGE }]}>
                            {item.price != null && StringUtil.formatStringCashNoUnit(item.price)}  <Text style={{ ...commonStyles.textSmallBold }}>{'\u0387'}</Text>  {DateUtil.convertFromFormatToFormat(item.createdAt, DateUtil.FORMAT_DATE_TIME_ZONE_T, DateUtil.FORMAT_DATE_V2)}  <Text style={{ ...commonStyles.textSmallBold }}>{'\u0387'} </Text> {StringUtil.convertNumberHourToStringTime(item.totalHours)}
                        </Text> */}
                            {/* <View style={{ alignItems: 'center', }}> */}
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AirbnbRating
                                count={5}
                                showRating={false}
                                isDisabled={true}
                                defaultRating={item.courseAveragePoint ? item.courseAveragePoint : 4}
                                size={10}
                            />
                            <Text style={commonStyles.textSmall}>{item.ratedNumber ? `(${item.ratedNumber})` : null}</Text>
                        </View> */}
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: Constants.MARGIN_LARGE }}>
                            <Text style={[commonStyles.textSmall, { color: Colors.COLOR_TEXT_HOLDER }]}>Đã học được</Text>
                            <Text style={{ ...commonStyles.text, color: Colors.COLOR_BLUE, fontSize: Fonts.FONT_SIZE_XX_SMALL }}>{Math.round(item.process * 100) / 100}%</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-start', marginHorizontal: Constants.MARGIN_LARGE, marginTop: 0 }}>
                        <Text style={[commonStyles.textSmall, { color: Colors.COLOR_TEXT_HOLDER, marginRight: Constants.MARGIN_X_LARGE }]}>
                            Đang học bài: {item.learnLesson}
                        </Text>
                        <Text style={[commonStyles.textSmall, { color: Colors.COLOR_TEXT_HOLDER, }]}>
                            Lần cuối học {DateUtil.convertFromFormatToFormat(item.latestLearnTime, DateUtil.FORMAT_DATE_TIME_ZONE_T, DateUtil.FORMAT_DATE_TIME_ZONE_A)}
                        </Text>
                    </View>
                    <Pressable onPress={() => { }} style={[{ elevation: 16 }, horizontal && { position: 'absolute', top: 16, right: 4 }]}>
                        <Image source={ic_menu_vertical} />
                    </Pressable>
                </View>
                { !horizontal && (index == 2 || index == 12 || index == 13) && <View style={{ backgroundColor: Colors.COLOR_DRK_GREY, height: 1, width: Constants.MAX_WIDTH }} />}
            </Pressable>
        );
    }

    vertical = () => {
        const { item, index, length, onPress, horizontal } = this.props;
        return (
            <Pressable
                onPress={() => { onPress(item) }}
                style={styles.itemContainerVertical}>
                <ImageLoader path={item.courseImage} resizeModeType={'cover'}
                    style={{
                        width: 110,
                        height: 60,
                        borderRadius: 6
                    }} />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ marginHorizontal: 8, flex: 1 }}>
                            <Text numberOfLines={2} style={styles.titleVertical}>{item.courseTitle}</Text>
                            <Text style={styles.txtArthur}>{item.instructorName}</Text>
                        </View>
                        <View style={styles.viewProcess}>
                            <Text style={[commonStyles.textSmall, { color: Colors.COLOR_TEXT_HOLDER }]}>Đã học được</Text>
                            <Text style={styles.txtProcess}>{Math.round(item.process * 100) / 100}%</Text>
                        </View>
                    </View>
                    <View style={styles.itemBottom}>
                        <Text style={styles.txtStudying}>
                            Đang học bài: {item.learnLesson}
                        </Text>
                        <Text style={styles.txtSee}>
                            <Image source={ic_see_grey} /> {DateUtil.convertFromFormatToFormat(item.latestLearnTime, DateUtil.FORMAT_DATE_TIME_ZONE_T, DateUtil.FORMAT_DATE_TIME_ZONE_A)}
                        </Text>
                    </View>
                </View>
            </Pressable>
        );
    }
}

export default ItemCourseWatching;
