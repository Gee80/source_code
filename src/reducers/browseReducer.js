import { initialState } from './index'
import { ErrorCode } from 'config/errorCode';
import { ActionEvent, getActionSuccess } from 'actions/actionEvent';


export default function (state = initialState, action) {
    switch (action.type) {
        case ActionEvent.GET_CATEGORIES:
        case ActionEvent.GET_CATEGORY_DETAIL: 
        case ActionEvent.GET_LECTURES: 
            return {
                ...state,
                isLoading: true,
                data: null,
                action: action.type,
                errorCode: null,
            }
        case getActionSuccess(ActionEvent.GET_LECTURES):
        case getActionSuccess(ActionEvent.GET_CATEGORIES):
        case getActionSuccess(ActionEvent.GET_CATEGORY_DETAIL):
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