export default function Login() {
    return (
        <>
            <div className="login-container">
                <h1 className="text-gradient">MDNOTES</h1>
                <h2>Organized note taking made easy</h2>
                <p>Build your very own archive of easily navifated and indexed information and notes</p>
                <div className="full-line"></div>
                <h6>Sign in</h6>
                <div>
                    <p>Email</p>
                    <input type="text" placeholder="Enter your email address" />
                </div>
                <div>
                    <p>Password</p>
                    <input type="password" placeholder="********" />
                </div>
                <button className="submit-btn">
                    <h6>Submit</h6>
                </button>
                <div className="secondary-btns-container">
                    <button className="card-button-secondary">
                        <small>Log in</small>
                    </button>
                    <button className="card-button-secondary">
                        <small>Forgot Password?</small>
                    </button>
                </div>
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