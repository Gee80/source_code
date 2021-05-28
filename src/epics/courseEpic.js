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
import * as courseActions from 'actions/courseActions';
import { ServerPath } from 'config/Server';
import { Header, handleErrors, consoleLogEpic, handleConnectErrors } from './commonEpic';
import { ErrorCode } from 'config/errorCode';
import { fetchError } from 'actions/commonActions';
import ApiUtil from 'utils/apiUtil';

export const getNewCoursesEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_NEW_COURSES),
        switchMap((action) =>
            fetch(ServerPath.API_URL + 'course/top-new', {
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
                return courseActions.getNewCoursesSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_NEW_COURSES EPIC:", ActionEvent.GET_NEW_COURSES, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const search = action$ =>
    action$.pipe(
        ofType(ActionEvent.SEARCH),
        switchMap((action) =>
            fetch(ServerPath.API_URL + 'course/search', {
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
                return courseActions.searchSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("SEARCH EPIC:", ActionEvent.SEARCH, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getLecturesEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_LECTURES),
        switchMap((action) =>
            fetch(ServerPath.API_URL + 'instructor', {
                method: 'GET',
                headers: ApiUtil.getHeader()
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return courseActions.getLecturesSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_LECTURES EPIC:", ActionEvent.GET_LECTURES, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getCourseDetailEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_COURSE_DETAIL),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `course/get-course-info?id=${action.payload.id}`, {
                method: 'GET',
                headers: ApiUtil.getHeader()
            }).then((response) => {
                console.log("get course detal: ", response)
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return courseActions.getCourseDetailSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_COURSE_DETAIL EPIC:", ActionEvent.GET_COURSE_DETAIL, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getLectureEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_LECTURE),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `instructor/detail/${action.payload.id}`, {
                method: 'GET',
                headers: ApiUtil.getHeader()
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return courseActions.getLectureSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_LECTURE EPIC:", ActionEvent.GET_LECTURE, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getLessonsEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_LESSONS),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `course/detail-with-lesson/${action.payload.id}`, {
                method: 'GET',
                headers: ApiUtil.getHeader()
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return courseActions.getLessonsSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_LESSONS EPIC:", ActionEvent.GET_LESSONS, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getCourseRatingEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_COURSE_RATING),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `course/get-rating/${action.payload.id}`, {
                method: 'GET',
                headers: ApiUtil.getHeader()
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return courseActions.getCourseRatingSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_COURSE_RATING EPIC:", ActionEvent.GET_COURSE_RATING, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getCourseDetailV2Epic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_COURSE_DETAIL_V2),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `course/get-course-detail/${action.payload.id}/${action.payload.userId}`, {
                method: 'GET',
                headers: ApiUtil.getHeader()
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return courseActions.getCourseDetailV2Success(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_COURSE_DETAIL_V2 EPIC:", ActionEvent.GET_COURSE_DETAIL_V2, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getQuestionsEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_QUESTIONS),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `forum/question/all?page=${action.payload.page}&pageSize=${action.payload.pageSize}&courseId=${action.payload.courseId}`, {
                method: 'GET',
                headers: ApiUtil.getHeader()
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {

                console.log("get QUESTIONS EPIC", responseJson);
                return courseActions.getQuestionsSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_QUESTIONS EPIC:", ActionEvent.GET_QUESTIONS, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getNotesEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_NOTES),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `user-note-lesson/get-by-course/${action.payload.courseId}`, {
                method: 'GET',
                headers: ApiUtil.getHeader()
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {

                console.log("get GET_NOTES EPIC", responseJson);
                return courseActions.getNotesSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_NOTES EPIC:", ActionEvent.GET_NOTES, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const addNoteEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.ADD_NOTE),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `user-note-lesson/create`, {
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

                console.log("get ADD_NOTE EPIC", responseJson);
                return courseActions.addNoteSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("ADD_NOTE EPIC:", ActionEvent.ADD_NOTE, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getCourseTopSellEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_COURSE_TOP_SELL),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `course/top-sell`, {
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

                console.log("get GET_COURSE_TOP_SELL EPIC", responseJson);
                return courseActions.getCourseTopSellSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_COURSE_TOP_SELL EPIC:", ActionEvent.GET_COURSE_TOP_SELL, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getCourseTopRateEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_COURSE_TOP_RATE),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `course/top-rate`, {
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

                console.log("get GET_COURSE_TOP_RATE EPIC", responseJson);
                return courseActions.getCourseTopRateSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_COURSE_TOP_RATE EPIC:", ActionEvent.GET_COURSE_TOP_RATE, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getCourseSaveEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_COURSE_SAVE),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `user/get-favorite-courses`, {
                method: 'GET',
                headers: ApiUtil.getHeader()
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {

                console.log("get GET_COURSE_SAVE EPIC", responseJson);
                return courseActions.getCourseSaveSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_COURSE_SAVE EPIC:", ActionEvent.GET_COURSE_SAVE, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getSaveCourseStatusEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_SAVE_COURSE_STATUS),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `user/get-course-like-status/${action.payload.courseId}`, {
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

                console.log("get GET_SAVE_COURSE_STATUS EPIC", responseJson);
                return courseActions.getSaveCourseStatusSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_SAVE_COURSE_STATUS EPIC:", ActionEvent.GET_SAVE_COURSE_STATUS, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const saveCourseEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.SAVE_COURSE),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `user/like-course`, {
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

                console.log("get SAVE_COURSE EPIC", responseJson);
                return courseActions.saveCourseSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("SAVE_COURSE EPIC:", ActionEvent.SAVE_COURSE, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getCourseWatchingEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_COURSE_WATCHING),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `user/get-process-courses`, {
                method: 'GET',
                headers: ApiUtil.getHeader()
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                console.log("get GET_COURSE_WATCHING EPIC", responseJson);
                return courseActions.getCourseWatchingSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_COURSE_WATCHING EPIC:", ActionEvent.GET_COURSE_WATCHING, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getCourseRecommendEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_COURSE_RECOMMEND),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `user/recommend-course/${action.payload.id}/${action.payload.limit}/${action.payload.offset}`, {
                method: 'GET',
                headers: ApiUtil.getHeader()
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return courseActions.getCourseRecommendSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_COURSE_RECOMMEND EPIC:", ActionEvent.GET_COURSE_RECOMMEND, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getLessonVideoEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_LESSON_VIDEO),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `lesson/video/${action.payload.courseId}/${action.payload.lessonId}`, {
                method: 'GET',
                headers: ApiUtil.getHeader()
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return courseActions.getLessonVideoSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_LESSON_VIDEO EPIC:", ActionEvent.GET_LESSON_VIDEO, error)
                    return handleConnectErrors(error)
                })
        )
    );

export const getCourseProcessEpic = action$ =>
    action$.pipe(
        ofType(ActionEvent.GET_COURSE_PROCESS),
        switchMap((action) =>
            fetch(ServerPath.API_URL + `course/process-course/${action.payload.courseId}`, {
                method: 'GET',
                headers: ApiUtil.getHeader()
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status == 400) {
                    return { status: response.status };
                }
                return handleErrors(response)
            }).then((responseJson) => {
                return courseActions.getCourseProcessSuccess(responseJson);
            })
                .catch((error) => {
                    consoleLogEpic("GET_COURSE_PROCESS EPIC:", ActionEvent.GET_COURSE_PROCESS, error)
                    return handleConnectErrors(error)
                })
        )
    );
