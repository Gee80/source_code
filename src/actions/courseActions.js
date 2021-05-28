import { ActionEvent, getActionSuccess } from "./actionEvent";

export const getNewCourses = (filter) => ({
    type: ActionEvent.GET_NEW_COURSES,
    payload: { ...filter }
})

export const getNewCoursesSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_NEW_COURSES),
    payload: { data }
})

export const search = (filter) => ({
    type: ActionEvent.SEARCH,
    payload: { ...filter }
})

export const searchSuccess = data => ({
    type: getActionSuccess(ActionEvent.SEARCH),
    payload: { data }
})

export const getLectures = () => ({
    type: ActionEvent.GET_LECTURES
})

export const getLecturesSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_LECTURES),
    payload: { data }
})

export const getCourseDetail = (id) => ({
    type: ActionEvent.GET_COURSE_DETAIL,
    payload: { id }
})

export const getCourseDetailSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_COURSE_DETAIL),
    payload: { data }
})

export const getLecture = (id) => ({
    type: ActionEvent.GET_LECTURE,
    payload: { id }
})

export const getLectureSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_LECTURE),
    payload: { data }
})

export const getLessons = (id) => ({
    type: ActionEvent.GET_LESSONS,
    payload: { id }
})

export const getLessonsSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_LESSONS),
    payload: { data }
})

export const getCourseRating = (id) => ({
    type: ActionEvent.GET_COURSE_RATING,
    payload: { id }
})

export const getCourseRatingSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_COURSE_RATING),
    payload: { data }
})

export const getCourseDetailV2 = (id, userId) => ({
    type: ActionEvent.GET_COURSE_DETAIL_V2,
    payload: { id, userId }
})

export const getCourseDetailV2Success = data => ({
    type: getActionSuccess(ActionEvent.GET_COURSE_DETAIL_V2),
    payload: { data }
})

export const getQuestions = (page, pageSize, courseId, lessonId = null) => ({
    type: ActionEvent.GET_QUESTIONS,
    payload: { page, pageSize, courseId, lessonId }
})

export const getQuestionsSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_QUESTIONS),
    payload: { data }
})

export const getNotes = (courseId) => ({
    type: ActionEvent.GET_NOTES,
    payload: { courseId }
})

export const getNotesSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_NOTES),
    payload: { data }
})

export const addNote = (filter) => ({
    type: ActionEvent.ADD_NOTE,
    payload: { ...filter }
})

export const addNoteSuccess = data => ({
    type: getActionSuccess(ActionEvent.ADD_NOTE),
    payload: { data }
})

export const getCourseTopSell = (filter) => ({
    type: ActionEvent.GET_COURSE_TOP_SELL,
    payload: { ...filter }
})

export const getCourseTopSellSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_COURSE_TOP_SELL),
    payload: { data }
})

export const getCourseTopRate = (filter) => ({
    type: ActionEvent.GET_COURSE_TOP_RATE,
    payload: { ...filter }
})

export const getCourseTopRateSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_COURSE_TOP_RATE),
    payload: { data }
})

export const getCourseSave = () => ({
    type: ActionEvent.GET_COURSE_SAVE,
})

export const getCourseSaveSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_COURSE_SAVE),
    payload: { data }
})

export const saveCourse = (filter) => ({
    type: ActionEvent.SAVE_COURSE,
    payload: { ...filter }
})

export const saveCourseSuccess = data => ({
    type: getActionSuccess(ActionEvent.SAVE_COURSE),
    payload: { data }
})

export const getSaveCourseStatus = (courseId) => ({
    type: ActionEvent.GET_SAVE_COURSE_STATUS,
    payload: { courseId }
})

export const getSaveCourseStatusSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_SAVE_COURSE_STATUS),
    payload: { data }
})

export const getCourseWatching = () => ({
    type: ActionEvent.GET_COURSE_WATCHING,
})

export const getCourseWatchingSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_COURSE_WATCHING),
    payload: { data }
})

export const getCourseRecommend = (id, limit, offset) => ({
    type: ActionEvent.GET_COURSE_RECOMMEND,
    payload: { id, limit, offset }
})

export const getCourseRecommendSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_COURSE_RECOMMEND),
    payload: { data }
})

export const getSearchHistory = () => ({
    type: ActionEvent.GET_SEARCH_HISTORY
})

export const getSearchHistorySuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_SEARCH_HISTORY),
    payload: { data }
})

export const getLessonVideo = (courseId, lessonId) => ({
    type: ActionEvent.GET_LESSON_VIDEO,
    payload: { courseId, lessonId }
})

export const getLessonVideoSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_LESSON_VIDEO),
    payload: { data }
})

export const getCourseProcess = (courseId) => ({
    type: ActionEvent.GET_COURSE_PROCESS,
    payload: { courseId }
})

export const getCourseProcessSuccess = data => ({
    type: getActionSuccess(ActionEvent.GET_COURSE_PROCESS),
    payload: { data }
})
