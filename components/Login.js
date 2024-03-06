import React, { useState, useEffect  } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { openDatabase } from 'react-native-sqlite-storage';
import { AlertPopup } from './AlertPopup';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

let db = openDatabase({name: 'EreadbackDatabase.db'});
const isTablet = DeviceInfo.isTablet();

const items = [
    {
      title: 'Maximize Efficiency and Reduce Errors',
      subtitle: 'With our Flight Baggage Software',
      description: 'Take Control of your air baggage management.',
    },
    {
      title: 'Another Text',
      subtitle: 'Add more details here',
      description: '',
    },
    {
      title: 'Sample Text',
      subtitle: 'Add more details here',
      description: '',
    },
  ];

  export const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [Uname, setUname] = useState('');
    const navigation = useNavigation();
    const [containerdirection, setContainerDirection] = useState();
    // const[userList,setUserList]=useState([]); // used for to display the data in the db
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [errorText, setErrorText] = useState(''); 




     useEffect(() => {
      const updateContainerDirection = () => {
        setContainerDirection(
          Dimensions.get('window').width > Dimensions.get('window').height ? 'row' : 'column'
        );
      };
    
      // Listen for changes in screen dimensions only if available
      if (Dimensions.addEventListener) {
        Dimensions.addEventListener('change', updateContainerDirection);
      }
    
      return () => {
        // Clean up the event listener when the component unmounts, if available
        if (Dimensions.removeEventListener) {
          Dimensions.removeEventListener('change', updateContainerDirection);
        }
      };
    }, []);
 
    // const handleSubmit = () => {
    //   if (Uname === '' && password === '') {
    //     // If the username and password match, navigate to 'Account'
    //     navigation.navigate('Account');
    //   } else {
    //     // If they don't match, display an error message
    //     console.warn('Error! Oops, that is not a match.');
    //   }
    // };

    const handleSubmit = () => {
      db.transaction((txn) => {
        txn.executeSql(
          'SELECT * FROM table_user WHERE user_name = ? AND user_password = ?',
          [Uname, password],
          (tx, res) => {
            if (res.rows.length > 0) {
              // User with the provided username and password exists
              navigation.navigate('Account');
            } else {
              // No matching user found, display an error message
              handleOpenPopup('Error! Username and password do not match.')
            }
          }
        );
      });
    };

    const handlePopupClose = () => {
      setPopupVisible(false);
    };
    
    const handleOpenPopup = (erroMessage) => {
      setErrorText(erroMessage);
      setPopupVisible(true);
    };


    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
// 1 - Query 2 - values inside array  3 - callback method for response
    // useEffect(() => {
    //   db.transaction((txn) => { // callback method
    //     txn.executeSql(
    //       "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
    //       [], // empty array
    //        (tx, res) =>  {
    //         console.log('item:', res.rows.length);
    //         if (res.rows.length == 0) {
    //           txn.executeSql('DROP TABLE IF EXISTS table_user', []);
    //           txn.executeSql(
    //             'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_password VARCHAR(20))',
    //             [],
    //           );
    //         }
    //         else {
    //           console.log('already created table');
    //         }
    //       }
    //     );
    //   });
    // }, []);

