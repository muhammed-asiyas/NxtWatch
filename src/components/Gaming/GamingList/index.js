import {Link} from 'react-router-dom'
import ThemeContext from '../../../context/ThemeContext'
import './index.css'

const GamingList = props => {
  const {gameList} = props
  const {id, title, thumbnailUrl, viewCount} = gameList
  const api = `/videos/${id}`
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const fontText = isDark ? 'light-font' : 'dark-font'
        const viewCountColor = isDark
          ? 'game-view-count-light'
          : 'game-view-count-dark'
        return (
          <li className="game-list-item">
            <Link className="game-link" to={api}>
              <img
                className="game-thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <p className={`game-title ${fontText}`}>{title}</p>
              <p className={`game-view-count ${viewCountColor}`}>
                {viewCount} Watching Worldwide
              </p>
            </Link>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default GamingList
