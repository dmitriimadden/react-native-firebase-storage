
import * as React from 'react';

import { FlatList, Alert, Image, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

import { Actions } from 'react-native-router-flux';
import firebase from './firebase.js';

import { Dimensions } from "react-native";
var { width, height } = Dimensions.get('window');



import styles from './styleClass.js';
const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>





export default class FirstRoute extends React.Component {
    state = {
        visible: false,
        index: 0,
        userId: '',
        userPhone: '',
        dataready: false,
    };
    componentDidMount() {
        this.getUserUID()

    }
    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
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

    render() {
        const signOut = () => {
            firebase.auth().signOut();
            this.setState({
                userId: null,
                userPhone: null
            })
            this.sleep(750).then(() => {
                Actions.replace('Auth');
            })
        }
        return (<View style={[styles.container, { backgroundColor: null }]} >
            <Text style={styles.header}>Account</Text>
            <View style={styles.account}>
                <Text style={styles.text}><B>UserID:</B> {this.state.userId}</Text>
                <Text style={styles.text}></Text>

                <Text style={styles.text}><B>Phone:</B> {this.state.userPhone}</Text>
                <TouchableOpacity style={styles.button} onPress={signOut}>
                    <Text style={[styles.text, { textAlign: 'center' }]}>Sign out </Text>
                </TouchableOpacity>
            </View>
        </View>)
    }

}