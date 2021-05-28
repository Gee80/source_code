import { initialState } from './index'
import { ErrorCode } from 'config/errorCode';
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';


export default function (state = initialState, action) {
    switch (action.type) {
        case ActionEvent.NOTIFY_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                errorCode: ErrorCode.ERROR_SUCCESS,
                data: null,
                action: action.type,
            }
        case ActionEvent.GET_PROFILE:
        case ActionEvent.GET_COURSE_TOP_RATE:
        case ActionEvent.GET_COURSE_TOP_SELL:
        case ActionEvent.GET_COURSE_WATCHING:
            return {
                ...state,
                isLoading: true,
                data: null,
                action: action.type,
                errorCode: null,
            }
        case getActionSuccess(ActionEvent.GET_PROFILE):
        case getActionSuccess(ActionEvent.GET_COURSE_TOP_RATE):
        case getActionSuccess(ActionEvent.GET_COURSE_TOP_SELL):
        case getActionSuccess(ActionEvent.GET_COURSE_WATCHING):
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