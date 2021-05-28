import React, { Component } from "react";
import {
    View, StatusBar, StyleSheet,
    Alert, Image
} from "react-native";
import { Container, Header, Root } from "native-base";
import { Colors } from "values/colors";
import SplashScreen from 'react-native-splash-screen';
import { Constants } from "values/constants";
import commonStyles from "styles/commonStyles";
import { Fonts } from "values/fonts";
import ic_logo_splash from 'images/ic_logo_splash.png'
// import styles from './styles';

class SplashView extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
            return (
                <Container style={{justifyContent:'center', alignItems: 'center'}}>
                    <Image source ={ic_logo_splash} />
                </Container>
            );
    }
}

export default SplashView;