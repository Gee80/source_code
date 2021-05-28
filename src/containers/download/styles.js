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
    titleDownload: {
        ...commonStyles.text,
        fontSize: Fonts.FONT_SIZE_XX_MEDIUM,
        marginBottom: Constants.MARGIN_LARGE
    },
    txtContentDownload: {
        ...commonStyles.text,
        textAlign: 'center',
        marginBottom: Constants.MARGIN_X_LARGE,
    },
    viewHeaderDownload: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Constants.MARGIN_X_LARGE,
        marginTop: Constants.MARGIN_XX_LARGE
    },
    imgDownload: {
        opacity: 0.4,
        marginVertical: Constants.MARGIN_X_LARGE
    },
    txtHowTo: {
        ...commonStyles.text,
        textAlign: 'center'
    },
    viewHowTo: {
        marginTop: Constants.MARGIN_XX_LARGE * 2,
        marginBottom: Constants.MARGIN_X_LARGE
    },
    viewDownloadGuide: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop :Constants.MARGIN_XX_LARGE
    },
    imgDownloadGuide: {
        opacity: 0.7,
        width: 120,
        height: 260,
        borderRadius: Constants.CORNER_RADIUS * 3,
        marginHorizontal: Constants.MARGIN_LARGE
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
    }
};
