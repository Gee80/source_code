import React from "react-native";
import { Constants } from 'values/constants';
import { Colors } from 'values/colors';
import commonStyles from "styles/commonStyles";
import { Fonts } from "values/fonts";

export default styles = {
    container: {
        flexGrow: 1,
    },
    titleList: {
        ...commonStyles.text,
        fontSize: Fonts.FONT_SIZE_XX_MEDIUM
    },
    itemPath: {
        backgroundColor: Colors.COLOR_GREY_BLUE,
        borderRadius: Constants.CORNER_RADIUS
    },
    imgItemPath: {

    },
    titleITemPath: {
        ...commonStyles.text,
        fontSize: Fonts.FONT_SIZE_XX_MEDIUM,
    },
    subTileItemPath: {
        ...commonStyles.text,
        opacity: 0.8,
    },
    viewTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: Constants.MARGIN_X_LARGE,
        marginTop: Constants.MARGIN_X_LARGE + Constants.MARGIN_LARGE
    }
};
