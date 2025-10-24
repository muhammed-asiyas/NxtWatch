import {Component} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {LoginButton} from '../styledComponents/styledComponents'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

class Login extends Component {
  state = {
    userInput: '',
    passwordInput: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const navigate = useNavigate()
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/')
  }

  onSubmitError = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
      showPassword: false,
    })
  }

  getUserLogin = async event => {
    event.preventDefault()
    const {userInput, passwordInput} = this.state
    const apiUrl = ' https://apis.ccbp.in/login'
    const userDetails = {username: userInput, password: passwordInput}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
    }
  }

  onChangeUserInput = event => {
    this.setState({
      userInput: event.target.value,
    })
  }

  onChangePasswordInput = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  showPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  renderUserInputField = () => {
    const {userInput, passwordInput, showPassword} = this.state
    const showPasswordText = showPassword ? 'text' : 'password'
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const labelFontColor = isDark ? 'log-light-label' : 'log-dark-label'
          return (
            <>
              <label className={`label ${labelFontColor}`} htmlFor="user-input">
                Asiyas
              </label>
              <input
                className="input-container"
                type="text"
                placeholder="Username"
                id="user-input"
                value={userInput}
                onChange={this.onChangeUserInput}
              />
              <label className={`label ${labelFontColor}`} htmlFor="password">
                PASSWORD
              </label>
              <input
                className="input-container"
                type={showPasswordText}
                placeholder="Password"
                id="password"
                value={passwordInput}
                onChange={this.onChangePasswordInput}
              />
              <div className="show-password-container">
                <input
                  type="checkbox"
                  id="showpassword"
                  onClick={this.showPassword}
                />
                <label htmlFor="showpassword" className="show-password-label">
                  Show Password
                </label>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Navigate to="/not-found" replace />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const AppBackgroundColor = isDark
            ? 'app-log-dark-background'
            : 'app-log-light-background'
          const logBackgroundColor = isDark
            ? 'log-dark-background'
            : 'log-light-background'
          const nxtWatchLogo = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          return (
            <div className={`app-login-container ${AppBackgroundColor}`}>
              <form
                className={`login-container ${logBackgroundColor}`}
                onSubmit={this.getUserLogin}
              >
                <img
                  className="login-watch-logo"
                  src={nxtWatchLogo}
                  alt="website logo"
                />
                {this.renderUserInputField()}
                <LoginButton>Login</LoginButton>
                {showErrorMsg && <p className="error_msg">{errorMsg}</p>}
              </form>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
