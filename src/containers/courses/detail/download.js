import RNFetchBlob from 'rn-fetch-blob'

downloadVideo = async (url) => {
    const hasWritePermission = await this.hasPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    const hasReadPermission = await this.hasPermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    if (!hasWritePermission || !hasReadPermission) return;
    let dirs = Platform.OS == 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFS.DownloadDirectoryPath;
    this.setState({ isDownloaded: false });
    try {
        RNFetchBlob.config({
            fileCache: true,
            path: dirs + '/' + this.state.lesson.name.replace(/\s/g, '') + '.mp4',
        }).fetch('GET', url).progress((received, total) => {
            this.setState({ progress: received / total })
        }).then((res) => {
            //path : Platform.OS === "ios" ? res.data : res.path();
            //TODO: download success do something
        }).catch((error) => {
            console.log("error while download", error);
            
        })
    } catch {
        (error) => {
            console.log("download error", error);
        }
    }
}

hasPermission = async (permissions) => {
    if (Platform.OS === 'ios' ||
        (Platform.OS === 'android' && Platform.Version < 23)) {
        return true;
    }

    const hasPermission = await PermissionsAndroid.check(
        permissions
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
        permissions
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
        console.log("Permission denied by user.");
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log("Permission revoked by user.");
    }

    return false;
}
