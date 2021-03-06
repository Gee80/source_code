export const ActionEvent = {
    LOGIN: 'login',
    REQUEST_FAIL: 'requestFail',
    NOTIFY_LOGIN_SUCCESS: 'notifyLoginSuccess',
    SAVE_EXCEPTION: 'saveException',
    REGISTER: 'register',
    GET_PROFILE: 'getProfile',
    GET_CATEGORIES: 'getCategories',
    GET_CATEGORY_DETAIL: 'getCategoryDetail',
    GET_NEW_COURSES: 'getNewCourses',
    SEARCH: 'search',
    GET_LECTURES: 'getLectures',
    GET_COURSE_DETAIL: 'getCourseDetail',
    GET_LECTURE: 'getLecture',
    GET_LESSONS: 'getLessons',
    REGISTER_FREE_COURSE: 'registerFreeCourse',
    GET_COURSE_RATING: 'getCourseRating',
    GET_COURSE_DETAIL_V2: 'getCourseDetailV2',
    GET_QUESTIONS: 'getQuestions',
    GET_NOTES: 'getNotes',
    ADD_NOTE: 'addNote',
    GET_COURSE_TOP_SELL: 'getCourseTopSell',
    GET_COURSE_TOP_RATE: 'getCourseTopRate',
    GET_COURSE_SAVE: 'getCourseSave',
    SAVE_COURSE: 'saveCourse',
    GET_SAVE_COURSE_STATUS: 'getSaveCourseStatus',
    FORGOT_PASSWORD: 'forgotPassword',
    GET_COURSE_WATCHING: 'getCourseWatching',
    LOGIN_GOOGLE: 'loginGoogle',
    GET_COURSE_RECOMMEND: 'getCourseRecommend',
    GET_SEARCH_HISTORY: 'getSearchHistory',
    GET_LESSON_VIDEO: 'getLessonVideo',
    GET_COURSE_PROCESS: 'getCourseProcess' ,
    EDIT_PROFILE: 'editProfile',
    CHANGE_PASSWORD: 'changePassword'
};

export function getActionSuccess(action) {
    return action + 'Success'
}
