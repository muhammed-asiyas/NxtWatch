import ThemeContext from '../../context/ThemeContext'
import './index.css'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value
      const notFoundTheme = isDark
        ? 'not-found-dark-theme'
        : 'not-found-light-theme'
      return (
        <>
          <div className={`notfound-container ${notFoundTheme}`}>
            <img
              className="notfound-image"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
              alt="not found"
            />
            <h1 className="notfound-head">Page Not Found</h1>
            <p className="notfound-description">
              we are sorry, the page you requested could not be found.
            </p>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
