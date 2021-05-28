import React from "react-native";
import { Constants } from 'values/constants';
import { Colors } from 'values/colors';
import commonStyles from "styles/commonStyles";
import { Fonts } from "values/fonts";

export default styles = {
    container: {
        flexGrow: 1,
    },
    btnBack: {
        padding: Constants.PADDING,
        position: 'absolute',
        top: 32, left: 16,
        elevation: 20
    },
    viewInfo: {
        flexGrow: 1,
        backgroundColor: Colors.COLOR_GREY_BLUE,
    },
    avtArthur: {
        width: 24,
        height: 24,
        borderRadius: Constants.BORDER_RADIUS
    },
    arthur: {
        flexDirection: 'row',
        backgroundColor: Colors.COLOR_GREY_BLUE_LIGHT,
        borderRadius: Constants.BORDER_RADIUS,
        paddingRight: Constants.PADDING,
        alignItems: 'center',
        marginRight: Constants.MARGIN_LARGE,
        marginTop: Constants.MARGIN_LARGE
    },
    nameArthur: {
        ...commonStyles.textSmall,
        marginHorizontal: Constants.MARGIN_LARGE
    },
    btnAction: {
        alignItems: 'center',
    },
    imgBtnAction: {
        borderRadius: Constants.BORDER_RADIUS,
        backgroundColor: Colors.COLOR_GREY_BLUE_LIGHT,
        padding: Constants.PADDING_LARGE, marginBottom: Constants.MARGIN
    },
    viewBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: Constants.MARGIN_LARGE
    },
    courseResource: {
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_WIDTH * (9 / 16)
    },
    viewCat: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    viewRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: Constants.MARGIN_X_LARGE, marginTop: 6
    },
    viewDes: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: Constants.MARGIN_X_LARGE,
        marginBottom: Constants.MARGIN_LARGE,
        paddingHorizontal: Constants.PADDING_X_LARGE
    },
    btnDescription: {
        backgroundColor: Colors.COLOR_GREY_BLUE_LIGHT,
        borderRadius: Constants.CORNER_RADIUS,
        padding: Constants.PADDING_LARGE,
        justifyContent: 'center'
    },
    txtDes: {
        ...commonStyles.text,
        fontSize: Fonts.FONT_SIZE_MEDIUM,
        flex: 1,
        marginRight: Constants.MARGIN_LARGE
    },
    btnAction2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.CORNER_RADIUS,
        backgroundColor: Colors.COLOR_GREY_BLUE_LIGHT,
        padding: Constants.PADDING_LARGE,
        marginTop: Constants.MARGIN_LARGE,
        marginBottom: Constants.MARGIN_LARGE
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderBottomWidth: 2,
        padding: Constants.PADDING_LARGE,
    },
    tabView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemSession: {
        flexDirection: 'row',
        backgroundColor: Colors.COLOR_BACKGROUND,
        alignItems: 'center',
        marginTop: Constants.MARGIN_X_LARGE + Constants.MARGIN_LARGE
    },
    sessionNum: {
        width: 60,
        height: 40,
        backgroundColor: Colors.COLOR_DRK_GREY,
        borderRadius: Constants.CORNER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: Colors.COLOR_GREY_LIGHT,
        borderBottomWidth: 4
    },
    sessionInfo: {
        marginLeft: Constants.MARGIN_X_LARGE,
        flex: 1
    },
    sessionTitle: {
        ...commonStyles.textBold,
        flex: 1
    },
    sessionDuration: {
        ...commonStyles.textSmall,
        flex: 1
    },
    chapItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Constants.MARGIN_X_LARGE
    },
    chapLearned: {
        borderRadius: Constants.BORDER_RADIUS,
        width: 10,
        height: 10,
        marginRight: Constants.MARGIN_X_LARGE,
        marginTop: 2,
    },
    chapTitle: {
        ...commonStyles.textBold,
        flex: 1
    },
    bottom: {
        marginTop: Constants.MARGIN_LARGE,
        paddingBottom: Constants.MARGIN_X_LARGE,
        flex: 1,
        height: '100%',
        backgroundColor: Colors.COLOR_BLACK
    },
    buttonSignIn: {
        paddingHorizontal: Constants.PADDING_X_LARGE,
        paddingVertical: Constants.PADDING_LARGE - 2,
        borderRadius: Constants.CORNER_RADIUS,
        backgroundColor: Colors.COLOR_BLUE,
        marginVertical: Constants.MARGIN_XX_LARGE,
        alignSelf: 'center',
    },
    progress: {
        margin: 2,
    },
    itemLearnWhat: {
        backgroundColor: Colors.COLOR_GREY_BLUE_LIGHT,
        borderRadius: Constants.BORDER_RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
    },
    viewItemLearnWhat: {
        flexDirection: 'row', flexWrap: 'wrap',
        marginRight: Constants.MARGIN_LARGE,
        marginTop: Constants.MARGIN
    },
    viewRequirement: {
        paddingHorizontal: Constants.PADDING_X_LARGE,
        marginVertical: Constants.MARGIN_X_LARGE
    },
    viewLearnWhat: {
        paddingHorizontal: Constants.PADDING_X_LARGE,
        marginTop: Constants.MARGIN_LARGE
    },
    itemLearnWhatContainer: {
        marginTop: Constants.MARGIN,
        flexDirection: 'row', flexWrap: 'wrap'
    }
};
