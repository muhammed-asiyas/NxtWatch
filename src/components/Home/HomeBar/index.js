import {Link, withRouter} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../../../context/ThemeContext'
import './index.css'

const HomeBar = props => {
  const {videos} = props
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    name,
    profileImageUrl,
  } = videos
  let postedAt = formatDistanceToNow(new Date(publishedAt))
  const postedAtList = postedAt.split(' ')

  if (postedAtList.length === 3) {
    postedAtList.shift()
    postedAt = postedAtList.join(' ')
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const fontText = isDark ? 'light-font' : 'dark-font'
        const otherFontText = isDark ? 'light-other-font' : 'dark-other-font'
        return (
          <li className="video-list">
            <Link className="video-link" to={`/videos/${id}`}>
              <img
                className="video-thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <ul className="item-separate-container">
                <div>
                  <img
                    className="profile-image"
                    src={profileImageUrl}
                    alt="channel logo"
                  />
                </div>
                <li className="home-title-name-container-lg">
                  <p className={`title ${fontText}`}>{title}</p>
                  <p className={`home-other-texts ${otherFontText}`}>{name}</p>
                  <li className="count-and-date-container">
                    <p className={`home-other-texts ${otherFontText}`}>
                      {viewCount} views
                    </p>
                    <p className={`home-dot-texts ${otherFontText}`}>.</p>
                    <p className={`home-other-texts ${otherFontText}`}>
                      {postedAt} ago
                    </p>
                  </li>
                </li>

                <li className="home-title-name-container-sm">
                  <p className={`title ${fontText}`}>{title}</p>
                  <li className="count-and-date-container">
                    <p className={`home-other-texts ${otherFontText}`}>
                      {name}
                    </p>
                    <p className={`home-dot-texts ${otherFontText}`}>.</p>
                    <p className={`home-other-texts ${otherFontText}`}>
                      {viewCount} views
                    </p>
                    <p className={`home-dot-texts ${otherFontText}`}>.</p>
                    <p className={`home-other-texts ${otherFontText}`}>
                      {formatDistanceToNow(new Date(publishedAt))} ago
                    </p>
                  </li>
                </li>
              </ul>
            </Link>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(HomeBar)
