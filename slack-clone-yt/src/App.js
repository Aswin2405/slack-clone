import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from 'styled-components';
import Spinner from "react-spinkit"

import './App.css';
import Chat from './Chat';
import { auth } from './firebase';
import Header from './Header';
import Sidebar from './Sidebar';
import {useAuthState} from "react-firebase-hooks/auth"
import Login from './Login';

function App() {
  const[user,loading]=useAuthState(auth)
  if(loading){
    return(
      <AppLoading>
        <AppLoadingContent>
<img src="data:image/png;base64,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"/>
<Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none"/>
        </AppLoadingContent>
      </AppLoading>
    )
  }
  return (
    <div className="app">
      <Router>
        {!user?(
          <Login/>
        ):(
          <>
          <Header/>
          <AppBody>
            <Sidebar/>
          <Switch>
              {/* <Route path="/about">
                <About />
              </Route>
              <Route path="/users">
                <Users />
              </Route> */}
              <Route path="/" exact>
             <Chat/>
              </Route>
            </Switch>
          </AppBody>
            
          </>
        )}
    
    </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
display:flex;
height:100vh;
`
const AppLoading=styled.div`
display:grid;
place-items:center;
height: 100vh;
width:100%;
`
const AppLoadingContent=styled.div`
text-align:center;
padding-bottom:100px ;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
>img{
  height: 100px;
  padding:20px;
  margin-bottom:40px;
}
`