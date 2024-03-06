import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon6 from 'react-native-vector-icons/Entypo';
import Icon7 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon8 from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { openDatabase } from 'react-native-sqlite-storage';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

let db = openDatabase({ name: 'EreadbackDatabase.db' });
const isTablet = DeviceInfo.isTablet();

const Users = [
  {
    // id: 1,
    Airline: 'SINGAPORE AIRLINES',
    Flight: 'SQ 951',
    Reg: '9V-SWB',
    Bay: '',
    Date: '2023-09-15',
    Time: '5:25/5:25',
  },
  {
    // id: 2,
    Airline: 'SINGAPORE AIRLINES',
    Flight: 'SQ 957',
    Reg: '9V-SME',
    Bay: 'G26',
    Date: '2023-09-15',
    Time: '11:15/11:15',
  },
  {
    // id: 3,
    Airline: 'SINGAPORE AIRLINES',
    Flight: 'SQ 963',
    Reg: '9V-SME',
    Bay: '',
    Date: '2023-09-15',
    Time: '18:05/18:05',
  },
  {
    // id: 4,
    Airline: 'SINGAPORE AIRLINES',
    Flight: 'SQ 953',
    Reg: '9VSWY',
    Bay: 'G26',
    Date: '2023-09-15',
    Time: '7:55/7:55',
  },
  {
    // id: 5,
    Airline: 'SINGAPORE AIRLINES',
    Flight: 'SQ 959',
    Reg: '9VSMG',
    Bay: 'G23',
    Date: '2023-09-15',
    Time: '14:10/14:10',
  },
  {
    // id: 6,
    Airline: 'SINGAPORE AIRLINES',
    Flight: 'SQ 965',
    Reg: '',
    Bay: '',
    Date: '2023-09-15',
    Time: '19:00/19:00',
  },
  {
    // id: 7,
    Airline: 'SINGAPORE AIRLINES',
    Flight: 'SQ 957',
    Reg: '9VAII',
    Bay: 'G27',
    Date: '2023-09-14',
    Time: '7:55/7:55',
  },
  {
    // id: 8,
    Airline: 'SINGAPORE AIRLINES',
    Flight: 'SQ 969',
    Reg: '9VSMH',
    Bay: 'G23',
    Date: '2023-09-14',
    Time: '14:10/14:10',
  },
  {
    // id: 9,
    Airline: 'SINGAPORE AIRLINES',
    Flight: 'SQ 970',
    Reg: '',
    Bay: '',
    Date: '2023-09-14',
    Time: '19:00/19:00',
  },
]


