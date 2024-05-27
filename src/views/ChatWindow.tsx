// @refresh reset
import "react-native-get-random-values"
import { nanoid } from 'nanoid';
import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import ChatHeader from '../components/ChatHeader'
import { AuthContext } from '../context/AuthsContext'
import { collection, doc, setDoc } from "@firebase/firestore"
import { dbInstance } from "../utils/Firebase"

const randomId = nanoid()

export default function ChatWindow({navigation}) {
    const {currentUser, currentContact, room} = useContext(AuthContext)
    const selectImage = currentContact.image
    const userB = currentContact

    const senderUser =currentUser.photoURL 
    ?{
        name: currentUser.userName,
         _id:currentUser.uid,
         avatar: currentUser.photoURL
        }: 
    {name: currentUser.userName,_id:currentUser.uid};

    const roomId = room? room.id: randomId

    const roomRef = doc(dbInstance, "rooms" ,roomId)
    const roomMessagesRef = collection(dbInstance,"rooms",roomId,"messages")
    console.log("this user B",userB)
    console.log("current user",currentUser)

    useEffect(() => {
        (async () => {
          if (!room) {
            const currUserData = {
              displayName: currentUser.username,
              email: currentUser.email,
              photoURL:currentUser.photoURL
            };
            if (currentUser.photoURL) {
              currUserData.photoURL = currentUser.photoURL;
            }
            const userBData = {
              displayName: userB.contactName || userB.displayName || "",
              email: userB.email,
              photoURL:userB.photoURL
            };
            if (userB.photoURL) {
              userBData.photoURL = userB.photoURL;
            }
            const roomData = {
              participants: [currUserData, userBData],
              participantsArray: [currentUser.email, userB.email],
            };
            try {
            console.log(roomRef)
            console.log(roomData)
              await setDoc(roomRef, roomData);
            } catch (error) {
              console.log(error);
            }
          }
        })()
    },[])

  return (
    <View>
        <ChatHeader navigation={navigation} />
      
    </View>
  )
}