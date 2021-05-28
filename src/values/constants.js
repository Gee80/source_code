import { Dimensions } from 'react-native'
import { Colors } from './colors'
export const Constants = {
    HEIGHT_HEADER_OFFSET_REFRESH: Platform.OS === 'ios' ? 0 : 44,
    MAX_WIDTH: Dimensions.get("screen").width,
    MAX_HEIGHT: Dimensions.get("screen").height,
    CORNER_RADIUS: 6,
    BORDER_RADIUS: 56,
    BORDER_WIDTH: 1.5,
    MARGIN: 4,
    PADDING: 4,
    MARGIN_LARGE: 8,
    MARGIN_X_LARGE: 16,
    MARGIN_XX_LARGE: 32,
    PADDING_LARGE: 8,
    PADDING_X_LARGE: 16,
    PADDING_XX_LARGE: 32,
    PAGE_SIZE: 20,
    SHADOW: 4,
    SHADOW_BLUR: 16,
    SHADOW_OPACITY: 0.25,
    ELEVATION: 4,
    SHADOW_OFFSET_WIDTH: 0,
    SHADOW_OFFSET_HEIGHT: 4,
    STATUS_BAR_HEIGHT: 18,
    ANDROID_RIPPLE: {
        color: Colors.COLOR_GREY_LIGHT,
        borderless: false
    },
    NEW_RELEASE: -100,
    RECOMMEND_FOR_YOU: - 101
}