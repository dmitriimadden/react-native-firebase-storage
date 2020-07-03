
import * as React from 'react';

import { FlatList, Alert, Image, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SimpleAnimation } from 'react-native-simple-animations';
import firebase from './firebase.js';
import RNFetchBlob from 'rn-fetch-blob';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import styles from './styleClass.js';
import { Dimensions } from "react-native";
var { width, height } = Dimensions.get('window');


const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class Camera extends React.Component {
    state = {
        openCamera: false,
        selected_image: null,
        userId: '',
        scanned: false,
        hasCameraPermission: null,
        camera: {
            type: RNCamera.Constants.Type.back,
            flashMode: RNCamera.Constants.FlashMode.auto,
        },
        barData: null,
        barType: null,

    };
    componentDidMount() {
        this.getUserUID()
    }

    uploadImage(path) {
        const imageFile = RNFetchBlob.wrap(path);
        const ref = firebase.storage().ref('users/' + this.state.userId + '/docs/' + this.state.barData + '.jpg');
        var uploadBlob = null;

        Blob.build(imageFile, { type: 'image/jpg;' })
            .then((imageBlob) => {
                uploadBlob = imageBlob;

                return ref.put(imageBlob, { contentType: 'image/jpg' });
            })
            .then(() => {
                uploadBlob.close();
                return ref.getDownloadURL();
            })
            .catch(() => {

                dispatch({
                    type: UPDATE_PROFILE_INFO_FAIL,
                    payload: 'Unable to upload profile picture, please try again'
                });
            });
        Alert.alert(
            "Success",
            "Document has been sent to the server",
            [

                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: true }
        );
        this.setState({ barData: null, barType: null, scanned: false })
        this.camera.resumePreview()
    }

    async reset() {

        this.setState({ barData: null, barType: null, scanned: false })
        this.camera.resumePreview()
    }
    async getUserUID() {
        var user = firebase.auth().currentUser
        if (user == null)
            Actions.replace('Auth');
        else {
            this.setState({
                userId: user.uid,
                userPhone: user.phoneNumber
            })
            await this.setState({ dataready: true })
        }
    }


    constructor(props) {
        super(props);
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }
    onBarCodeRead = ({ data, type }) => {
        this.camera.pausePreview()

        this.setState({ barData: data, barType: type, scanned: true })
        this.selectPhotoTapped()
    }



    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };



        ImagePicker.showImagePicker(options, response => {

            if (response.didCancel) {
                this.setState({ barData: null, barType: null, scanned: false })
                this.camera.resumePreview()
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                var uploadUri = source.uri
                uploadUri = uploadUri.replace('file://', '')
                this.uploadImage(uploadUri)


                this.setState({
                    selected_image: source,
                });
            }
        });
    }


    render() {
        const { hasCameraPermission, scanned, openCamera } = this.state;


        return (
            <View style={{ height: height, width: width, borderRadius: 40 }}>
                {!openCamera && <SimpleAnimation animateOnUpdate={false} animate={!openCamera} direction={"up"} distance={height} delay={0} duration={1000} movementType={"slide"} >

                    <View style={styles.cameraBackground}>
                        <TouchableOpacity style={styles.button} onPress={() => this.setState({ openCamera: true })}>
                            <Text style={[styles.header, { color: 'white' }]}>Tap to Scan</Text>
                        </TouchableOpacity>
                    </View>
                </SimpleAnimation>}
                {openCamera && <SimpleAnimation animateOnUpdate={false} animate={openCamera} direction={"up"} distance={height} delay={100} duration={1000} movementType={"slide"} >

                    <View >
                        <Text style={styles.header}>Read the bar code</Text>
                        <View style={[{ height: height / 4, }]}>
                            <RNCamera
                                ref={ref => {
                                    this.camera = ref;
                                }}
                                captureAudio={false}
                                defaultTouchToFocus
                                mirrorImage={false}
                                onBarCodeRead={scanned ? undefined : this.onBarCodeRead}

                                style={[StyleSheet.absoluteFill]}
                                type={this.state.camera.type}
                            /></View>
                        <View style={styles.account}>
                            <Text style={styles.text}>Bar type: {this.state.barType}</Text>
                            <Text style={styles.text}>Bar code: {this.state.barData}</Text>
                        </View>



                    </View>
                </SimpleAnimation>}

            </View>
        );
    }
}

