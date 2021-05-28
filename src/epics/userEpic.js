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
import { ServerPath } from 'config/Server';
import { Header, handleErrors, consoleLogEpic, handleConnectErrors } from './commonEpic';
import { ErrorCode } from 'config/errorCode';
import { fetchError } from 'actions/commonActions';
import ApiUtil from 'utils/apiUtil';

export const loginEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.LOGIN),
        switchMap((action) =>
            fetch(ServerPath.API_URL + 'user/login', {
                method: 'POST',
                headers: ApiUtil.getHeader(),
                body: JSON.stringify(action.payload)
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return userActions.loginSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("LOGIN USER_EPIC:", ActionEvent.LOGIN, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const registerEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.REGISTER),
        switchMap((action) =>
            fetch(ServerPath.API_URL + 'user/register', {
                method: 'POST',
                headers: ApiUtil.getHeader(),
                body: JSON.stringify(action.payload)
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return userActions.registerSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("REGISTER USER_EPIC:", ActionEvent.REGISTER, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getProfileEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_PROFILE),
        switchMap((action) =>
            fetch(ServerPath.API_URL + 'user/me', {
                method: 'GET',
                headers: ApiUtil.getHeader(),
            }).then((response) => {
                console.log("GET_PROFILE epic: ", response)
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                console.log("GET_PROFILE epic 22: ", responseJson)
                return userActions.getProfileSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_PROFILE USER_EPIC:", ActionEvent.GET_PROFILE, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const forgotPasswordEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.FORGOT_PASSWORD),
        switchMap((action) =>
            fetch(ServerPath.API_URL + 'user/forget-pass/send-email', {
                method: 'POST',
                headers: new Headers({
                    "Accept": "*/*",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + global.token,
                }),
                body: JSON.stringify(action.payload)
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400 || response.status == 500) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return userActions.forgotPasswordSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("FORGOT_PASSWORD USER_EPIC:", ActionEvent.FORGOT_PASSWORD, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const loginGoogleEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.LOGIN_GOOGLE),
        switchMap((action) =>
            fetch(ServerPath.API_URL + 'user/login-google-mobile', {
                method: 'POST',
                headers: ApiUtil.getHeader(),
                body: JSON.stringify(action.payload)
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return userActions.loginGoogleSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("LOGIN_GOOGLE USER_EPIC:", ActionEvent.LOGIN_GOOGLE, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const editProfileEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.EDIT_PROFILE),
        switchMap((action) =>
            fetch(ServerPath.API_URL + 'user/update-profile', {
                method: 'PUT',
                headers: ApiUtil.getHeader(),
                body: JSON.stringify(action.payload)
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return userActions.editProfileSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("EDIT_PROFILE USER_EPIC:", ActionEvent.EDIT_PROFILE, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const changePasswordEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.CHANGE_PASSWORD),
        switchMap((action) =>
            fetch(ServerPath.API_URL + 'user/change-password', {
                method: 'POST',
                headers: ApiUtil.getHeader(),
                body: JSON.stringify(action.payload)
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return userActions.changePasswordSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("CHANGE_PASSWORD USER_EPIC:", ActionEvent.CHANGE_PASSWORD, error)
                    return handleConnectErrors(error)
                })
        )
    );
