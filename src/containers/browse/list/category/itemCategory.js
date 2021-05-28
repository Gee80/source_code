import React, { PureComponent } from 'react';
import { View, Text, Image, Pressable, ImageBackground } from 'react-native';
import commonStyles from 'styles/commonStyles';
import { Colors } from 'values/colors';
import { Constants } from 'values/constants';
import { Fonts } from 'values/fonts';
import styles from './styles';
import cat6 from 'images/cat1.jpg';
import cat7 from 'images/cat2.jpg';
import cat0 from 'images/cat3.jpg';
import cat1 from 'images/cat4.jpg';
import cat2 from 'images/cat5.jpg';
import cat3 from 'images/cat6.jpg';
import cat4 from 'images/cat7.jpg';
import cat5 from 'images/cat8.jpg';

class ItemCourse extends PureComponent {

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props != nextProps) {
            this.props = nextProps;
        }
    }

    getImage = (index) => {
        let div = index % 8;

        switch(div){
            case 0:
                return cat0;
            case 1:
                return cat1;
            case 2:
                return cat2;
            case 3:
                return cat3;
            case 4:
                return cat4;
            case 5:
                return cat5;
            case 6:
                return cat6;
            case 7:
                return cat7;
        }
    }

    render() {
        const { item, index, length, onPress, horizontal } = this.props;
        return (
            <ImageBackground
                source={this.getImage(index)}
                imageStyle={styles.imgItemBackground}
                style={[styles.itemCat, { marginRight: Constants.MARGIN_X_LARGE, marginLeft: index == 0 || index == 1 ? Constants.MARGIN_X_LARGE : 0 }]}
            >
                <Pressable
                    onPress={() => { onPress(item) }}
                    android_ripple={Constants.ANDROID_RIPPLE}
                    style={styles.btnItemCat}>
                    <Text numberOfLines={2} style={styles.txtItemCat}>{item.name}</Text>
                </Pressable>
            </ImageBackground>
        );
    }
}

export default ItemCourse;
