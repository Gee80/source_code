import { combineEpics } from 'redux-observable';
import { from } from 'rxjs';
import {
    loginEpic,
    registerEpic,
    getProfileEpic,
    forgotPasswordEpic,
    loginGoogleEpic,
    editProfileEpic,
    changePasswordEpic
} from './userEpic';
import {
    getCategoriesEpic
} from './categoryEpic';
import {
    getNewCoursesEpic,
    search,
    getLecturesEpic,
    getCourseDetailEpic,
    getLectureEpic,
    getLessonsEpic,
    getCourseRatingEpic,
    getCourseDetailV2Epic,
    getQuestionsEpic,
    getNotesEpic,
    addNoteEpic,
    getCourseTopRateEpic,
    getCourseTopSellEpic,
    getCourseSaveEpic,
    saveCourseEpic,
    getSaveCourseStatusEpic,
    getCourseWatchingEpic,
    getCourseRecommendEpic,
    getLessonVideoEpic,
    getCourseProcessEpic,
} from './courseEpic'

import {
    registerFreeCourseEpic,
} from './paymentEpic'

export default combineEpics(
    loginEpic,
    registerEpic,
    getProfileEpic,
    getCategoriesEpic,
    getNewCoursesEpic,
    search,
    getLecturesEpic,
    getCourseDetailEpic,
    getLectureEpic,
    getLessonsEpic,
    registerFreeCourseEpic,
    getCourseRatingEpic,
    getCourseDetailV2Epic,
    getQuestionsEpic,
    getNotesEpic,
    addNoteEpic,
    getCourseTopRateEpic,
    getCourseTopSellEpic,
    getCourseSaveEpic,
    saveCourseEpic,
    getSaveCourseStatusEpic,
    forgotPasswordEpic,
    getCourseWatchingEpic,
    loginGoogleEpic,
    getCourseRecommendEpic,
    getLessonVideoEpic,
    getCourseProcessEpic,
    editProfileEpic,
    changePasswordEpic
);