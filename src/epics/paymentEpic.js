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
import * as paymentActions from 'actions/paymentActions';
import { ServerPath } from 'config/Server';
import { Header, handleErrors, consoleLogEpic, handleConnectErrors } from './commonEpic';
import { ErrorCode } from 'config/errorCode';
import { fetchError } from 'actions/commonActions';
import ApiUtil from 'utils/apiUtil';

export const registerFreeCourseEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.REGISTER_FREE_COURSE),
        switchMap((action) =>
            fetch(ServerPath.API_URL + 'payment/get-free-courses', {
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
                return paymentActions.registerFreeCourseSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("REGISTER_FREE_COURSE EPIC:", ActionEvent.REGISTER_FREE_COURSE, error)
                    return handleConnectErrors(error)
                })
        )
    );
