import ImageLoader from 'components/imageLoader'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import { Colors } from 'values/colors';
import commonStyles from 'styles/commonStyles';
import DateUtil from 'utils/dateUtil';
import { Constants } from 'values/constants';
import { Fonts } from 'values/fonts';

export class ItemNote extends PureComponent {
    render() {
        const { item, index, length } = this.props;
        return (
            <View style={{ marginHorizontal: Constants.MARGIN_X_LARGE, marginTop: Constants.MARGIN_LARGE }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Text style={{ ...commonStyles.text, flex: 1 }}><Text style={{ ...commonStyles.textBold }}>Bài {item.lessonNumberOrder}:</Text> {item.lessonName}</Text>
                    <Text style={{ ...commonStyles.textSmall }}>{this.getTime()}</Text>
                </View>
                <Text style={{ ...commonStyles.text, flex: 1, marginTop :Constants.MARGIN_LARGE }}>{item.content}</Text>
                <Text style={{ ...commonStyles.textSmall, textAlign: 'right' }}>{DateUtil.convertFromFormatToFormat(item.updatedAt, DateUtil.FORMAT_DATE_TIME_ZONE_T, DateUtil.FORMAT_DATE)}</Text>
                <View style={{ height: 0.7, width: Constants.MAX_WIDTH - Constants.MARGIN_XX_LARGE, borderRadius: Constants.BORDER_RADIUS, backgroundColor: Colors.COLOR_GREY_BLUE_LIGHT, alignSelf: 'center', marginVertical: Constants.MARGIN_X_LARGE }} />
            </View>
        )
    }

    getTime = () => {
        let item = this.props.item;
        let second = item.time;
        let hour = Math.floor(second / 3600)
        let minute = Math.floor((second % 3600) / 60)
        second = Math.round(second - hour * 3600 - minute * 60)

        return (<Text style={{ ...commonStyles.text }}>{hour != 0 & hour != null ? hour + ':' : null}{minute != 0 & minute != null ? minute + ":" : '00:'}{second != 0 & second != null ? second > 10 ? second : '0' + second : '00'}</Text>)
    }
}

export default ItemNote
