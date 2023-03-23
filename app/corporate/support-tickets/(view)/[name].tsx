// import React, { useLayoutEffect, useState } from "react";

// import { Text, Input, Toggle, Button, Spinner, Select, SelectItem, IndexPath, Layout, useTheme, Icon } from '@ui-kitten/components'
// import { MotiView, ScrollView, Image } from 'moti'
// import { StyleSheet, ImageBackground, TextInput, FlatList, Pressable } from "react-native"
// import { get_SupportTicket, updateSupportTicket } from './apis'
// import { SolitoImage } from 'solito/image'
// // import ImagePicker,{launchImageLibrary} from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker'
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import MessageComponent from "./message-component";

// export function Modal({ route, navigation }) {

//   const theme = useTheme();
//   const generateID = () => Math.random().toString(36).substring(2, 10);
//   const [chatMessages, setChatMessages] = useState([
//     {
//       id: "1",
//       text: "Hello guys, welcome!",
//       time: "07:50 am",
//       user: "Tomer",
//     },
//   ]);
//   // const [chatMessages, setChatMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [user, setUser] = useState("");

//   //👇🏻 Access the chatroom's name and id
//   const { name, id } = route.params;

//   //👇🏻 This function gets the username saved on AsyncStorage
//   const getUsername = async () => {
//     try {
//       const value = await AsyncStorage.getItem("username");
//       if (value !== null) {
//         setUser(value);
//       }
//     } catch (e) {
//       console.error("Error while loading username!");
//     }
//   };

//   // Sets the header title to the name chatroom's name
//   useLayoutEffect(() => {
//     navigation.setOptions({ title: name });
//     getUsername()
//   }, []);

//   /*
//       This function gets the time the user sends a message, then 
//       logs the username, message, and the timestamp to the console.
//    */
//   const handleNewMessage = (data) => {
//     const hour =
//       new Date().getHours() < 10
//         ? `0${new Date().getHours()}`
//         : `${new Date().getHours()}`;

//     const mins =
//       new Date().getMinutes() < 10
//         ? `0${new Date().getMinutes()}`
//         : `${new Date().getMinutes()}`;

//     console.log({
//       message,
//       user,
//       timestamp: { hour, mins },
//     });
//     setChatMessages([...chatMessages, data]);
//   };

//   return (
//     <Layout style={{ flex: 1 }}>
//       <MotiView style={styles.messagingscreen}>
//         <MotiView
//           style={[
//             styles.messagingscreen,
//             { paddingVertical: 15, paddingHorizontal: 10 },
//           ]}
//         >
//           {chatMessages[0] ? (
//             <FlatList
//               data={chatMessages}
//               renderItem={({ item }) => (
//                 <MessageComponent item={item} user={user} />
//               )}
//               keyExtractor={(item) => item.id}
//             />
//           ) : (
//             ""
//           )}
//         </MotiView>

//         <MotiView style={{
//           width: "100%",
//           minHeight: 100,
//           paddingVertical: 30,
//           paddingHorizontal: 15,
//           justifyContent: "center",
//           flexDirection: "row", backgroundColor: theme['color-basic-100']
//         }}>
//           <TextInput
//             style={{borderWidth: 1,
//               padding: 15,
//               flex: 1,
//               marginRight: 10,
//               borderRadius: 20,}}
//             onChangeText={(value) => setMessage(value)}
//           />
//           <Pressable
//             style={{width: "30%",
//             backgroundColor: theme['color-success-600'],
//             borderRadius: 12,
//             alignItems: "center",
//             justifyContent: "center",}}
//             onPress={handleNewMessage}
//           >
//             <MotiView>
//               <Text style={{ color: theme['color-basic-100'] }}
//                 category='s1'>SEND</Text>
//             </MotiView>
//           </Pressable>
//         </MotiView>
//       </MotiView>

//     </Layout>
//   )
// }

