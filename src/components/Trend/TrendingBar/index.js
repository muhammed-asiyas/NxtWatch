import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../../../context/ThemeContext'
import './index.css'

const TrendingBar = props => {
  const {trendVideos} = props
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    name,
    profileImageUrl,
  } = trendVideos
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
        const fontColor = isDark ? 'trend-light-font' : 'trend-dark-font'
        const OtherFontColor = isDark ? 'other-light-font' : 'other-dark-font'
        return (
          <li className="game-list">
            <Link className="link-list-lg" to={`/videos/${id}`}>
              <img
                className="game-thumbnailUrl"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <ul className="game-list-items-lg">
                <p className={`game-title ${fontColor}`}>{title}</p>
                <p className={`game-name ${OtherFontColor}`}>{name}</p>
                <ul className={`game-view-list ${OtherFontColor}`}>
                  <p className={`trend-view-count ${OtherFontColor}`}>
                    {viewCount} views
                  </p>
                  <p className={`game-dot ${OtherFontColor}`}>.</p>
                  <p className={`game-published-date ${OtherFontColor}`}>
                    {postedAt} ago
                  </p>
                </ul>
              </ul>
            </Link>

            <Link className="link-list-sm" to={`/videos/${id}`}>
              <img
                className="game-thumbnail-sm"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <ul className="game-list-items-sm">
                <li>
                  <img
                    className="game-profile-image-url"
                    src={profileImageUrl}
                    alt="game-video-profile"
                  />
                </li>
                <ul className="game-sub-container-sm">
                  <li>
                    <p className={`game-title-sm ${fontColor}`}>{title}</p>
                  </li>

                  <li className={`game-view-list-sm ${OtherFontColor}`}>
                    <p className={`game-name-sm ${OtherFontColor}`}>{name}</p>
                    <p className={`game-dot ${OtherFontColor}`}>.</p>
                    <p className={`trend-view-count-sm ${OtherFontColor}`}>
                      {viewCount} views
                    </p>
                    <p className={`game-dot ${OtherFontColor}`}>.</p>
                    <p className={`game-published-date-sm ${OtherFontColor}`}>
                      {formatDistanceToNow(new Date(publishedAt))} ago
                    </p>
                  </li>
                </ul>
              </ul>
            </Link>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default TrendingBar