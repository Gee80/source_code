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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: Constants.MARGIN_X_LARGE
    },
    imgBackground: {
        borderRadius: Constants.CORNER_RADIUS,
        opacity: 0.9,
        backgroundColor: Colors.COLOR_BLACK,
        marginHorizontal: Constants.MARGIN_X_LARGE
    },
    itemCategory: {
        flex: 1,
        marginBottom: Constants.MARGIN_X_LARGE
    },
    btnCat: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Constants.PADDING_X_LARGE + 4
    },
    txtCat: {
        textAlign: 'center',
        ...commonStyles.textBold,
        fontSize: Fonts.FONT_SIZE_XX_LARGE
    },
    itemCat: {
        flex: 1,
        marginBottom: Constants.MARGIN_X_LARGE
    },
    btnItemCat: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Constants.PADDING_X_LARGE,
        paddingVertical: Constants.PADDING_X_LARGE + 8
    },
    txtItemCat: {
        textAlign: 'center',
        ...commonStyles.textBold,
        fontSize: Fonts.FONT_SIZE_XX_MEDIUM
    },
    imgItemBackground:{
        borderRadius: Constants.CORNER_RADIUS,
        opacity: 0.9,
        backgroundColor: Colors.COLOR_BLACK
    }
};
