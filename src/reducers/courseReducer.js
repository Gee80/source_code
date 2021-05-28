import { initialState } from './index'
import { ErrorCode } from 'config/errorCode';
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';


export default function (state = initialState, action) {
    switch (action.type) {
        case ActionEvent.SEARCH:
        case ActionEvent.GET_LECTURE:
        case ActionEvent.GET_LESSONS:
        case ActionEvent.SAVE_COURSE:
        case ActionEvent.GET_NEW_COURSES:
        case ActionEvent.GET_LESSON_VIDEO:
        case ActionEvent.GET_COURSE_DETAIL:
        case ActionEvent.GET_COURSE_PROCESS:
        case ActionEvent.GET_COURSE_TOP_RATE:
        case ActionEvent.GET_COURSE_TOP_SELL:
        case ActionEvent.GET_COURSE_WATCHING:
        case ActionEvent.REGISTER_FREE_COURSE:
        case ActionEvent.GET_COURSE_RECOMMEND:
        case ActionEvent.GET_COURSE_DETAIL_V2:
        case ActionEvent.GET_SAVE_COURSE_STATUS:
            return {
                ...state,
                isLoading: true,
                data: null,
                action: action.type,
                errorCode: null,
            }
        case getActionSuccess(ActionEvent.SEARCH):
        case getActionSuccess(ActionEvent.GET_LECTURE):
        case getActionSuccess(ActionEvent.GET_LESSONS):
        case getActionSuccess(ActionEvent.SAVE_COURSE):
        case getActionSuccess(ActionEvent.GET_NEW_COURSES):
        case getActionSuccess(ActionEvent.GET_LESSON_VIDEO):
        case getActionSuccess(ActionEvent.GET_COURSE_DETAIL):
        case getActionSuccess(ActionEvent.GET_COURSE_PROCESS):
        case getActionSuccess(ActionEvent.GET_COURSE_TOP_RATE):
        case getActionSuccess(ActionEvent.GET_COURSE_TOP_SELL):
        case getActionSuccess(ActionEvent.GET_COURSE_WATCHING):
        case getActionSuccess(ActionEvent.GET_COURSE_DETAIL_V2):
        case getActionSuccess(ActionEvent.GET_COURSE_RECOMMEND):
        case getActionSuccess(ActionEvent.REGISTER_FREE_COURSE):
        case getActionSuccess(ActionEvent.GET_SAVE_COURSE_STATUS):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                errorCode: action.payload.status ? action.payload.status : ErrorCode.ERROR_SUCCESS,
                action: action.type,
            }
        case ActionEvent.REQUEST_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
                errorCode: action.payload.errorCode,
                action: action.type
            }
        default:
            return state;
    }
}