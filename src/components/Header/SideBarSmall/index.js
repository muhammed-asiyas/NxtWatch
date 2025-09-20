import {Link} from 'react-router-dom'
import ThemeContext from '../../../context/ThemeContext'

const SideBarSmall = props => {
  const {sidebarItem, isActiveSideBar} = props
  const {id, name, logo, link} = sidebarItem
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark, updateActiveSideBar} = value
        const onChangeSideBar = () => {
          updateActiveSideBar(id)
        }

        const activeClass = isDark ? 'light-font-color' : 'dark-font-color'
        const ActiveSideBar = isDark ? 'light-active' : 'dark-active'
        const activeSideBarClassName = isActiveSideBar ? ActiveSideBar : ''
        const ActiveSideBarLogo = isActiveSideBar ? 'side-bar-logo-color' : ''
        return (
          <Link
            to={link}
            className={`sm-sidebar-navbar-ist-item ${activeSideBarClassName} ${activeClass}`}
            onClick={onChangeSideBar}
          >
            <div className={`sm-sidebar-icon-logo ${ActiveSideBarLogo}`}>
              {logo}
            </div>
            <h1 className="sm-sidbar-item-head">{name}</h1>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SideBarSmall