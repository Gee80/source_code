import { ActionEvent, getActionSuccess } from "./actionEvent";

export const registerFreeCourse = (filter) => ({
    type: ActionEvent.REGISTER_FREE_COURSE,
    payload: { ...filter }
})

export const registerFreeCourseSuccess = data => ({
    type: getActionSuccess(ActionEvent.REGISTER_FREE_COURSE),
    payload: { data }
})
