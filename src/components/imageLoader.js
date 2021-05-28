import React, { Component } from "react";
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import ic_default_user from 'images/ic_default_user.png';
import Utils from "utils/utils";;
import StorageUtil from "utils/storageUtil";

export default class ImageLoader extends Component {
    static defaultProps = {

    }

    constructor(props) {
        super(props);
        this.state = {
            _path: null,
            errorImage: null,
            loaded: false,

        }
        this.path = ic_default_user
    }

    /**
     * On start load image 
     */
    onLoadStart = () => {
        this.setState({ loaded: false })
    }

    /**
     * On load image finish 
     */
    onLoadEnd = () => {
        this.setState({ loaded: true })
    }

    componentDidMount() {
        this.handlePath()
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props !== nextProps) {
            this.props = nextProps
            this.handlePath()
        }
    }

    //handle path
    handlePath = () => {
        let { path, resizeAtt, resourceUrlPathResize } = this.props
        if (this.path != path) {
            this.path = path
            if (this.path === "" || this.path === null) {
                this.state._path = this.state.errorImage
            } else {
                this.state._path = path
            }
        }
    }

    //return resizeMode 
    returnResizeMode = (_id) => {
        var result = FastImage.resizeMode.contain;
        var id = _id.replace(/ /g, '');
        if (id === 'contain') {
            result = FastImage.resizeMode.contain
        } else if (id === 'cover') {
            result = FastImage.resizeMode.cover
        } else if (id === 'stretch') {
            result = FastImage.resizeMode.stretch
        } else {
            result = FastImage.resizeMode.center
        }
        return result;
    }

    render = () => {
        var { path, width, resizeModeType, height, style, isShowDefault } = this.props;
        return (
            <FastImage
                style={[style]}
                resizeMode={this.returnResizeMode(resizeModeType)}
                source={
                    this.state._path != null ?
                        { uri: this.state._path, priority: FastImage.priority.high }
                        : ic_default_user}
                onError={() => {
                    this.setState({
                        _path: this.state.errorImage
                    })
                }}
                onLoadEnd={this.onLoadEnd}
                onLoadStart={this.onLoadStart}
            />  
        )
    }
}