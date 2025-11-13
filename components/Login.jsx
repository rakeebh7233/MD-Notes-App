'use client'

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const [resetMessage, setResetMessage] = useState("")
    const [isResetting, setIsResetting] = useState(false)

    const { login, signup, resetPassword } = useAuth()
    const router = useRouter()

    const cantAuth = !email.includes('@') || password.length < 6

    async function handleAuthUser() {
        setIsAuthenticating(true)
        try {
            if (isRegister) {
                await signup(email, password)
            } else {
                await login(email, password)
            }
            router.push('/notes')
        } catch (err) {
            console.log(err)
        } finally {
            setIsAuthenticating(false)
        }
    }

    async function handleResetPassword() {
        setIsAuthenticating(true)
        setIsResetting(true)
        try {
            await resetPassword(email)
            setResetMessage("Email has been sent! (Check Spam)")
        } catch (err) {
            console.log(err)
            setResetMessage("Failed to send reset email. Please try again!")
            setIsResetting(false)
        } finally {
            setIsAuthenticating(false)
        }
    }

    return (
        <>
            <div className="login-container">
                <h1 className="text-gradient">MDNOTES</h1>
                <h2>Organized note taking made easy</h2>
                <p>Build your very own archive of easily navigated and indexed information and notes</p>
                <div className="full-line"></div>
                {showForgotPassword ?
                    <>
                        <h6>Reset Password</h6>
                        <div>
                            <p>Email</p>
                            <input 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="text" 
                                placeholder="Enter your email address"
                            />
                        </div>
                        {resetMessage && <h6>{resetMessage}</h6>}
                        <button 
                            onClick={handleResetPassword} 
                            disabled={isAuthenticating || !email.includes('@') || isResetting} 
                            className="submit-btn">
                            <h6>{isAuthenticating ? 'Sending...' : 'Send Reset Email'}</h6>
                        </button>
                        <div className="">
                            <button onClick={() => { setShowForgotPassword(false); setIsResetting(false) }} className="submit-btn">
                                <small>Back to Login</small>
                            </button>
                        </div>
                    </> :
                    <>
                        <h6>{isRegister ? "Create an account" : "Log in"}</h6>
                        <div>
                            <p>Email</p>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter your email address" />
                        </div>
                        <div>
                            <p>Password</p>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" />
                        </div>
                        <button onClick={handleAuthUser} disabled={cantAuth || isAuthenticating} className="submit-btn">
                            <h6>{isAuthenticating ? 'Submitting...' : 'Submit'}</h6>
                        </button>
                        <div className="secondary-btns-container">
                            <button onClick={() => { setIsRegister(!isRegister) }} className="card-button-secondary">
                                <small>{isRegister ? "Log in" : "Sign Up"}</small>
                            </button>
                            <button onClick={() => setShowForgotPassword(true)} className="card-button-secondary">
                                <small>Forgot Password?</small>
                            </button>
                        </div>
                    </>
                }
                <div className="full-line"></div>
                <footer>
                    <a target="_blank" href="https://github.com/rakeebh7233/MD-Notes-App">
                        <img src="https://avatars.githubusercontent.com/u/67334348?v=4" alt="pfp" />
                        <h6>@rakeebh7233</h6>
                        <i className="fa-brands fa-github"></i>
                    </a>
                </footer>
            </div>
        </>
    )
}