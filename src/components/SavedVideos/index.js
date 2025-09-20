import {withRouter} from 'react-router-dom'
import {RiPlayListAddLine} from 'react-icons/ri'
import Header from '../Header'
import SideBar from '../SideBar'
import ThemeContext from '../../context/ThemeContext'
import SavedVideoItem from './SavedVideoItem'
import './index.css'

const renderNoSavedVideoView = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value
      const fontcolor = isDark ? 'light-fontcolor' : 'dark-fontcolor'
      return (
        <div className="saved-video-container">
          <img
            className="no-saved-video-image"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <h1 className={`no-saved-head ${fontcolor}`}>
            No saved videos found
          </h1>
          <p className={`no-saved-sub-head ${fontcolor}`}>
            You can save your videos while watching them
          </p>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

const renderSaveVideo = () => (
  <ThemeContext.Consumer>
    {value => {
      const {savedVideoList} = value
      return (
        <ul className="saved-video-items-order-list">
          {savedVideoList.map(eachItem => (
            <SavedVideoItem key={eachItem.id} savedList={eachItem} />
          ))}
        </ul>
      )
    }}
  </ThemeContext.Consumer>
)

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, savedVideoList} = value
      const isNoSavedVideo = savedVideoList.length === 0
      const themeBackground = isDark
        ? 'home-dark-background'
        : 'home-light-background'
      const fontcolor = isDark ? 'light-fontcolor' : 'dark-fontcolor'
      const savedVideoBackground = isDark
        ? 'saved-video-banner-dark-background'
        : 'saved-video-banner-light-background'
      const iconBackground = isDark
        ? 'icon-dark-background'
        : 'icon-light-background'
      return (
        <>
          <Header />
          <div className={`app-container ${themeBackground}`}>
            <SideBar />
            <div className={`home-container ${themeBackground}`}>
              <div
                className={`saved-head-box ${fontcolor} ${savedVideoBackground}`}
              >
                <p className={`saved-icon-container ${iconBackground}`}>
                  <RiPlayListAddLine className="saved-icon" />
                </p>
                <h1 className="saved-video-banner-head">Saved Videos</h1>
              </div>
              {isNoSavedVideo ? renderNoSavedVideoView() : renderSaveVideo()}
            </div>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(SavedVideos)
