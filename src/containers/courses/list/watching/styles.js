import React from "react-native";
import { Constants } from 'values/constants';
import { Colors } from 'values/colors';
import commonStyles from "styles/commonStyles";
import { Fonts } from "values/fonts";

export default styles = {
    container: {
        flexGrow: 1,
    },
    imgGradient: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        height: "100%",
        opacity: 0.7
    },
    titleHorizontal: {
        ...commonStyles.text,
        fontSize: Fonts.FONT_SIZE_X_MEDIUM,
        position: 'absolute',
        bottom: 8, left: 8
    },
    titleVertical: {
        ...commonStyles.text,
        fontSize: Fonts.FONT_SIZE_X_MEDIUM
    },
    txtArthur: {
        ...commonStyles.textSmall,
        color: Colors.COLOR_TEXT_HOLDER
    },
    buttonSignIn: {
        paddingHorizontal: Constants.PADDING_X_LARGE,
        paddingVertical: Constants.PADDING_LARGE - 2,
        borderRadius: Constants.CORNER_RADIUS,
        backgroundColor: Colors.COLOR_BLUE,
        marginTop: Constants.MARGIN_X_LARGE
    },
    itemBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Constants.MARGIN_LARGE,
        marginTop: 8,
        alignItems: 'center'
    },
    txtStudying: {
        ...commonStyles.textSmall,
        color: Colors.COLOR_TEXT_HOLDER,
        marginRight: Constants.MARGIN_X_LARGE,
        flex: 1,
        textAlign: 'left'
    },
    txtSee: {
        ...commonStyles.textSmall,
        color: Colors.COLOR_TEXT_HOLDER,
        flex: 2, textAlign: 'right',
    },
    txtProcess: {
        ...commonStyles.text,
        color: Colors.COLOR_BLUE,
        fontSize: Fonts.FONT_SIZE_XX_SMALL
    },
    viewProcess: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: Constants.MARGIN_LARGE
    },
    itemContainerVertical: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
        paddingVertical: Constants.PADDING_LARGE + 2,
    }
};
