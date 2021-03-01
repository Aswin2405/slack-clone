import { Button } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import {auth, db} from "./firebase"
import firebase from "firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
function ChatInput({channelName,channelId,chatRef}) {
    const [user]=useAuthState(auth)
    const [input,setInput]=useState("")
    const sendMessage=e=>{
        e.preventDefault()
        if(!channelId){
            return false
        }
        db.collection("rooms").doc(channelId).collection("messages").add({
            message:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            user:user.displayName,
            userImage:user.photoURL,
        })
        chatRef.current.scrollIntoView({
            behavior:"smooth"
        })
        setInput("")
    }
    return (
     <ChatInputContainer>
         <form>
             <input value={input} onChange={e=>setInput(e.target.value)} placeholder={`MESSAGE # ${channelName}`}/>
             <Button hidden type="submit" onClick={sendMessage}>Send</Button>
         </form>
         </ChatInputContainer>
    )
}

export default ChatInput;

const ChatInputContainer  = styled.div`
border-radius:20px;
>form{
    position: relative;
    justify-content:center;
    display:flex;
}
>form>input{
    position:fixed;
    bottom:30px;
    width:60%;
    border-radius:3px;
    border:1px solid gray;
    padding:20px;
    outline:none;
}
>form>button{
    display:none !important;
}
`