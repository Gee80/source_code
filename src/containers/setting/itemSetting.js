import React, { PureComponent } from 'react';
import { View, Text, Switch, Pressable } from 'react-native';
import commonStyles from 'styles/commonStyles';
import { Colors } from 'values/colors';
import { Constants } from 'values/constants';
import { Fonts } from 'values/fonts';

class ItemSetting extends PureComponent {
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
        const { item, index, length, onPress, user } = this.props;
        if (item.forUser && user == null) return null;
        return (
            <Pressable android_ripple={Constants.ANDROID_RIPPLE}
                onPress={() => { if (item.onPress) item.onPress() }}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    paddingVertical: Constants.PADDING_LARGE + 6,
                    paddingHorizontal: Constants.PADDING_X_LARGE
                }}>
                    <View style={{ flex: 1 }}>
                        <Text style={[commonStyles.text, { fontSize: Fonts.FONT_SIZE_X_MEDIUM + 1 }]}>{item.title}</Text>
                        {item.subTitle && <Text style={[commonStyles.textSmall]}>{item.subTitle}</Text>}
                    </View>
                    {item.toggle && <Switch
                        trackColor={{ false: "#767577", true: Colors.COLOR_BLUE_STEEL }}
                        thumbColor={this.state.isEnabled ? Colors.COLOR_BLUE : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => this.setState({ isEnabled: !this.state.isEnabled })}
                        value={this.state.isEnabled}
                    />}
                </View>
                {(index == 2 || index == 5 || index == 6) && <View style={{ backgroundColor: Colors.COLOR_DRK_GREY, height: 1, width: Constants.MAX_WIDTH }} />}
            </Pressable>
        );
    }
}

export default ItemSetting;
