import * as React from 'react';
import FirstRoute from './firstScene.js'
import SecondRoute from './secondScene.js'

import Camera from './thirdScene.js'
import { FlatList, Alert, Image, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import { SimpleAnimation } from 'react-native-simple-animations';
import firebase from './firebase.js';
import { Dimensions } from "react-native";
var { width, height } = Dimensions.get('window');



var storage = firebase.storage();
var storageRef = storage.ref();

import styles from './styleClass.js';



const image_bg = require('../assets/bg2.jpg');


export default class Main extends React.Component {
    state = {
        visible: false,
        index: 0,
        userId: '',
        userPhone: '',
        dataready: false,
        routes: [
            { key: 'first', title: 'Account' },
            { key: 'second', title: 'Documents' },
            { key: 'third', title: 'Scan' }
        ],
    };

    _handleIndexChange = index => {
        this.props.navigation.setParams({
            title: this.state.routes[index].title,
        });
        this.setState({ index })
    };

    _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = Animated.color(
                        Animated.round(
                            Animated.interpolate(props.position, {
                                inputRange,
                                outputRange: inputRange.map(inputIndex =>
                                    inputIndex === i ? 255 : 0
                                ),
                            })
                        ),
                        0,
                        0
                    );

                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}>
                            <Animated.Text style={{ color }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    _renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: Camera
    });

    render() {
        return (
            <SimpleAnimation delay={500} style={{ flex: 1 }} duration={1000} fade >

                <ImageBackground blurRadius={40} source={image_bg} style={styles.image}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <TabView
                            navigationState={this.state}
                            renderScene={this._renderScene}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                            initialLayout={{ backgroundColor: 'green' }}

                        />
                    </SafeAreaView>
                </ImageBackground>
            </SimpleAnimation>
        );
    }
}

