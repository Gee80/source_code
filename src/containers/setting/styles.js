import React from "react-native";
import { Constants } from 'values/constants';
import { Colors } from 'values/colors';
import commonStyles from "styles/commonStyles";
import { Fonts } from "values/fonts";

export default styles = {
    container: {
        flexGrow: 1,
    },
    viewVi: {
        flexDirection: 'row', padding: Constants.PADDING_LARGE + 2,
        justifyContent: "center", alignItems: "center",
    },
    textVi: {
        flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'
    },
    viewModal: {
        backgroundColor: 'rgba(64, 64, 64, 0.4)',
        width: Constants.MAX_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewLanguage: {
        backgroundColor: Colors.COLOR_GREY_BLUE_LIGHT,
        borderRadius: 12,
        width: Constants.MAX_WIDTH - Constants.MARGIN_XX_LARGE * 3,
    }
};
