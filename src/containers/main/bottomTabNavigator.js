import React, { Component } from 'react';
import {
	BackHandler,
	Text,
	View,
	Image,
	Alert,
	Dimensions
} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

import HomeView from 'containers/home/homeView';
import BrowseView from 'containers/browse/browseView';
import DownloadView from 'containers/download/downloadView';
import SearchView from 'containers/search/searchView';

import ic_home_white from "images/ic_home_white.png";
import ic_home_blue from "images/ic_home_blue.png";
import ic_search_white from 'images/ic_search_white.png';
import ic_search_blue from 'images/ic_search_blue.png';
import ic_grid_white from 'images/ic_grid_white.png';
import ic_grid_blue from 'images/ic_grid_blue.png';
import ic_download_blue from 'images/ic_download_blue.png';
import ic_download_white from 'images/ic_download_white.png';
import { Colors } from 'values/colors';
import i18n, { localizes } from "locales/i18n";

const BottomTabNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName="TabHome"
			activeColor={Colors.COLOR_BLUE}
			inactiveColor={'white'}
			backBehavior={"initialRoute"}
		> 
			<Tab.Screen
				name="TabHome"
				component={HomeView}
				options={{
					title: localizes('bottomTab.home'),
					tabBarIcon: ({ focused, color, size }) => (
						<Image source={focused ? ic_home_blue : ic_home_white} />
					),
					tabBarColor: Colors.COLOR_TAB
				}}
			/>
			<Tab.Screen
				name="Downloads"
				component={DownloadView}
				options={{
					title: localizes('bottomTab.favorite'),
					tabBarIcon: ({ focused, color, size }) => (
						<Image source={focused ? ic_download_blue : ic_download_white} />
					),
					tabBarColor: Colors.COLOR_TAB
				}}
			/>
			<Tab.Screen
				name="Browser"
				component={BrowseView}
				options={{
					title: localizes('bottomTab.browser'),
					tabBarIcon: ({ focused, color, size }) => (
						<Image source={focused ? ic_grid_blue : ic_grid_white} />
					),
					tabBarColor: Colors.COLOR_TAB
				}}
			/>
			<Tab.Screen
				name="Search"
				component={SearchView}
				options={{
					title: localizes('bottomTab.search'),
					tabBarIcon: ({ focused, color, size }) => (
						<Image source={focused ? ic_search_blue : ic_search_white} />
					),
					tabBarColor: Colors.COLOR_TAB
				}}
			/>
		</Tab.Navigator>
	);
}

export default BottomTabNavigator;