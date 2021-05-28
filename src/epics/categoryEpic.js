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
import * as categoryAction from 'actions/categoryActions';
import { ServerPath } from 'config/Server';
import { Header, handleErrors, consoleLogEpic, handleConnectErrors } from './commonEpic';
import { ErrorCode } from 'config/errorCode';
import { fetchError } from 'actions/commonActions';
import ApiUtil from 'utils/apiUtil';

export const getCategoriesEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_CATEGORIES),
        switchMap((action) =>
            fetch(ServerPath.API_URL + 'category/all', {
                method: 'GET',
                headers: ApiUtil.getHeader(),
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return categoryAction.getCategoriesSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_CATEGORIES USER_EPIC:", ActionEvent.GET_CATEGORIES, error)
                    return handleConnectErrors(error)
                })
        )
    );