// const styles = StyleSheet.create({
//   chatscreen: {
//     // backgroundColor: "#F7F7F7",
//     flex: 1,
//     padding: 10,
//     position: "relative",
//   },
//   chatheading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     // color: "green",
//   },
//   chattopContainer: {
//     // backgroundColor: "#F7F7F7",
//     height: 70,
//     width: "100%",
//     padding: 20,
//     justifyContent: "center",
//     marginBottom: 15,
//     elevation: 2,
//   },
//   chatheader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   chatlistContainer: {
//     paddingHorizontal: 10,
//   },
//   chatemptyContainer: {
//     width: "100%",
//     height: "80%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   chatemptyText: { fontWeight: "bold", fontSize: 24, paddingBottom: 30 },
//   messagingscreen: {
//     flex: 1,
//   },
// //   messaginginputContainer, backgroundColor: theme['color-danger-100']: {
// //   width: "100%",
// //   minHeight: 100,

// //   paddingVertical: 30,
// //   paddingHorizontal: 15,
// //   justifyContent: "center",
// //   flexDirection: "row",
// // },
// //   messaginginput: {
// //   borderWidth: 1,
// //   padding: 15,
// //   flex: 1,
// //   marginRight: 10,
// //   borderRadius: 20,
// // },
// //   messagingbuttonContainer: {
// //   width: "30%",
// //   backgroundColor: "green",
// //   borderRadius: 12,
// //   alignItems: "center",
// //   justifyContent: "center",
// //   // borderRadius: '50',
// // },
//   modalbutton: {
//   width: "40%",
//   height: 45,
//   backgroundColor: "green",
//   borderRadius: 5,
//   alignItems: "center",
//   justifyContent: "center",
//   color: "#fff",
// },
//   modalbuttonContainer: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   marginTop: 10,
// },
//   modaltext: {
//   color: "#fff",
// },
//   modalContainer: {
//   width: "100%",
//   borderTopColor: "#ddd",
//   borderTopWidth: 1,
//   elevation: 1,
//   height: 400,
//   backgroundColor: "#fff",
//   position: "absolute",
//   bottom: 0,
//   zIndex: 10,
//   paddingVertical: 50,
//   paddingHorizontal: 20,
// },
//   modalinput: {
//   borderWidth: 2,
//   padding: 15,
// },
//   modalsubheading: {
//   fontSize: 20,
//   fontWeight: "bold",
//   marginBottom: 15,
//   textAlign: "center",
// },
//   cchat: {
//   width: "100%",
//   flexDirection: "row",
//   alignItems: "center",
//   borderRadius: 5,
//   paddingHorizontal: 15,
//   backgroundColor: "#fff",
//   height: 80,
//   marginBottom: 10,
// },
//   cavatar: {
//   marginRight: 15,
// },
//   cusername: {
//   fontSize: 18,
//   marginBottom: 5,
//   fontWeight: "bold",
// },
//   cmessage: {
//   fontSize: 14,
//   opacity: 0.7,
// },
//   crightContainer: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   flex: 1,
// },
//   ctime: {
//   opacity: 0.5,
// },
// });

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, Input, Toggle, Button, Spinner, Select, SelectItem, IndexPath, Layout, useTheme, Icon, Popover } from '@ui-kitten/components'
import { MotiView, ScrollView, } from 'moti'
import { faker } from '@faker-js/faker';

