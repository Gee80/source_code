import React, { PureComponent } from 'react';
import { View, Text, Image, Pressable, ImageBackground } from 'react-native';
import commonStyles from 'styles/commonStyles';
import { Colors } from 'values/colors';
import { Constants } from 'values/constants';
import { Fonts } from 'values/fonts';
import styles from './styles';
import ImageLoader from 'components/imageLoader';

class ItemPath extends PureComponent {

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props != nextProps) {
            this.props = nextProps;
        }
    }

    render() {
        const { item, index, length, onPress, horizontal } = this.props;
        return (
            <Pressable
                onPress={() => { onPress(item) }}
                android_ripple={Constants.ANDROID_RIPPLE}
                style={[styles.itemPath, { marginLeft: index == 0 ? Constants.MARGIN_X_LARGE : 0, marginRight: Constants.MARGIN_X_LARGE }]}>
                <ImageLoader path={item.source} resizeModeType={'cover'}
                    style={{
                        width: horizontal ? Constants.MAX_WIDTH * 0.5 : 110,
                        height: horizontal ? Constants.MAX_WIDTH * 0.3 : 60,
                        borderTopLeftRadius: Constants.CORNER_RADIUS,
                        borderTopRightRadius: Constants.CORNER_RADIUS
                    }} />
                <View style={{margin: Constants.MARGIN_LARGE}}>
                    <Text numberOfLines={2} style={styles.titleITemPath}>{item.title}</Text>
                    <Text numberOfLines={2} style={styles.subTileItemPath}>{item.subTitle}</Text>
                </View>
            </Pressable>
        );
    }
}

export default ItemPath;
