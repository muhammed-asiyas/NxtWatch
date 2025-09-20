import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {BsBrightnessHigh} from 'react-icons/bs'
import {IoMoon} from 'react-icons/io5'
import {HiOutlineMenu} from 'react-icons/hi'
import {FaHome, FaBurn} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddLine} from 'react-icons/ri'
import {AiOutlineClose} from 'react-icons/ai'
import ThemeContext from '../../context/ThemeContext'
import SideBarSmall from './SideBarSmall'
import './index.css'

const sideBarListItem = [
  {id: 1, name: 'Home', logo: <FaHome />, link: '/'},
  {id: 2, name: 'Trending', logo: <FaBurn />, link: '/trending'},
  {id: 3, name: 'Gaming', logo: <SiYoutubegaming />, link: '/gaming'},
  {
    id: 4,
    name: 'Saved videos',
    logo: <RiPlayListAddLine />,
    link: '/saved-videos',
  },
]

const Header = props => {
  const {history} = props
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark, toggleTheme, activeSideBarId} = value
        const onClickHome = () => history.push('/')
        const onChangeTheme = () => {
          toggleTheme()
        }

        const backgroundClass = isDark ? 'dark-background' : 'light-background'
        const popupBackgroundClass = isDark
          ? 'dark-popup-background'
          : 'light-popup-background'
        const LogoutFont = isDark ? 'light-font-log' : 'dark-font-log'
        const nxtWatchlogo = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        const themeIcon = isDark ? <BsBrightnessHigh /> : <IoMoon />

        const buttonClassName = isDark ? 'dark-button' : 'light-button'
        const cancelButton = isDark
          ? 'cancel-button-dark-mode'
          : 'cancel-button-light-mode'

        return (
          <>
            <nav className={`nav-container-lg ${backgroundClass}`}>
              <img
                className="nav-website-logo"
                src={nxtWatchlogo}
                alt="website logo"
                onClick={onClickHome}
              />
              <ul className="unorder-nav-list">
                <button
                  type="button"
                  className={`theme-icon-lg ${LogoutFont}`}
                  data-testid="theme"
                  onClick={onChangeTheme}
                >
                  {themeIcon}
                </button>
                <li className="nav-list-item">
                  <img
                    className="nav-profile-logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />
                </li>

                <Popup
                  modal
                  trigger={
                    <button
                      className={`logout-button ${buttonClassName}`}
                      type="button"
                    >
                      Logout
                    </button>
                  }
                  className="popup-content"
                >
                  {close => (
                    <div className={`modal-container ${popupBackgroundClass}`}>
                      <p className={`logout-description ${LogoutFont}`}>
                        Are you sure, you want to logout?
                      </p>
                      <ul className="logout-button-container">
                        <li className="nav-link-item">
                          <Link
                            className="nav-link"
                            to="/"
                            onClick={() => close()}
                          >
                            <button
                              className={`custom-button ${cancelButton}`}
                              type="button"
                            >
                              Cancel
                            </button>
                          </Link>
                        </li>
                        <li className="nav-link-item">
                          <Link
                            className="nav-link"
                            to="/login"
                            onClick={() => close()}
                          >
                            <button
                              className="confirm-button"
                              type="button"
                              onClick={onLogout}
                            >
                              Confirm
                            </button>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </Popup>
              </ul>
            </nav>
            <nav className={`nav-container-sm ${backgroundClass}`}>
              <img
                className="nav-website-logo-sm"
                src={nxtWatchlogo}
                alt="website logo"
                onClick={onClickHome}
              />
              <ul className="unorder-nav-list">
                <button
                  type="button"
                  className={`theme-icon-sm ${LogoutFont}`}
                  data-testid="theme"
                  onClick={onChangeTheme}
                >
                  {themeIcon}
                </button>
                <Popup
                  modal
                  trigger={
                    <HiOutlineMenu className={`menu-bar-sm ${LogoutFont}`} />
                  }
                >
                  <Link to="/" className="close-sm-menu-bar-container">
                    <button className="close-button-bar" type="button">
                      <AiOutlineClose />
                    </button>
                  </Link>
                  <ul
                    className={`sm-sidebar-list-container ${backgroundClass}`}
                  >
                    {sideBarListItem.map(eachItem => (
                      <SideBarSmall
                        key={eachItem.id}
                        sidebarItem={eachItem}
                        isActiveSideBar={activeSideBarId === eachItem.id}
                      />
                    ))}
                  </ul>
                </Popup>

                <Popup
                  modal
                  trigger={
                    <FiLogOut className={`fi-logout-icon ${LogoutFont}`} />
                  }
                >
                  {close => (
                    <div className={`modal-container ${popupBackgroundClass}`}>
                      <p className={`logout-description ${LogoutFont}`}>
                        Are you sure, you want to logout?
                      </p>
                      <ul className="logout-button-container">
                        <li className="nav-link-item">
                          <Link
                            className="nav-link"
                            to="/"
                            onClick={() => close()}
                          >
                            <button
                              className={`custom-button ${cancelButton}`}
                              type="button"
                            >
                              Cancel
                            </button>
                          </Link>
                        </li>
                        <li className="nav-link-item">
                          <Link
                            className="nav-link"
                            to="/login"
                            onClick={() => close()}
                          >
                            <button
                              className="confirm-button"
                              type="button"
                              onClick={onLogout}
                            >
                              Confirm
                            </button>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </Popup>
              </ul>
            </nav>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(Header)