export const Account = () => {
  // console.warn(props.route.params);
  // const {name,age} = props.route.params;
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [logoutConfirmationVisible, setLogoutConfirmationVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [refreshFlatList, setRefreshFlatList] = useState(false);



  useEffect(() => {
    db.transaction((txn) => { // callback method
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_data'",
        [], // empty array
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_data', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_data(data_id INTEGER PRIMARY KEY AUTOINCREMENT, data_Airline VARCHAR(20), data_Flight VARCHAR(20), data_Reg VARCHAR(20),  data_Bay VARCHAR(20), data_Date DATE, data_TIME INTEGER(10))',
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


  // Query for inserting data into database
//   const insertData = () => {
//   db.transaction(tx => {
//     Users.forEach(newUser => {
//       tx.executeSql(
//         'INSERT INTO table_data(data_Airline, data_Flight, data_Reg, data_Bay, data_Date, data_Time) VALUES (?, ?, ?, ?, ?, ?)',
//         [newUser.Airline, newUser.Flight, newUser.Reg, newUser.Bay, newUser.Date, newUser.Time],
//         (tx, results) => {
//           if (results.rowsAffected > 0) {
//             console.log('User inserted successfully');
//           } else {
//             console.log('Failed to insert user');
//           }
//         },
//         error => {
//           console.error(error);
//         }
//       );
//     });
//   });
// }

  // Fetch data from the Users table
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_data',
        [],
        (tx, results) => {
          const data = [];
          for (let i = 0; i < results.rows.length; i++) {
            data.push(results.rows.item(i));
          }
          setData(data);
        }
      );
    });
  }, []);

  

  const filterData = (query,selectedDate) => {
    const filteredData = data.filter((item) => {
      const { data_Airline, data_Flight, data_Bay, data_Reg, data_Date, data_TIME  } = item;
      const lowerCaseQuery = query.toLowerCase();
  
      return (
        (data_Flight.toLowerCase().includes(lowerCaseQuery) ||
          data_Airline.toLowerCase().includes(lowerCaseQuery) ||
          data_Bay.toLowerCase().includes(lowerCaseQuery) ||
          data_Reg.toLowerCase().includes(lowerCaseQuery)  ||
          data_TIME.toLowerCase().includes(lowerCaseQuery)) &&
          data_Date === selectedDate
      );
    });
    return filteredData;
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = filterData(text, selectedDate);
    setFilteredUsers(filteredData);
  };

  const navigation = useNavigation();
  const handleLogout = () => {
    setLogoutConfirmationVisible(true);
  };
  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };


  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    const filteredData = data.filter((item) => item.data_Date === day.dateString);
    // console.log('Selected Date:', day.dateString);
    // console.log('Filtered Data:', filteredData);
    setCalendarVisible(false);
    setFilteredUsers(filteredData);
    setRefreshFlatList(!refreshFlatList);

  };

  const closeCalendar = () => {
    setCalendarVisible(false);
  };

  const cancelLogout = () => {
    setLogoutConfirmationVisible(false); 
  };

  const confirmLogout = () => {
    // Perform the logout action here
    navigation.navigate('Login');
  };

  const [isPortrait, setIsPortrait] = useState(true);

  const handleLayoutChange = () => {
    const { width, height } = Dimensions.get('window');
    setIsPortrait(height > width);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', handleLayoutChange);

    return () => {
      // Dimensions.removeEventListener('change', handleLayoutChange);
    };
  }, []);



  const PortraitFlatList = () => (
    // For JASON data access 
    // <FlatList
    //   numColumns={1}
    //   data={filterUsers(searchQuery, selectedDate)}
    //   renderItem={({ item }) => <Userdata item={item.data} />}
    // />

    <FlatList
      numColumns={3}
      data={filteredUsers}
      keyExtractor={(item) => item.data_id.toString()}
      renderItem={({ item }) => <Userdata item={item} />}
      extraData={refreshFlatList}  
      />
  );

  // const route = useRoute();
  const LandscapeFlatList = () => (
    // For JASON data access
    //   <FlatList
    //     numColumns={3}
    //     data={filterUsers(searchQuery, selectedDate)}
    //     renderItem={({ item }) => <Userdata item={item} />}
    //   />
    // );


    <FlatList
      numColumns={3}
      data={filteredUsers}
      keyExtractor={(item) => item.data_id.toString()}
      renderItem={({ item }) => <Userdata item={item} />}
      extraData={refreshFlatList}
    />
  );


  return (
    <TouchableWithoutFeedback onPress={closeCalendar}>
      <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: 'red' }}>
        <Image source={require('./Images/6.png')}
          style={Styles.background} />
        <Image source={require('./Images/5.png')}
          style={isTablet ? Styles.logo : phoneStyles.logo} />
        <View style={Styles.container}>
          <Text style={isTablet ? Styles.flightText : phoneStyles.flightText} >Flight Selection</Text>
          <View style={isTablet ? Styles.yellowColor : phoneStyles.yellowColor} />
          <Text style={isTablet ? Styles.yellowText : phoneStyles.yellowText}>Partial Read-Back (0)</Text>
          <View style={isTablet ? Styles.greenColor : phoneStyles.greenColor} />
          <Text style={isTablet ? Styles.greenText : phoneStyles.greenText}>Final Read-Back (0)</Text>
          <View style={isTablet ? Styles.blueColor : phoneStyles.blueColor}/>
          <Text style={isTablet ? Styles.blueText : phoneStyles.blueText}>Load Completed (0)</Text>
        </View>
        <TextInput placeholder="Search" style={isTablet ? Styles.search : phoneStyles.search} autoCorrect={false} onChangeText={handleSearch} value={searchQuery} keyboardAppearance={false} disableFullscreenUI={true}></TextInput>
        <TextInput placeholder="Calendar" style={isTablet ? Styles.calender : phoneStyles.calender} value={selectedDate} onFocus={toggleCalendar}></TextInput>
        <Icon name={"search"} size={isTablet ? 30 : 25} style={isTablet ? Styles.icon : phoneStyles.icon}  />
        <Icon8 name={"calendar"} size={isTablet ? 30 : 25} style={isTablet ? Styles.icon8 : phoneStyles.icon8} onPress={toggleCalendar} />
        {calendarVisible && (
          <View style={isTablet ? Styles.calendarOpen : phoneStyles.calendarOpen}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={{ [selectedDate]: { selected: true } }}
              theme={{ calendarBackground: 'white', todayTextColor: 'white', todayBackgroundColor: 'blue', textSectionTitleColor: 'black', monthTextColor: 'black', arrowColor: 'black' }}
            />
          </View>
        )}
        <Icon1 name={"person-circle-outline"} size={isTablet ? 40 : 30} color={'#65c3cd'} style={isTablet ? Styles.icon1 : phoneStyles.icon1}/>
        <Icon2 name={"logout"} size={isTablet ? 28 : 20} color={'grey'} style={isTablet ? Styles.icon2 : phoneStyles.icon2} onPress={handleLogout} />
        {logoutConfirmationVisible && (
          <View style={isTablet ? Styles.modalContainer : phoneStyles.modalContainer}>
            <View style={isTablet ? Styles.popup : phoneStyles.popup}>
              <Text style={isTablet ? Styles.text : phoneStyles.text}>Are you sure you want to log out?</Text>
              <View style={isTablet ? Styles.buttonContainer : phoneStyles.buttonContainer}>
                <TouchableOpacity style={isTablet ? Styles.button1 : phoneStyles.button1} onPress={cancelLogout}>
                  <Text style={isTablet ? Styles.cancelText : phoneStyles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[isTablet ? Styles.button1 : phoneStyles.button1, { marginLeft: 20 }]} onPress={confirmLogout}>
                  <Text style={isTablet ? Styles.logoutText : phoneStyles.logoutText} yash>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <View style={isTablet ? Styles.flatlistView : phoneStyles.flatlistView}>
          {isPortrait ? <PortraitFlatList /> : <LandscapeFlatList />}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Userdata = (props) => {
  const { item } = props;
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={isTablet ? Styles.box : phoneStyles.box} onPress={() => navigation.navigate('Data', { item: item })}>
      <View>
        <Text style={isTablet ? Styles.itemairline : phoneStyles.itemairline}>{item.data_Airline}</Text>
        <Image source={require('./Images/airlogo1.png')}
          style={isTablet ? Styles.backgroundlogo : phoneStyles.backgroundlogo} />
      </View>
      <View style={isTablet ? Styles.viewflight : phoneStyles.viewflight}>
        <Text style={isTablet ? Styles.item : phoneStyles.item}>Flight #</Text>
        <Text style={isTablet ? Styles.itemflight : phoneStyles.itemflight}>{item.data_Flight}</Text>
        <Icon3 name={"flight-takeoff"} size={isTablet ? 24 : 18} color={'#00a3b0'} style={isTablet ? Styles.icon3 : phoneStyles.icon3} />
      </View>
      <View style={isTablet ? Styles.viewreg : phoneStyles.viewreg}>
        <Text style={isTablet ? Styles.item : phoneStyles.item}>Reg. # </Text>
        <Text style={isTablet ? Styles.itemreg : phoneStyles.itemreg}>{item.data_Reg}</Text>
        <Icon6 name={"text-document-inverted"} size={isTablet ? 24 : 18} color={'#00a3b0'} style={isTablet ? Styles.icon6 : phoneStyles.icon6} />
      </View>
      <View style={isTablet ? Styles.viewbay : phoneStyles.viewbay}>
        <Text style={isTablet ? Styles.viewtext : phoneStyles.viewtext}>Bay # {item.data_Bay}</Text>
      </View>
      <View>
        <Text style={isTablet ? Styles.textdate : phoneStyles.textdate}>Date</Text>
        <Text style={isTablet ? Styles.datetext : phoneStyles.datetext}>{item.data_Date}</Text>
        <Icon4 name={"calendar-days"} size={isTablet ? 24 : 18} color={'#00a3b0'} style={isTablet ? Styles.icon4 : phoneStyles.icon4} />
      </View>
      <View>
        <Text style={isTablet ? Styles.texttime : phoneStyles.texttime}>Time</Text>
        <Text style={isTablet ? Styles.timetext : phoneStyles.timetext}>{item.data_TIME}</Text>
        <Icon5 name={"clock-time-four"} size={isTablet ? 24 : 18} color={'#00a3b0'} style={isTablet ? Styles.icon5 : phoneStyles.icon5} />
      </View>
      <View>
        <Text style={isTablet ? Styles.textsin : phoneStyles.textsin}>SIN</Text>
        <Icon7 name={"airplane-marker"} size={isTablet ? 24 : 18} color={'#00a3b0'} style={isTablet ? Styles.icon7 : phoneStyles.icon7} />
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  logo: {
    position: 'absolute',
    left: 10,
    width: 190,
    height: 82,
  },
  flightText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    top: 90,
  },
  yellowColor: {
    width: 20,
    height: 20,
    backgroundColor: 'yellow',
    top: 100,
    left: 70,
  },
  greenColor: {
    width: 20,
    height: 20,
    backgroundColor: 'green',
    top: 100,
    left: 90,
  },
  blueColor: {
    width: 20,
    height: 20,
    backgroundColor: '#65c3cd',
    top: 100,
    left: 110,
  },
  yellowText: {
    color: 'black',
    fontSize: 20,
    top: 97,
    left: 80,
  },
  greenText: {
    color: 'black',
    fontSize: 20,
    top: 97,
    left: 100,
  },
  blueText: {
    color: 'black',
    fontSize: 20,
    bottom: 10,
    top: 97,
    left: 120,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  search: {
    fontSize: 20,
    borderColor: '#65c3cd',
    borderWidth: 2,
    borderRadius: 10,
    width: 160,
    left: 940,
    top: 35,
    padding: 15,
  },
  icon: {
    left: 1060,
    bottom: 75,
  },
  icon1: {
    left: 1100,
    bottom: 210,
  },
  icon2: {
    left: 1200,
    bottom: 245,
    // flex:1,
  },
  icon3: {
    right: 50,
    bottom: 67,
  },
  icon4: {
    left: 10,
    bottom: 220,
  },
  icon5: {
    left: 260,
    bottom: 300,
  },
  icon6: {
    right: 50,
    bottom: 70,
  },
  icon7: {
    left: 40,
    bottom: 555,
  },
  icon8: {
    left: 1230,
    bottom: 105,
  },
  item: {
    fontSize: 20,
    color: 'black',
    // flex:1,
    margin: 2,
  },
  box: {
    flexDirection: 'column',
    borderWidth: 2,
    margin: 5,
    borderColor: 'grey',
    // marginRight: 10,
    marginLeft: 10,
    borderRadius: 8,
    height: 340,
    width: 410,
    // flex: 1,
  },
  viewbay: {
    alignItems: 'center',
    backgroundColor: '#00a3b0',
    padding: 20,
    borderRadius: 15,
    height: 80,
    width: 90,
    margin: 10,
    left: 290,
    bottom: 330,
  },
  viewtext: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 17,
  },
  viewreg: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    height: 110,
    width: 150,
    borderRadius: 15,
    margin: 10,
    left: 230,
    bottom: 80,
  },
  itemreg: {
    fontSize: 25,
    color: 'black',
    margin: 3,
    fontWeight: 'bold',
  },
  viewflight: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    height: 110,
    width: 150,
    borderRadius: 15,
    margin: 10,
    left: 0,
    top: 47,
  },
  itemflight: {
    fontSize: 25,
    color: 'black',
    margin: 3,
    fontWeight: 'bold',
  },
  itemairline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    left: 45,
    top: 35,
  },
  backgroundlogo: {
    height: 40,
    width: 30,
    top: 10,
    margin: 4,
  },
  datetext: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    bottom: 170,
    left: 40,
  },
  textdate: {
    fontSize: 20,
    color: 'black',
    bottom: 170,
    left: 40,
  },
  texttime: {
    fontSize: 20,
    color: 'black',
    bottom: 250,
    left: 290,
  },
  timetext: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    bottom: 250,
    left: 290,
  },
  textsin: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    bottom: 530,
    left: 70,
  },
  calender: {
    fontSize: 20,
    borderColor: '#65c3cd',
    borderWidth: 2,
    borderRadius: 10,
    width: 160,
    left: 1110,
    bottom: 28,
    padding: 15,
  },
  calendarOpen: {
    position: 'absolute',
    width: 500,
    height: 500,
    left: 400,
    top: 190,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 250,
    left: 350,
    position: 'absolute',
    zIndex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: 600,
    padding: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
  },
  text: {
    fontSize: 25,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button1: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#00a3b0',
  },
  cancelText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  logoutText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  flatlistView: {
    bottom: 150,
    paddingBottom: 150,
  }
});

