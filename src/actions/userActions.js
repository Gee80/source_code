import { ActionEvent, getActionSuccess } from './actionEvent'


export const login = (data) => ({
    type: ActionEvent.LOGIN,
    payload: data
})

export const loginSuccess = data => ({
    type: getActionSuccess(ActionEvent.LOGIN),
    payload: data
});

export const notifyLoginSuccess = () => ({
    type: ActionEvent.NOTIFY_LOGIN_SUCCESS
})

export const register = data => ({
    type: ActionEvent.REGISTER,
    payload: data
});

export const registerSuccess = (data) => ({
    type: getActionSuccess(ActionEvent.REGISTER),
    payload: data
})

export const getProfile = () => ({
    type: ActionEvent.GET_PROFILE,
});

export const getProfileSuccess = (data) => ({
    type: getActionSuccess(ActionEvent.GET_PROFILE),
    payload: data
})

export const forgotPassword = (filter) => ({
    type: ActionEvent.FORGOT_PASSWORD,
    payload: { ...filter }
});

export const forgotPasswordSuccess = (data) => ({
    type: getActionSuccess(ActionEvent.FORGOT_PASSWORD),
    payload: data
})

export const loginGoogle = (filter) => ({
    type: ActionEvent.LOGIN_GOOGLE,
    payload: { ...filter }
});

export const loginGoogleSuccess = (data) => ({
    type: getActionSuccess(ActionEvent.LOGIN_GOOGLE),
    payload: data
})

export const editProfile = (filter) => ({
    type: ActionEvent.EDIT_PROFILE,
    payload: { ...filter }
});

export const editProfileSuccess = (data) => ({
    type: getActionSuccess(ActionEvent.EDIT_PROFILE),
    payload: data
})

export const changePassword = (data) => ({
    type: ActionEvent.CHANGE_PASSWORD,
    payload: { ...data }
})

export const changePasswordSuccess = data => ({
    type: getActionSuccess(ActionEvent.CHANGE_PASSWORD),
    payload: { data }
})
