import React,{useState} from 'react'
import SignUpScreen from '../SignUpScreen/SignUpScreen'
import './LoginScreen.css'


const LoginScreen = () => {

    const [signIn,setSignIn] = useState(false)


    return (
        <div className ="loginScreen">
            <div className="loginScreen_background">
                <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" className = "loginScreen__logo"/>
                <button className="loginScreen__button" onClick ={() => setSignIn(true)}>Sign in</button>
            </div>
            <div className="loginScreen__gradient"></div>
            <div className="loginScreen__body">
                {signIn ? (
                    <SignUpScreen />):(
                        <>
                            <h1>Unlimited films, TV programmes and more</h1>
                            <h2>Watch Anywhere. Cancel at any time.</h2>
                            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
        
                            <div className="loginScreen__input">
                                <form action="">
                                    <input type="email" placeholder ="Email Address" />
                                    <button className ="loginScreen__getStarted" onClick ={() => setSignIn(true)}>
                                        GET STARTED
                                    </button>
                                </form>
                            </div>
                        </>
                )}
            </div>
        </div>
    )
}

export default LoginScreen
