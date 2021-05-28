import ImageLoader from 'components/imageLoader'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import { Colors } from 'values/colors';
import commonStyles from 'styles/commonStyles';
import DateUtil from 'utils/dateUtil';
import { Constants } from 'values/constants';

export class ItemQuestion extends PureComponent {
    render() {
        const { item, index, length } = this.props;
        return (
            <View>
                <View style={{ flexDirection: 'row', marginHorizontal: Constants.MARGIN_X_LARGE, marginTop: Constants.MARGIN_LARGE }}>
                    <View>
                        <ImageLoader
                            style={{ width: 40, height: 40, borderRadius: Constants.BORDER_RADIUS }}
                            resizeModeType={'contain'}
                            path={item.user?.avatar}
                        />
                        <Text>{item.user?.type}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: Constants.MARGIN_LARGE }} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ ...commonStyles.textBold, flex: 1, marginRight: Constants.MARGIN_X_LARGE, color: Colors.COLOR_BLUE_STEEL }}>{item.title}</Text>
                            <Text style={{ ...commonStyles.textSmall }}>{DateUtil.convertFromFormatToFormat(item.createdAt, DateUtil.FORMAT_DATE_TIME_ZONE_T, DateUtil.FORMAT_DATE)}</Text>
                        </View>
                        <Text style={{ ...commonStyles.text }}>{item.content}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-start', marginRight: Constants.MARGIN_X_LARGE, marginLeft: Constants.MARGIN_LARGE }}>
                    {this.renderTags()}
                </View>
                <View style={{ height: 0.7, width: Constants.MAX_WIDTH - Constants.MARGIN_XX_LARGE, borderRadius: Constants.BORDER_RADIUS, backgroundColor: Colors.COLOR_GREY_BLUE_LIGHT, alignSelf: 'center', marginVertical: Constants.MARGIN_X_LARGE }} />
            </View>
        )
    }

    renderTags = () => {
        let item = this.props.item;
        if (item.tags) {
            return (
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    {item.tags.map((e, i) => {
                        return <View key={i} style={{
                            marginLeft: Constants.MARGIN_LARGE,
                            paddingHorizontal: Constants.MARGIN_LARGE,
                            paddingVertical: Constants.PADDING,
                            borderRadius: Constants.CORNER_RADIUS,
                            backgroundColor: Colors.COLOR_ORANGE_STEEL
                        }}><Text style={{ ...commonStyles.textSmall }}>#{e.name}</Text></View>
                    })}
                </View>
            )
        }
    }
}

export default ItemQuestion