export default function page({ route, navigation }) {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [time, setTime] = useState('');
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonText, setButtonText] = useState('Ticket is open');
  // const [buttonState, setButtonColor] = useState(theme['color-primary-400']);

  // const ticketStatus = () => {
  //   setButtonText('Ticket is closed');
  //   setButtonColor(theme['color-success-600'],);
  // };
  const [buttonState, setButtonState] = useState({
    text: 'Ticket is open',
    color: theme['color-warning-500'],
  });
  const ticketStatus = () => {
    setButtonState((prevState) => {
      if (prevState.text === 'Ticket is open') {
        return {
          text: 'Ticket is closed',
          color: theme['color-success-600'],
        };
      } else {
        return {
          text: 'Ticket is open',
          color: theme['color-warning-500'],
        };
      }
    });
  };

  const bookingDetails = () => {
    setModalVisible(true);
  };

  const onClose = () => {
    setModalVisible(false);
  };

  const handleNewTask = () => {
    if (newTask !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const amOrPm = hours < 12 ? 'am' : 'pm';
      const formattedHours = hours % 12 === 0 ? '12' : hours % 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setTime(`${formattedHours}:${formattedMinutes} ${amOrPm}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (

    <Layout style={styles.container}>


      <MotiView style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }}>
        <TouchableOpacity>
          <Button
            size='small'
            onPress={bookingDetails}
            style={{ backgroundColor: theme['color-primary-400'], borderRadius: 12, marginLeft: 16 }}>
            <Text style={{ color: 'white', padding: 8 }}>View booking details..</Text>
          </Button>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          visible={modalVisible}
          transparent={true}
          onRequestClose={onClose}>
          <MotiView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <MotiView style={{ backgroundColor: 'white', padding: 16, borderRadius: 12 }}>
              {/* <li> */}
              <Text category='h6' style={{ marginBottom: 8 }}>Booking details</Text>
              <MotiView style={{ flexDirection: 'row' }}>
                <Text category='s1' style={{ marginBottom: 8 }}>Customer name: </Text>
                <Text category='p1'>Jesse Franey </Text>
              </MotiView>

              <MotiView style={{ flexDirection: 'row' }}>
                <Text category='s1' style={{ marginBottom: 8 }}>Requirement: </Text>
                <Text category='p1'>Daycare service </Text></MotiView>

              <MotiView style={{ flexDirection: 'row' }}>
                <Text category='s1' style={{ marginBottom: 8 }}>Booking ID: </Text>
                <Text category='p1' style={{color:theme['color-warning-600']}}>12385 </Text>
              </MotiView>

              <MotiView style={{ flexDirection: 'row' }}>
                <Text category='s1' style={{ marginBottom: 8 }}>Date: </Text>
                <Text category='p1'>28-March-2023 </Text>
              </MotiView>

              <MotiView style={{ flexDirection: 'row' }}>
                <Text category='s1' style={{ marginBottom: 8 }}>Service provider name: </Text>
                <Text category='p1'>Elders Welth </Text></MotiView>

              <MotiView style={{ flexDirection: 'row' }}>
                <Text category='s1' style={{ marginBottom: 8 }}>Service status: </Text>
                <Text category='p1' style={{color:theme['color-danger-600']}}>pending </Text></MotiView>

              <MotiView style={{ flexDirection: 'row' }}>
                <Text category='s1' style={{ marginBottom: 8 }}>Payment status: </Text>
                <Text category='p1' style={{color:theme['color-danger-600']}}>pending </Text></MotiView>

              <MotiView style={{ flexDirection: 'row' }}>
                <Text category='s1' style={{ marginBottom: 8 }}>Payment mode: </Text>
                <Text category='p1'>upi </Text>
              </MotiView>
              <MotiView style={{ flexDirection: 'row' }}>
                <Text category='s1' style={{ marginBottom: 8 }}>location/Address: </Text>
                <Text category='p1'>Bangalore </Text></MotiView>

              <MotiView style={{ flexDirection: 'row' }}>
                <Text category='s1' style={{ marginBottom: 8 }}>Quantity: </Text>
                <Text category='p1' style={{color:theme['color-primary-600']}}>2 </Text>
              </MotiView>
              <MotiView style={{ flexDirection: 'row' }}>
                <Text category='s1' style={{ marginBottom: 8 }}>Price: </Text>
                <Text category='p1' style={{color:theme['color-primary-600']}}>800 </Text>
              </MotiView>
              <MotiView style={{ flexDirection: 'row' }}>
                <Text category='s1' style={{ marginBottom: 8 }}>Amount: </Text>
                <Text category='p1' style={{color:theme['color-success-600']}}>1600 </Text>
              </MotiView>
              <MotiView style={{ flexDirection: 'row' }}>
                <Text category='s1' style={{ marginBottom: 8 }}>Is promocode applied: </Text>
                <Text category='p1'>No </Text></MotiView>

              <MotiView style={{ flexDirection: 'row' }}>
                <Text category='s1' style={{ marginBottom: 8 }}>Is wallet used: </Text>
                <Text category='p1'>No </Text>
                {/* </li> */}</MotiView>
              <TouchableOpacity onPress={onClose} style={{ marginTop: 16 }}>
                <Text style={{ color: 'blue' }}>Close</Text>
              </TouchableOpacity>
            </MotiView>
          </MotiView>
        </Modal>


        {/* <Button size='small'
          style={{ backgroundColor: theme['color-primary-400'], borderRadius: 12, marginRight: 16 }}>Ticket is open</Button> */}

        <TouchableOpacity>
          <Button
            size='small'
            onPress={ticketStatus}
            style={{ backgroundColor: buttonState.color, borderRadius: 12, marginRight: 16 }}>
            <Text style={{ color: 'white', padding: 8 }}>{buttonState.text}</Text>
          </Button>
        </TouchableOpacity>
      </MotiView>

      <MotiView style={styles.content}>

        <MotiView style={styles.messageList}>

          <ScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>

            <MotiView style={{ alignSelf: 'flex-start' }}>
              <Text category='s1' style={{ alignSelf: 'flex-start', marginLeft: 8, marginBottom: 4, marginTop: 4 }}>Ticket id</Text>
              <MotiView style={{ backgroundColor: theme['color-info-transparent-200'], borderRadius: 12, marginBottom: 8, alignSelf: 'flex-start', padding: 8 }}>
                <Text >985b1411</Text>
              </MotiView>
            </MotiView>

            <MotiView style={{ alignSelf: 'flex-start' }}>
              <Text category='s1' style={{ alignSelf: 'flex-start', marginLeft: 8, marginBottom: 4 }}>Description</Text>
              <MotiView style={{ backgroundColor: theme['color-info-transparent-200'], borderRadius: 12, marginBottom: 8, alignSelf: 'flex-start', padding: 8 }}>
                <Text>"Hello, I recently booked daycare service for one day and attempted to make payment, but unfortunately, the payment did not go through. Could you please assist me in resolving this issue so that I can complete the payment and confirm the booking? Thank you."</Text>
              </MotiView>
            </MotiView>

            <MotiView style={{ alignSelf: 'flex-start' }}>
              <Text category='s1' style={{ alignSelf: 'flex-start', marginLeft: 8, marginBottom: 4 }}>Please find my attachments</Text>
              <MotiView style={{ backgroundColor: theme['color-info-transparent-200'], borderRadius: 12, marginBottom: 8, alignSelf: 'flex-start', padding: 8 }}>
                <Image
                  source={{uri: "https://cdn.pixabay.com/photo/2013/07/13/01/18/pdf-155498_1280.png", width: 100, height: 100 }}
                  // src={`${item.logo}`}
                  alt="A cool artist's image."
                  style={{ borderRadius: 12}}
                />
              </MotiView>
            </MotiView>
            {/* <MotiView style={{ alignSelf: 'flex-start' }}>
              <Text category='s1' style={{ alignSelf: 'flex-start', marginLeft: 8, marginBottom: 4 }}>Booking details</Text>
              <MotiView style={{ backgroundColor: theme['color-info-transparent-200'], borderRadius: 12, marginBottom: 8, alignSelf: 'flex-start', padding: 8 }}>
                <Text>Booking id:</Text>
                <Text>Service name:</Text>
                <Text>:</Text>
              </MotiView>
            </MotiView> */}

            <MotiView>
              {/* <Text category="c2" 
              style={{marginLeft:4, marginTop:8}}
              >EldersIndia</Text> */}
              <MotiView style={{ backgroundColor: theme['color-danger-200'], borderRadius: 12, marginBottom: 4, alignSelf: 'flex-end', padding: 8 }}>
                <Text category="c1"
                // style={{marginLeft:4,}}
                >EldersIndia</Text>
                <Text
                  style={{ marginTop: 4 }
                  } category="s1" >
                  Hello
                </Text>
                {/* <Text
                  style={{ alignSelf: 'flex-start', marginTop: 2 }}
                  category="c1">{time}</Text> */}

              </MotiView>
              <Text
                style={{ marginLeft: 4 }}
                category="c1">Thu,{time}</Text>
            </MotiView>

            <MotiView>
              <MotiView style={{ backgroundColor: theme['color-info-transparent-200'], borderRadius: 12, marginBottom: 4, alignSelf: 'flex-start', padding: 8 }}>
                <Text category="c1"
                  style={{ marginRight: 4, marginTop: 0, alignSelf: 'flex-start' }}
                >Customer</Text>
                <Text
                  style={{ margin: 8 }
                  } category="s1" >
                  Hello
                </Text>

              </MotiView>
              <Text
                style={{ alignSelf: 'flex-start', marginRight: 4 }}
                category="c1">Thu,{time}</Text>
            </MotiView>

            {tasks.map((task, index) => (
              <MotiView style={{ marginTop: 8 }}>
                {/* <Text category="c2"
                  style={{ marginLeft: 4, marginTop: 8 }}
                // style={[
                //   index % 2 === 0 ? styles.messageContentLeft : styles.messageContentRight,
                // ]}
                >EldersIndia</Text> */}
                <MotiView style={{ backgroundColor: theme['color-danger-200'], borderRadius: 12, marginBottom: 4, alignSelf: 'flex-end', padding: 8 }}>
                  <Text category="c1"
                    style={{ marginLeft: 4, marginTop: 0 }}
                  >EldersIndia</Text>
                  <Text
                    key={index}
                    style={{ margin: 8 }
                      //   [
                      //   styles.message,
                      //   // { backgroundColor: theme['color-info-transparent-200'] },
                      //   index % 2 === 0 ? styles.messageLeft : styles.messageRight,
                      // ]
                    } category="s1" >
                    {task}
                  </Text>

                </MotiView>
                <Text
                  style={{ marginLeft: 4 }}
                  category="c1">Thus,{time}</Text>
              </MotiView>
            ))}
          </ScrollView>
        </MotiView>

        <MotiView style={{ flexDirection: 'row', marginBottom: 8 }}>
          <MotiView style={styles.messageInputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="typing....."
              value={newTask}
              onChangeText={(text) => setNewTask(text)}
              onSubmitEditing={handleNewTask}
            />
          </MotiView>
          <Button size='small'
            style={{ backgroundColor: theme['color-primary-400'], borderRadius: 12, marginLeft: 8 }}>Send</Button>
        </MotiView>
      </MotiView>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // color:'black',
  },
  header: {
    padding: 16,
    backgroundColor: '#0099ff',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  messageList: {
    flex: 1,
  },
  message: {
    padding: 8,
    marginVertical: 4,
    borderRadius: 20,
    // maxWidth: '100%',
  },
  messageLeft: {
    backgroundColor: '#e6e6e6',
    alignSelf: 'flex-start',
    borderRadius: 20,
  },
  messageRight: {
    backgroundColor: '#0099ff',
    alignSelf: 'flex-end',
    color: '#fff',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 8,
    borderRadius: 16,
    width: "80%"
    // position: 'absolute',
    // bottom:30,
  },
  messageInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  messageContentLeft: {
    // backgroundColor: '#e6e6e6',
    alignSelf: 'flex-start',
    borderRadius: 20,
  },
  messageContentRight: {
    // backgroundColor: '#0099ff',
    alignSelf: 'flex-end',
    // color: '#fff',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popovercontent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
});


