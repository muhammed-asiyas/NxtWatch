import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../../../context/ThemeContext'
import './index.css'

const SavedVideoItem = props => {
  const {savedList} = props
  const {
    id,
    title,
    thumbnailUrl,
    name,
    viewCount,
    publishedAt,
    profileImageUrl,
  } = savedList
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
        const otherFontColor = isDark
          ? 'other-saved-light-font'
          : 'other-saved-dark-font'
        return (
          <Link className="saved-item-link" to={`/videos/${id}`}>
            <li className="saved-list-lg">
              <img
                className="saved-video-thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <li className="details-of-video-container">
                <p className={`saved-title ${fontColor}`}>{title}</p>
                <p className={`saved-name ${otherFontColor}`}>{name}</p>
                <li className="saved-view-count-container">
                  <p className={`saved-game-view-count ${otherFontColor}`}>
                    {viewCount} views
                  </p>
                  <p className={`dot ${otherFontColor}`}>.</p>
                  <p className={`saved-game-published-date ${otherFontColor}`}>
                    {postedAt} ago
                  </p>
                </li>
              </li>
            </li>
            <li className="saved-list-sm">
              <img
                className="saved-video-thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <li className="saved-items-description-container-sm">
                <img
                  className="profile-image-url-sm"
                  src={profileImageUrl}
                  alt="profileImage"
                />
                <li className="sm-other-item-container">
                  <p className={`saved-title ${fontColor}`}>{title}</p>
                  <li className="sm-last-items-container">
                    <p className={`saved-name ${otherFontColor}`}>{name}</p>
                    <p className={`dot ${otherFontColor}`}>.</p>
                    <p className={`saved-game-view-count ${otherFontColor}`}>
                      {viewCount} views
                    </p>
                    <p className={`dot ${otherFontColor}`}>.</p>
                    <p
                      className={`saved-game-published-date ${otherFontColor}`}
                    >
                      {postedAt} ago
                    </p>
                  </li>
                </li>
              </li>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SavedVideoItem
