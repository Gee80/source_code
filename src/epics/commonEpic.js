import { fetchError } from "actions/commonActions"
import { ErrorCode } from "config/errorCode";
import { ActionEvent } from 'actions/actionEvent'
import { Observable } from 'rxjs';
import {
    map,
    filter,
    catchError,
    mergeMap
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { delay, mapTo, switchMap } from 'rxjs/operators';
import { dispatch } from 'rxjs/internal/observable/range';
import * as userActions from 'actions/userActions';
import * as commonActions from 'actions/commonActions';
import { ServerPath } from 'config/Server';
import StorageUtil from "utils/storageUtil";
import ApiUtil from 'utils/apiUtil';
import Utils from "utils/utils";

/**
 * Handle errors
 * @param {*} response 
 */
export function handleErrors(response) {
    if (!response.ok) {
        if (response.status == ErrorCode.UN_AUTHORIZE) {
            return { data: [], errorCode: ErrorCode.UN_AUTHORIZE, error: "" }
        }
        return { data: [], errorCode: ErrorCode.ERROR_COMMON, error: "" }
    }
    return response;
}

/**
 * Handle connect errors
 * @param {*} error 
 */
export function handleConnectErrors(error) {
    if (error.message == "Network request failed") {
        return fetchError(ErrorCode.NO_CONNECTION, error)
    }
    return fetchError(ErrorCode.ERROR_COMMON, error)
}

/**
 * 
 * Console.log Error Epic
 * @param {} catchEpic 
 * @param {*} action 
 * @param {*} typeError 
 */
export function consoleLogEpic(catchEpic, action, typeError) {
    return console.log("ERROR CATCH", catchEpic, "ACTION", action, typeError);
}

export const Header = new Headers({
    "Accept": "application/json",
    'Content-Type': 'application/json',
    'X-APITOKEN': global.token
})
