import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { openDatabase } from 'react-native-sqlite-storage';


let db = openDatabase({ name: 'EreadbackDatabase.db' });
const isTablet = DeviceInfo.isTablet();
export const Data = ({ route }) => {
    const navigation = useNavigation();
    // const [airline, setAirline] = useState('');
    // const [flight, setFlight] = useState('');
    // const [reg, setReg] = useState('');
    const [Editable, setEditable] = useState(false);
    const [show,setShow] = useState(false);
    const [editButtonVisible, setEditButtonVisible] = useState(true);




    const handleEdit = () => {
        // console.log("Edit button clicked");
        setShow(true);
        setEditButtonVisible(false);
        setEditable(true);
    };

    const handleCancel = () => {
        setShow(false);
        setEditButtonVisible(true);
        setEditable(false);
    };

    // const route = useRoute();
    const handleUpdateData = () => {
        db.transaction((tx) => {
          tx.executeSql(
            'UPDATE table_data SET data_Airline = ?, data_Flight = ?, data_Reg = ?, data_Bay = ?, data_Date = ?, data_TIME = ? WHERE data_id = ?',
            [
              data.data_Airline,
              data.data_Flight,
              data.data_Reg,
              data.data_Bay,
              data.data_Date,
              data.data_TIME,
              item.data_id,
            ],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                console.log("Data updated successfully.");
              } else {
                console.log("Data update failed.");
              }
            }
          );
        });
        setShow(false);
        setEditButtonVisible(true);
        setEditable(false);
    };



    const { item } = route.params;
    const [data, setData] = useState({
        data_Airline: item.data_Airline,
        data_Flight: item.data_Flight,
        data_Reg: item.data_Reg,
        data_Bay: item.data_Bay,
        data_Date: item.data_Date,
        data_TIME: item.data_TIME,
      });

    return (
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <Image source={require('./Images/6.png')}
                style={Styles.background} />
            <Icon name={"arrow-back"} size={isTablet ? 45 : 30} color={'#00a3b0'} style={isTablet ? Styles.Icon : phoneStyles.Icon} onPress={() => navigation.navigate('Account')} />
            <Image source={require('./Images/5.png')} style={isTablet ? Styles.logo : phoneStyles.logo} />
            {editButtonVisible && (
            <TouchableOpacity style={phoneStyles.button} onPress={handleEdit}>
                <Text style={phoneStyles.buttonText}>Edit</Text>
            </TouchableOpacity>
            )}
            {show && (
            <TouchableOpacity style={phoneStyles.button1} value={show} onPress={handleUpdateData}>
                <Text style={phoneStyles.buttonText1}>Update</Text>
            </TouchableOpacity>
            )}
            {show && (
            <TouchableOpacity style={phoneStyles.button2} value={show} onPress={handleCancel}>
                <Text style={phoneStyles.buttonText1}>Cancel</Text>
            </TouchableOpacity>
            )}
            <View style={isTablet ? Styles.dataview : phoneStyles.dataview}>
                <Text style={isTablet ? Styles.pageheading : phoneStyles.pageheading}>Welcome to the data page</Text>
                <Text style={{ fontSize: 15, }}>Airline</Text>
                <TextInput editable={Editable} style={isTablet ? Styles.text : phoneStyles.text} onChangeText={(text) => setData({ ...data, data_Airline: text })}>{item.data_Airline}</TextInput>
                <Text style={{ fontSize: 15, marginTop: 5, }}>Flight</Text>
                <TextInput editable={Editable} style={isTablet ? Styles.text : phoneStyles.text} onChangeText={(text) => setData({ ...data, data_Flight: text })}>{item.data_Flight}</TextInput>
                <Text style={{ fontSize: 15, marginTop: 5, }}>Reg</Text>
                <TextInput editable={Editable} style={isTablet ? Styles.text : phoneStyles.text} onChangeText={(text) => setData({ ...data, data_Reg: text })}>{item.data_Reg}</TextInput>
                <View style={{ flexDirection: "column", marginLeft: 450, marginTop: -206, }}>
                    <Text style={{ fontSize: 15, marginTop: 5, }}>Bay</Text>
                    <TextInput editable={Editable} style={isTablet ? Styles.text : phoneStyles.text} onChangeText={(text) => setData({ ...data, data_Bay: text })}>{item.data_Bay}</TextInput>
                    <Text style={{ fontSize: 15, marginTop: 5, }}>Date</Text>
                    <TextInput editable={Editable} style={isTablet ? Styles.text : phoneStyles.text} onChangeText={(text) => setData({ ...data, data_Date: text })}>{item.data_Date}</TextInput>
                    <Text style={{ fontSize: 15, marginTop: 5, }}>Time</Text>
                    <TextInput editable={Editable} style={isTablet ? Styles.text : phoneStyles.text} onChangeText={(text) => setData({ ...data, data_TIME: text })}>{item.data_TIME}</TextInput>
                </View>
            </View>
        </View>
    );
};
const Styles = StyleSheet.create({
    background: {
        // flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    logo: {
        marginTop: 10,
    },
    pageheading: {
        fontSize: 40,
        fontweight: 'bold',
        marginLeft: 400,
        color: 'black',
    },
    text: {
        fontSize: 30,
        fontweight: 'bold',
    },
    Icon: {
        marginTop: 10,
        marginLeft: 10,
    },
});

const phoneStyles = StyleSheet.create({
    logo: {
        position: 'absolute',
        left: 50,
        width: 117,
        height: 50,
        // marginTop:0,
    },
    pageheading: {
        fontSize: 30,
        fontweight: 'bold',
        // marginLeft: 0,
        color: 'black',
        // marginTop:20,
        // justifyContent:'center',
        // alignItems: 'center',
    },
    text: {
        fontSize: 15,
        // color:'black',
        borderWidth: 2,
        borderColor: '#65c3cd',
        padding: 3
        ,
        borderRadius: 10,
        width: 230,
        marginTop: 5,
    },
    Icon: {
        marginTop: 5,
        marginLeft: 10,
    },
    dataview: {
        // marginTop:20,
        // backgroundColor:'red',
        marginLeft: 20,
    },
    button: {
        backgroundColor: '#00a3b0',
        padding: 8,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        marginLeft: 740,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    button1: {
        alignItems: 'center',
        backgroundColor: '#00a3b0',
        padding: 8,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 10,
        marginLeft: 540,
        marginRight: 180,
        marginTop: -18,
    },
    buttonText1: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    button2: {
        alignItems: 'center',
        backgroundColor: '#00a3b0',
        padding: 8,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 10,
        marginLeft: 350,
        marginRight: 180,
        marginTop: -38,
    },
}
);