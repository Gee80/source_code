import { initialState } from './index'
import { ErrorCode } from 'config/errorCode';
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';


export default function (state = initialState, action) {
    switch (action.type) {
        case ActionEvent.GET_COURSE_RATING:
            return {
                ...state,
                isLoading: true,
                data: null,
                action: action.type,
                errorCode: null,
            }
        case getActionSuccess(ActionEvent.GET_COURSE_RATING):
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
                action: action.type
            }
        default:
            return state;
    }
}