// to save the data in the db
// apply this line to sign up or sign in button onPress={()=>{saveData();}}
    // const saveData = () => {
    //   db.transaction(txn => {
    //     txn.executeSql(
    //       'INSERT INTO table_user( user_name, user_password) VALUES (?,?)',
    //       [Uname, password],
    //       (txn, res) => {
    //         if (res.rowsAffected == 1) {
    //           console.log('Data inserted successfully.');
    //           navigation.navigate('Account');
    //         } else {
    //           console.log('Data insertion failed.');
    //           console.log(res);
    //         }
    //       }
    //     );
    //   });
    // };

    // to display the data in the db
    // useEffect(() => {
    //   db.transaction(txn=>{
    //     txn.executeSql("SELECT * FROM table_user", [],(tx,res)=>{
    //       let temp = [];
    //       for (let i = 0; i < res.rows.length; ++i)
    //       {
    //         console.log(res.rows.item(i));
    //         temp.push(res.rows.item(i));
    //       }
    //         setUserList(temp);
    //     });
    //   });
    // },[]); 




    return (
      <View style={[tabletStyles.container, { flexDirection: containerdirection }]}>
        <StatusBar hidden={false} backgroundColor="#ddf5f7"  barStyle={"dark-content"}/>
        <View className="Left Division" style={isTablet ? tabletStyles.divisionLeft : phoneStyles.divisionLeft}>
          <Image source={require('./Images/6.png')}
            style={tabletStyles.background} />
          <Image source={require('./Images/5.png')}
            style={isTablet ? tabletStyles.logo : phoneStyles.logo}/>
          <Text style={ isTablet ? tabletStyles.HeadingText : phoneStyles.HeadingText}>
            Welcome Back
          </Text>
          <View>
            <Text style={isTablet ? tabletStyles.UserSubHeading : phoneStyles.UserSubHeading}>UserName</Text>
          </View>
          <View>
          <TextInput placeholder='Enter your username' style={isTablet ? tabletStyles.textInputUser : phoneStyles.textInputUser}onChangeText={(text) => setUname(text)}></TextInput>
          </View>
          <View>
            <Text style={isTablet ? tabletStyles.PassSubHeading : phoneStyles.PassSubHeading}>Password</Text>
          </View>
          <View>
            <TextInput placeholder='Enter your password' style={ isTablet ? tabletStyles.textInputPass : phoneStyles.textInputPass} secureTextEntry={!passwordVisible} value={password}  onChangeText={(text) => setPassword(text)}></TextInput>
            <Icon name={passwordVisible ? "eye" : "eye-off"} size={isTablet ? 35 : 25} style={ isTablet ? tabletStyles.eyeIcon : phoneStyles.eyeIcon} color="#65c3cd" onPress={togglePasswordVisibility} />
          </View>
          <View>
            <TouchableOpacity style={isTablet ? tabletStyles.button : phoneStyles.button} onPress={handleSubmit}>
              <Text style={isTablet ? tabletStyles.buttonText : phoneStyles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <View style={phoneStyles.signupcontainer}>
          <Text style={phoneStyles.signuptext}>Don't have an account?</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
            <Text style={phoneStyles.buttonText1}>Sign up</Text>
          </TouchableOpacity>
          </View>
        </View>
        <View className="Right Division" style={tabletStyles.divisionLeft}>
          <Image source={require('./Images/7.png')}
            style={tabletStyles.backgroundRight}
          />
          <View style={tabletStyles.containerSwiper}>
            <Swiper style={tabletStyles.wrapper} showsButtons={false} autoplayTimeout={5} autoplay={true} dotStyle={tabletStyles.dot} paginationStyle={isTablet ? tabletStyles.pagination : phoneStyles.pagination} activeDotStyle={tabletStyles.active}>
              {items.map((item, index) => (
                <View style={isTablet ? tabletStyles.slide : phoneStyles.slide} key={index}>
                  <Text style={tabletStyles.title}>{item.title}</Text>
                  <Text style={tabletStyles.subtitle}>{item.subtitle}</Text>
                  <Text style={tabletStyles.description}>{item.description}</Text>
                </View>
              ))}
            </Swiper>
          </View>
        </View>
        {isPopupVisible && <AlertPopup onClose={handlePopupClose} errorText={errorText}/>}
      </View>
    );
  };


  const tabletStyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: Dimensions.get('window').width > Dimensions.get('window').height ? 'column' : 'row',
    },
    divisionLeft: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',  // Center items horizontally
    },
    HeadingText: {
      fontSize: 40,
      padding: 0,
      marginLeft: 100,
      marginTop: 5,
      fontWeight: 'bold',
    },
    textInputUser: {
      fontSize: 25,
      color: 'black',
      borderWidth: 2,
      borderColor: '#65c3cd',
      marginLeft: 100,
      marginTop: 30,
      padding: 20,
      borderRadius: 10,
      width: 350,
    },
    textInputPass: {
      fontSize: 25,
      color: 'black',
      borderWidth: 2,
      borderColor: '#65c3cd',
      marginLeft: 100,
      marginTop: 30,
      padding: 20,
      borderRadius: 10,
      width: 350,
    },
    UserSubHeading: {
      fontSize: 25,
      padding: 0,
      marginLeft: 100,
      marginTop: 20,
      fontWeight: 'bold',
    },
    PassSubHeading: {
      fontSize: 25,
      padding: 0,
      marginLeft: 100,
      marginTop: 20,
      fontWeight: 'bold',
    },
    background: {
      flex: 1,
      resizeMode: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    divisionRight: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    backgroundRight: {
      flex: 1,
      resizeMode: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#00a3b0',
      padding: 20,
      paddingLeft: 50,
      paddingRight: 50,
      marginLeft: 180,
      marginTop: 40,
      borderRadius: 10,
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    eyeIcon: {
      position: 'absolute',
      left: 395,
      bottom: 20,
    },
    containerSwiper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: {},
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3a4147',
      borderRadius: 10,
      marginTop: 500,
      marginBottom: 100,
      marginLeft: 50,
      marginRight: 50,
      opacity: 0.8,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    subtitle: {
      fontSize: 18,
      color: 'white',
    },
    description: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
    },
    dot: {
      width: 10,
      height: 10,
      backgroundColor: 'gray',
    },
    pagination: {
      bottom: 120,
    },
    active: {
      width: 30,
    },
  });


  const phoneStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    divisionLeft: {
      flex: 1,
      justifyContent: 'flex-start', // Align items at the top
      alignItems: 'flex-start', // Center items horizontally
    },
    logo: {
      width: 117,
      height: 50,
      marginLeft:10,
      top:5,
     },
    HeadingText: {
      fontSize: 20,
      padding: 0,
      marginLeft: 100,
      marginTop: 10,
      fontWeight: 'bold',
    },
    UserSubHeading: {
      fontSize: 20,
      padding: 0,
      marginLeft: 100,
      marginTop: 10,
      fontWeight: 'bold',
    },
    PassSubHeading: {
      fontSize: 20,
      padding: 0,
      marginLeft: 100,
      marginTop: 10,
      fontWeight: 'bold',
    },
    textInputUser: {
      fontSize: 15,
      color: 'black',
      borderWidth: 2,
      borderColor: '#65c3cd',
      marginLeft: 100,
      marginTop: 10,
      padding: 7,
      borderRadius: 10,
      width: 200,
    },
    textInputPass: {
      fontSize: 15,
      color: 'black',
      borderWidth: 2,
      borderColor: '#65c3cd',
      marginLeft: 100,
      marginTop: 10,
      padding: 7,
      borderRadius: 10,
      width: 200,
    },
    eyeIcon: {
      position: 'absolute',
      left: 260,
      bottom: 11,
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#00a3b0',
      padding: 8,
      paddingLeft: 15,
      paddingRight: 15,
      marginLeft: 150,
      marginTop: 15,
      borderRadius: 10,
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 15,
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3a4147',
      borderRadius: 10,
      marginTop: 170,
      marginBottom: 20,
      marginLeft: 50,
      marginRight: 50,
      opacity: 0.8,
    },
    pagination: {
      bottom: 24,
    },
    signuptext:{
    fontSize:15,
    fontWeight:'bold',
    marginLeft:100,
    marginTop:2,
    },
    buttonText1:{
      color:'#60adf7',
      fontWeight:'bold',
      fontSize:15,
      marginLeft:5,
      marginTop:1,
    },
    signupcontainer:{
      flexDirection:'row',
      justifyContent:'flex-start',
    },
  });
