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
        opacity: 0.7,
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
        padding: Constants.PADDING_X_LARGE
    },
    txtCat: {
        textAlign: 'center',
        ...commonStyles.textBold,
        fontSize: Fonts.FONT_SIZE_XX_LARGE
    },
    txtPopularSkill: {
        ...commonStyles.text,
        fontSize: Fonts.FONT_SIZE_XX_MEDIUM,
        marginBottom: Constants.MARGIN_X_LARGE,
        marginHorizontal: Constants.MARGIN_X_LARGE
    },
    txtItemPopular: {
        ...commonStyles.text,
    },
    itemPopular: {
        backgroundColor: Colors.COLOR_DRK_GREY,
        paddingHorizontal: Constants.PADDING_X_LARGE,
        paddingVertical: Constants.PADDING_LARGE,
        borderRadius: Constants.CORNER_RADIUS * 4
    },
    itemTopAuthor: {
        alignItems: 'center',
    },
    txtItemAuthor: {
        ...commonStyles.text,
        marginTop:Constants.MARGIN_LARGE
    },
    txtTopAuthor: {
        ...commonStyles.text,
        fontSize: Fonts.FONT_SIZE_XX_MEDIUM,
        margin: Constants.MARGIN_X_LARGE,
        marginTop: Constants.MARGIN_X_LARGE + 8
    },
};
