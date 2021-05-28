import React from "react-native";
import { Constants } from 'values/constants';
import { Colors } from 'values/colors';
import commonStyles from "styles/commonStyles";
import { Fonts } from "values/fonts";

export default styles = {
    container: {
        flexGrow: 1,
    },
    buttonSignIn: {
        paddingHorizontal: Constants.PADDING_X_LARGE,
        paddingVertical: Constants.PADDING_LARGE - 2,
        borderRadius: Constants.CORNER_RADIUS,
        backgroundColor:Colors.COLOR_BLUE,
        marginTop: Constants.MARGIN_X_LARGE
    }
};
