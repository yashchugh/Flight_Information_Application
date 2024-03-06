import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';


export const AlertPopup = ({errorText, onClose}) => {


    return (
            <View style={phoneStyles.modalContainer}>
                <View style={phoneStyles.popup}>
                    <Text style={phoneStyles.text}>{errorText}</Text>
                    <View style={phoneStyles.buttonContainer}>
                        <TouchableOpacity style={phoneStyles.button1} onPress={onClose}>
                            <Text style={phoneStyles.logoutText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };
const phoneStyles = StyleSheet.create({
    modalContainer: {
        bottom: 300,
        left: 50,
        position: 'absolute',
        zIndex: 1,
    },
    popup: {
        width: 300,
        padding: 28,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
    },
    text: {
        fontSize: 20,
        // marginBottom: 30,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop:20,
    },
    button1: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#00a3b0',
    },
})