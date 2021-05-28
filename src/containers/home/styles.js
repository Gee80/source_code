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
    containerNotLogin: {
        flexGrow: 1, justifyContent: 'center',
        alignItems: 'center'
    },
    btnBrowse: {
        marginTop: Constants.MARGIN_XX_LARGE * 2,
        alignItems: 'center'
    },
    txtNotLogin: {
        ...commonStyles.text,
        marginTop: Constants.MARGIN_LARGE
    },
    btnGotoSearch: {
        marginTop: Constants.MARGIN_X_LARGE * 3,
        alignItems: 'center'
    }
};
