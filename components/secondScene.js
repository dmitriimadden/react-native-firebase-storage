
import * as React from 'react';

import { FlatList, Alert, Image, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { SimpleAnimation } from 'react-native-simple-animations';
import firebase from './firebase.js';

import { Dimensions } from "react-native";
var { width, height } = Dimensions.get('window');
import styles from './styleClass.js';



var storage = firebase.storage();
var storageRef = storage.ref();


export default class SecondRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            index: 0,
            userId: '',
            userPhone: '',
            dataready: false,
            listChecks: [{}],
            scroll: 0,
            isFetching: false,


        };
    };

    async componentDidMount() {
        await this.getUserUID()

    }



    async getUserUID() {
        var user = firebase.auth().currentUser
        if (user == null)
            Actions.replace('Auth');
        else {
            await this.setState({
                userId: user.uid,
                userPhone: user.phoneNumber
            })
            this.getDocuments()
        }
    }
    onRefresh() {
        this.setState({ isFetching: true, }, () => { this.getDocuments(); });
    }
    getDocuments() {
        this.setState({ listChecks: [{}], dataReady: false })

        var listRef = firebase.storage().ref('users/').child(this.state.userId).child('docs')

        listRef.listAll().then(res => {

            var i = 0
            res.items.forEach(itemRef => {
                i = i + 1;
                var docuname = (itemRef.name).replace('.jpg', '')

                this.state.listChecks.push({ key: 'Document:' + i, value: docuname })

            });
        }).then(ff => {
            this.state.listChecks.shift()
            this.setState({ dataReady: true, isFetching: false })
        })
            .catch(function (error) {
                console.log(error)
                // Uh-oh, an error occurred!
            });

    }

    render() {

        return (<View style={{ height: height, width: width, borderRadius: 40, justifyContent: 'space-evenly' }}>


            <View style={{
                width: width,
                height: height,
                left: 0,
            }}>
                <Text style={styles.header}>Scanned documents</Text>
                {this.state.dataReady && <SimpleAnimation animateOnUpdate={true} animate={true} direction={"up"} distance={height} delay={0} duration={1000} movementType={"slide"} >

                    <FlatList
                        contentContainerStyle={{ paddingTop: this.state.scroll }}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}

                        data={this.state.listChecks}
                        renderItem={({ item }) => <View style={styles.backItem}>
                            <Text style={{ ...styles.item, paddingTop: 15 }}>Document code: {item.value}</Text>
                        </View>}
                    /></SimpleAnimation>}</View>
            <View style={{ alignItems: 'center' }}>

            </View></View>)
    }

}
