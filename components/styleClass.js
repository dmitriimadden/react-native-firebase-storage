import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
var { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 30
    },
    account: {
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    cameraBackground: {
        position: 'absolute',
        zIndex: 1,
        width: width,
        height: height,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    CAMERA: {

        top: -2,
        position: 'absolute',
        width: width,
        bottom: -2,
        justifyContent: 'center',
        shadowRadius: 10,
        shadowColor: '#5C5CFF',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 0
        },
        borderRadius: 10,
        backgroundColor: null,

    },
    preview: {
        position: 'absolute',
        zIndex: 1,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        textAlign: 'center',

    },
    tabBar: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.5)',
        left: 0, bottom: 0, zIndex: 1,

        flexDirection: 'row',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",

    },
    header: {
        fontFamily: "Apple SD Gothic Neo",
        fontSize: 35,
        fontWeight: "bold",
        padding: 15
    },
    text: {
        fontSize: 20,
        fontWeight: "normal",
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    tabItem: {

        flex: 1,
        alignItems: 'center',
        padding: 16,
    },


    backItem: {
        marginTop: 0,
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 100, 255, 0.1)',
        padding: 10
    }
});
module.exports = styles;
