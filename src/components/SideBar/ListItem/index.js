import {Link} from 'react-router-dom'
import ThemeContext from '../../../context/ThemeContext'
import './index.css'

const ListItem = props => {
  const {listItem, isActiveSideBar} = props
  const {id, name, logo, link} = listItem
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark, updateActiveSideBar} = value
        const changeSideBar = () => {
          updateActiveSideBar(id)
        }

        const activeClass = isDark ? 'light-font-color' : 'dark-font-color'
        const ActiveSideBar = isDark ? 'light-active' : 'dark-active'
        const activeSideBarClassName = isActiveSideBar ? ActiveSideBar : ''
        const ActiveSideBarLogo = isActiveSideBar ? 'side-bar-logo-color' : ''
        return (
          <Link className="link-sidebar" to={link}>
            <li
              className={`side-bar-item ${activeSideBarClassName} ${activeClass}`}
              onClick={changeSideBar}
            >
              <div className={`side-bar-logo ${ActiveSideBarLogo}`}>{logo}</div>
              <p className="side-bar-item-fonts">{name}</p>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default ListItem