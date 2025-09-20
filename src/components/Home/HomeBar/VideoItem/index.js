import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import {CgPlayListAdd} from 'react-icons/cg'
import Header from '../../../Header'
import SideBar from '../../../SideBar'
import ThemeContext from '../../../../context/ThemeContext'
import './index.css'

const constandApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItem extends Component {
  state = {
    videoItem: {},
    apiStatus: constandApiStatus.initial,
  }

  componentDidMount() {
    this.getVideoData()
  }

  getVideoData = async () => {
    this.setState({
      apiStatus: constandApiStatus.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const videoApi = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(videoApi, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedVideoItem = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }
      this.setState({
        videoItem: fetchedVideoItem,
        apiStatus: constandApiStatus.success,
      })
    } else {
      this.setState({
        apiStatus: constandApiStatus.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getVideoData()
  }

  videoPlayer = () => {
    const {videoItem} = this.state
    return (
      <div className="video-container">
        <div className="responsive-container">
          <ReactPlayer url={videoItem.videoUrl} />
        </div>
      </div>
    )
  }

  renderVideoItem = () => {
    const {videoItem} = this.state

    let postedAt = formatDistanceToNow(new Date(videoItem.publishedAt))
    const postedAtList = postedAt.split(' ')

    if (postedAtList.length === 3) {
      postedAtList.shift()
      postedAt = postedAtList.join(' ')
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {
            isDark,
            updateSave,
            savedVideoList,
            updateLiked,
            likedVideoList,
            updateDisliked,
            dislikedVideoList,
          } = value

          const present = savedVideoList.find(each => each.id === videoItem.id)
          const saveIsActive =
            present !== undefined ? 'liked-button' : 'not-active-button'
          const saveText = present !== undefined ? 'Saved' : 'Save'

          const presentLiked = likedVideoList.find(
            each => each.id === videoItem.id,
          )
          const LikedIsActive =
            presentLiked !== undefined ? 'liked-button' : 'not-active-button'

          const presentDisliked = dislikedVideoList.find(
            each => each.id === videoItem.id,
          )
          const DislikedIsActive =
            presentDisliked !== undefined ? 'liked-button' : 'not-active-button'

          const FontColor = isDark ? 'dark-font-button' : 'light-font-button'
          const otherFontColor = isDark
            ? 'other-saved-light-font'
            : 'other-saved-dark-font'
          const hrLineColor = isDark ? 'hr-dark-mode' : 'hr-light-mode'
          return (
            <ul className="video-items-container">
              {this.videoPlayer()}
              <p className="item-title">{videoItem.title}</p>
              <div className="sub-container">
                <li className="publish-and-view-container">
                  <p className={`item-view ${otherFontColor}`}>
                    {videoItem.viewCount} views
                  </p>
                  <p className={`item-dot ${otherFontColor}`}>.</p>
                  <p className={`item-published-date ${otherFontColor}`}>
                    {postedAt} ago
                  </p>
                </li>
                <div className="like-dislike-and-save-button-container">
                  <button
                    className={`item-buttons ${LikedIsActive}`}
                    type="button"
                    onClick={() => updateLiked(videoItem)}
                  >
                    <BiLike className="item-button-logo" />
                    Like
                  </button>

                  <button
                    className={`item-buttons ${DislikedIsActive}`}
                    type="button"
                    onClick={() => updateDisliked(videoItem)}
                  >
                    <BiDislike className="item-button-logo" />
                    Dislike
                  </button>

                  <button
                    className={`item-buttons ${FontColor} ${saveIsActive}`}
                    type="button"
                    onClick={() => updateSave(videoItem)}
                  >
                    <CgPlayListAdd />
                    {saveText}
                  </button>
                </div>
              </div>
              <hr className={`hrline ${hrLineColor}`} />
              <div className="channel-container">
                <img
                  className="item-profile-image"
                  src={videoItem.profileImageUrl}
                  alt="channel logo"
                />
                <ul className="channel-details-container">
                  <p className="channel-name">{videoItem.name}</p>
                  <p className={`subscriber-count ${otherFontColor}`}>
                    {videoItem.subscriberCount} subscribers
                  </p>
                </ul>
              </div>
              <p className="description">{videoItem.description}</p>
            </ul>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const headfontColor = isDark
          ? 'failure-head-dark-font'
          : 'failure-head-light-font'
        const subfontColor = isDark
          ? 'failure-sub-dark-font'
          : 'failure-sub-light-font'
        const failureImage = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div className="failure-container">
            <img className="failure-image" src={failureImage} alt="not found" />
            <h1 className={`failure-head ${headfontColor}`}>
              Oops! Something Went Wrong
            </h1>
            <p className={`failure-sub-head ${subfontColor}`}>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button
              className="retry-button"
              type="button"
              onClick={this.onClickRetry}
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderVideoItemApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constandApiStatus.success:
        return this.renderVideoItem()
      case constandApiStatus.failure:
        return this.renderFailureView()
      case constandApiStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const themeBackground = isDark
            ? 'home-dark-background'
            : 'home-light-background'
          const FontColor = isDark ? 'dark-font-button' : 'light-font-button'
          return (
            <>
              <Header />
              <div className="app-container">
                <SideBar />
                <div
                  className={`home-container ${themeBackground} ${FontColor}`}
                >
                  {this.renderVideoItemApiStatus()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(VideoItem)
