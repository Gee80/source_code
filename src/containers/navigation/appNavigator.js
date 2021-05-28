import React, { Component } from "react";
import {
    Easing, Animated, View, Text, Platform
} from "react-native";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SplashView from "containers/splash/splashView";
import Main from "containers/main/bottomTabNavigator";
import LoginView from 'containers/login/loginView';
import RegisterView from 'containers/register/registerView';
import { enableScreens } from 'react-native-screens';
import { Colors } from 'values/colors';
import ForgetPasswordView from "containers/forgetPass/forgetPasswordView";
import VerifyPassWordView from "containers/verifyPass/verifyPassWordView";
import UserProfileView from "containers/profile/userProfileView";
import SettingView from "containers/setting/settingView";
import CourseListView from 'containers/courses/list/courseListView';
import CourseDetailView from "containers/courses/detail/courseDetailView";
import BrowseView from "containers/browse/browseView";
import SearchView from "containers/search/searchView";
import RecommendListView from "containers/courses/list/recommend/recommendListView";
import Analytics from 'containers/analytic/analytic'
import watchingListView from "containers/courses/list/watching/watchingListView";
import changePasswordView from "containers/changePass/changePasswordView";
import courseLikeCategory from "containers/courses/list/similary/courseLikeCategory";

enableScreens();

const OS = Platform.OS
const Stack = createStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: Colors.COLOR_BACKGROUND,
    },
};
const getActiveRouteName = (navigationState) => {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getActiveRouteName(route);
    }
    return route.name;
}

const AppNavigator = () => {
    return (
        <NavigationContainer
            ref={(navigationRef) => this.navigationRef = navigationRef}
            onStateChange={async (state) => {
                const previousRouteName = navigationRef.current;
                const currentRouteName = getActiveRouteName(state);
                if (previousRouteName !== currentRouteName) {
                    Analytics.setCurrentScreen(currentRouteName);
                    Analytics.logEvent(OS.toUpperCase() + "_SCREEN_" + currentRouteName.toUpperCase());
                }
            }}
            theme={MyTheme}>
            <Stack.Navigator
                initialRouteName={'Main'}
                headerMode={'none'}
                mode={'modal'}
                screenOptions={{
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    ...TransitionPresets.SlideFromRightIOS
                }}
            >
                <Stack.Screen name="Splash" component={SplashView} />
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Login" component={LoginView} />
                <Stack.Screen name="Register" component={RegisterView} />
                <Stack.Screen name="ForgetPass" component={ForgetPasswordView} />
                <Stack.Screen name="VerifyPass" component={VerifyPassWordView} />
                <Stack.Screen name="UserProfile" component={UserProfileView} />
                <Stack.Screen name="Setting" component={SettingView} />
                <Stack.Screen name="CourseList" component={CourseListView} />
                <Stack.Screen name="CourseDetail" component={CourseDetailView} />
                <Stack.Screen name="Browser" component={BrowseView} />
                <Stack.Screen name="Search" component={SearchView} />
                <Stack.Screen name="RecommendList" component={RecommendListView} />
                <Stack.Screen name="WatchingList" component={watchingListView} />
                <Stack.Screen name="ChangePass" component={changePasswordView} />
                <Stack.Screen name="CourseLikeCategory" component={courseLikeCategory} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;