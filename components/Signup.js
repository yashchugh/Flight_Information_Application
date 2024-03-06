import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import { AlertPopup } from './AlertPopup';
import Icon from 'react-native-vector-icons/Feather';


let db = openDatabase({ name: 'EreadbackDatabase.db' });

export const Signup = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [Uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);


  useEffect(() => {
    db.transaction((txn) => { // callback method
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [], // empty array
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_password VARCHAR(20), user_email VARCHAR(20),  user_mobilenumber INTEGER)',
              [],
            );
          }
          else {
            console.log('already created table');
          }
        }
      );
    });
  }, []);

  const saveData = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM table_user WHERE user_name = ? AND user_password = ?',
        [Uname, password],
        (tx, res) => {
          if (res.rows.length > 0) {
            handleOpenPopup('Username or password already exists. Please sign in.')
          } else {
            if (Uname.length === 0) {
              handleOpenPopup('Full name is required.');
            } else if (password.length == 0) {
              handleOpenPopup('Password is required.');
            }
            else if (email.length == 0) {
              handleOpenPopup('Email is required.');
            }
            else if (mobilenumber.length !== 10) {
              handleOpenPopup('Mobile number must be 10 digits long.')
            } else {
              txn.executeSql(
                'INSERT INTO table_user(user_name, user_password, user_email, user_mobilenumber) VALUES (?,?,?,?)',
                [Uname, password, email, mobilenumber],
                (txn, res) => {
                  if (res.rowsAffected === 1) {
                    console.log('Data inserted successfully.');
                    navigation.navigate('Login');
                  } else {
                    console.log('Data insertion failed.');
                    console.log(res);
                  }
                }
              );
            }
          }
        }
      );
    });
  };

  //   const handleInputChange = (text) => {
  //     if (text.includes(' ')) {
  //         setPopupVisible(true);
  //     } else {
  //         setEmail(text);
  //     }
  // };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const handleOpenPopup = (erroMessage) => {
    setErrorText(erroMessage);
    setPopupVisible(true);
  };
  // const emailRegex =  /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  // const isEmailValid = (text) => {
  //   // Regular expression for a basic email validation
  //   const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  //   return emailRegex.test(text);
  // };

  const handleCheckEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setIsEmailValid(false);

    } else {
      setIsEmailValid(true);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar hidden={false} backgroundColor="#ddf5f7" barStyle={"dark-content"} />
      <Image source={require('./Images/6.png')} style={Style.background} />
      <Image source={require('./Images/5.png')} style={Style.logo} />
      <Text style={Style.headingText}> Welcome To Signup Page </Text>
      <View style={{ marginTop: 20 }}>
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>Enter your full name</Text>
          <TextInput placeholder="Full Name" style={Style.textInput} onChangeText={(text) => {
            const formattedText = text.replace(/[^a-zA-Z ]/g, '');
            setUname(formattedText);
          }} value={Uname} maxLength={30} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>Enter your password</Text>
          <TextInput placeholder="Password" style={Style.textInput} onChangeText={(text) => setPassword(text)} value={password} secureTextEntry={!passwordVisible} maxLength={32} />
          <Icon name={passwordVisible ? "eye" : "eye-off"} size={25} style={{position: 'absolute',left:160,top:35}} color="#65c3cd" onPress={togglePasswordVisibility} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>Enter your email</Text>
          <TextInput
            placeholder="Email"
            style={Style.textInput}
            onChangeText={(text) => handleCheckEmail(text)}
            value={email}
            keyboardType="email-address"
            maxLength={64}
            autoComplete="email"
          />
          {isEmailValid ? (
            <Text style={{ color: 'red', fontWeight: 'bold' }}>Wrong format email</Text>
          ) : (
            <></>
          )}
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>Enter your mobile number</Text>
          <TextInput placeholder="Mobile Number" style={Style.textInput} onChangeText={(text) => {
            const formattedText = text.replace(/[^0-9]/g, '');
            setMobilenumber(formattedText);
          }} value={mobilenumber} maxLength={10} />
        </View>
      </View>
      <TouchableOpacity style={Style.button} onPress={() => { saveData(); }}>
        <Text style={Style.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={Style.container}>
        <Text style={Style.signinText}>Have an account already?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={Style.buttonText1}>Sign in</Text>
        </TouchableOpacity>
      </View>
      {isPopupVisible && <AlertPopup onClose={handlePopupClose} errorText={errorText} />}
    </View>
  )
};

const Style = StyleSheet.create({
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginTop:140,
  },
  background: {
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logo: {
    position: 'absolute',
    top: 10,
    left: 5,
    width: 117,
    height: 50,
  },
  button: {
    backgroundColor: '#00a3b0',
    padding: 8,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  textInput: {
    fontSize: 15,
    color: 'black',
    borderWidth: 2,
    borderColor: '#65c3cd',
    padding: 7,
    borderRadius: 10,
    width: 200,
    // marginTop:5,
  },
  buttonText1: {
    color: '#60adf7',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 15,
    marginLeft: 5,
  },
  signinText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 15,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  label: {
    position: 'absolute',
    left: 7,
    top: 0,
    paddingHorizontal: 5,
  },
})