const phoneStyles = StyleSheet.create({
  logo: {
    position: 'absolute',
    left: 10,
    width: 117,
    height: 50,
  },
  flightText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    top: 60,
    left: 15,
  },
  yellowColor: {
    width: 10,
    height: 10,
    backgroundColor: 'yellow',
    top: 68,
    left: 70,
  },
  greenColor: {
    width: 10,
    height: 10,
    backgroundColor: 'green',
    top: 70,
    left: 90,
  },
  blueColor: {
    width: 10,
    height: 10,
    backgroundColor: '#65c3cd',
    top: 70,
    left: 110,
  },
  yellowText: {
    color: 'black',
    fontSize: 10,
    top: 67,
    left: 80,
  },
  greenText: {
    color: 'black',
    fontSize: 10,
    top: 67,
    left: 100,
  },
  blueText: {
    color: 'black',
    fontSize: 10,
    top: 67,
    left: 120,
  },
  search: {
    fontSize: 15,
    borderColor: '#65c3cd',
    borderWidth: 2,
    borderRadius: 10,
    width: 130,
    left: 540,
    top: 30,
    padding: 5,
  },
  calender: {
    fontSize: 15,
    borderColor: '#65c3cd',
    borderWidth: 2,
    borderRadius: 10,
    width: 130,
    left: 685,
    bottom: 13,
    padding: 5,
  },
  calendarOpen: {
    position: 'absolute',
    width: '30%',
    height: '5%',
    left: 200,
    top: 20,
    zIndex: 1,
  },
  icon: {
    left: 635,
    bottom: 48,
  },
  icon1: {
    left: 720,
    bottom: 150,
  },
  icon2: {
    left: 780,
    bottom: 175,
  },
  icon3: {
    right: 40,
    bottom: 49,
    marginLeft: 5,
  },
  icon4: {
    left: 20,
    bottom: 200,
  },
  icon5: {
    left: 140,
    bottom: 260,
  },
  icon6: {
    right: 40,
    bottom: 50,
    marginLeft: 15,
  },
  icon7: {
    left: 32,
    bottom: 440,
  },
  icon8: {
    left: 780,
    bottom: 75,
  },
  box: {
    flexDirection: 'column',
    borderWidth: 2,
    margin: 5,
    borderColor: 'grey',
    // marginRight: 10,
    marginLeft: 10,
    borderRadius: 8,
    height: 230,
    width: 260,
  },
  flatlistView: {
    bottom: 110,
    paddingBottom: 100,
    // flexDirection:'row',
  },
  itemairline: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    left: 30,
    top: 15,
  },
  backgroundlogo: {
    height: 30,
    width: 20,
    bottom: 10,
    margin: 5,
  },
  textsin: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    bottom: 420,
    left: 52,
  },
  viewbay: {
    alignItems: 'center',
    backgroundColor: '#00a3b0',
    padding: 10,
    borderRadius: 15,
    height: 50,
    width: 60,
    margin: 10,
    left: 180,
    bottom: 260,
  },
  viewtext: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 10,
  },
  viewflight: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    height: 80,
    width: 110,
    borderRadius: 15,
    margin: 10,
  },
  viewreg: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    height: 80,
    width: 110,
    borderRadius: 15,
    margin: 10,
    left: 125,
    bottom: 100,
  },
  item: {
    fontSize: 15,
    color: 'black',
    margin: 2,
  },
  itemflight: {
    fontSize: 15,
    color: 'black',
    margin: 3,
    fontWeight: 'bold',
  },
  itemreg: {
    fontSize: 15,
    color: 'black',
    margin: 3,
    fontWeight: 'bold',
  },
  datetext: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    bottom: 160,
    left: 40,
  },
  textdate: {
    fontSize: 15,
    color: 'black',
    bottom: 160,
    left: 40,
  },
  texttime: {
    fontSize: 15,
    color: 'black',
    bottom: 220,
    left: 160,
  },
  timetext: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    bottom: 220,
    left: 160,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    left: 180,
    position: 'absolute',
    zIndex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: 400,
    padding: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
  },
  text: {
    fontSize: 15,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button1: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#00a3b0',
  },
  cancelText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  logoutText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
})