import { ActionEvent, getActionSuccess } from "./actionEvent";

export const getCategories = () => ({
    type: ActionEvent.GET_CATEGORIES
})

export const getCategoriesSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_CATEGORIES),
    payload: { data }
})

export const getCategoryDetail = () => ({
    type: ActionEvent.GET_CATEGORY_DETAIL
})

export const getCategoryDetailSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_CATEGORY_DETAIL),
    payload: { data }
})
