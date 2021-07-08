import React,{useRef} from 'react'
import { auth } from '../../firebase'
import './SignUpScreen.css'
const SignUpScreen = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const register = (e) => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) =>{
            console.log(authUser)
        }).catch(error => {
            alert(error.message)
        })
    }

    const signIn = (e) => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((user) => {
            console.log(user)
        })
        .catch(error => console.log(error.message))
    }
    return (
        <div class ="signupScreen">
            <form action="">
                <h1>Sign In</h1>
                <input type="email" placeholder ="Email" ref ={emailRef}/>
                <input type="password" placeholder ="Password" ref ={passwordRef}/>
                <button type ="submit" onClick ={signIn}>Sign In</button>
                <h4><span className ="signupScreen__gray">New  to Netflix?</span> <span className="signupScreen__link" onClick ={register}>Sign Up Now</span> </h4>
            </form>
        </div>
    )
}

export default SignUpScreen
