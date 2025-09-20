import {FaHome, FaBurn} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddLine} from 'react-icons/ri'
import ListItem from './ListItem'
import ThemeContext from '../../context/ThemeContext'
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

const SideBar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, activeSideBarId} = value
      const sideBarBackground = isDark ? 'side-bar-dark' : 'side-bar-light'
      const aboutFontColor = isDark ? 'light-font' : 'dark-font'
      return (
        <div className={`side-bar-container ${sideBarBackground}`}>
          <ul className="side-bar-unorder-list">
            {sideBarListItem.map(eachItem => (
              <ListItem
                key={eachItem.id}
                listItem={eachItem}
                isActiveSideBar={activeSideBarId === eachItem.id}
              />
            ))}
          </ul>
          <ul className="side-bar-about-container">
            <p className={`contact-us-head ${aboutFontColor}`}>CONTACT US</p>
            <ul className="about-app-logo-container">
              <img
                className="side-bar-app-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <img
                className="side-bar-app-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <img
                className="side-bar-app-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </ul>
            <p className={`about-description ${aboutFontColor}`}>
              Enjoy! Now to see your channels and recommendations!
            </p>
          </ul>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default SideBar