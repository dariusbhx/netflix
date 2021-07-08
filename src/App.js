import React,{useEffect} from 'react';
import './App.css';
import HomeScreen from './screens/home/HomeScreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import {Switch,Link,BrowserRouter as Router,Route} from 'react-router-dom'
import LoginScreen from './screens/LoginScreen/LoginScreen';
import { auth } from './firebase';
import {useDispatch,useSelector} from 'react-redux'
import {login, logout, selectUser} from './features/userSlice'
function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        //Loggedin
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      }else{
        dispatch(logout())
      }
    })
    return unsubscribe
  },[dispatch])
  return (
    <div className ="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ):(
          <Switch>
            <Route path ="/profile">
              <ProfileScreen />
            </Route>
            <Route path ="/">
              <HomeScreen  />
            </Route>
          </Switch>
        )}
      </Router>
     </div>
  );
}

export default App;
