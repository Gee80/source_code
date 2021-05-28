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
    }
};
