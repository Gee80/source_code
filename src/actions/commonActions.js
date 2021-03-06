import { ActionEvent, getActionSuccess } from "./actionEvent";

export const fetchError = (errorCode, error) => ({
    type: ActionEvent.REQUEST_FAIL,
    payload: { errorCode, error }
})

export const saveException = (filter) => ({
    type: ActionEvent.SAVE_EXCEPTION,
    payload: { ...filter }
})

export const saveExceptionSuccess = data => ({
    type: getActionSuccess(ActionEvent.SAVE_EXCEPTION),
    payload: { data }
})

