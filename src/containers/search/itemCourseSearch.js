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

class ItemCourseSearch extends PureComponent {
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
        console.log("horizontal", item);
        return (
            <Pressable
                onPress={() => { onPress(item) }}
                style={{
                }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    flex: 1,
                    paddingVertical: Constants.PADDING_LARGE + 2,
                }}><ImageLoader path={item.imageUrl} resizeModeType={'cover'}
                    style={{
                        width: 110,
                        height: 60,
                        borderRadius: 6
                    }} />
                    <View style={{ flex: 1, marginTop: -4, marginHorizontal: 8 }}>
                        <Text numberOfLines={2} style={styles.titleVertical}>{item.title}</Text>
                        <Text style={styles.txtArthur}>{item['instructor.user.name'] != null ? item['instructor.user.name'] : item.name}</Text>
                        <Text style={[commonStyles.textSmall, { color: Colors.COLOR_TEXT_HOLDER, marginRight: Constants.MARGIN_X_LARGE }]}>
                            {item.price != null && StringUtil.formatStringCashNoUnit(item.price)}  <Text style={{ ...commonStyles.textSmallBold }}>{'\u0387'}</Text>  {DateUtil.convertFromFormatToFormat(item.updatedAt, DateUtil.FORMAT_DATE_TIME_ZONE_T, DateUtil.FORMAT_DATE_V2)}  <Text style={{ ...commonStyles.textSmallBold }}>{'\u0387'} </Text> {StringUtil.convertNumberHourToStringTime(item.totalHours)}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 6, marginTop: 6 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <AirbnbRating
                                    count={5}
                                    showRating={false}
                                    isDisabled={true}
                                    defaultRating={2.5}
                                    size={10}
                                />
                                <Text style={commonStyles.textSmall}>{item.ratedNumber && `(${item.ratedNumber})`}</Text>
                            </View>
                            {item.soldNumber && <Text style={{ ...commonStyles.textSmall, textAlign: 'right', alignSelf: 'flex-end' }}>đã bán: {item.soldNumber}</Text>}
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    }
}

export default ItemCourseSearch;
