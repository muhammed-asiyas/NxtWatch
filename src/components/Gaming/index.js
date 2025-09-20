import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import SideBar from '../SideBar'
import GamingList from './GamingList'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const constandApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    gamingArray: [],
    apiStatus: constandApiStatus.initial,
  }

  componentDidMount() {
    this.getGamingApi()
  }

  getGamingApi = async () => {
    this.setState({
      apiStatus: constandApiStatus.inProgress,
    })
    const videoApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(videoApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedGamingArray = fetchedData.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        gamingArray: updatedGamingArray,
        apiStatus: constandApiStatus.success,
      })
    } else {
      this.setState({
        apiStatus: constandApiStatus.failure,
      })
    }
  }

  renderGamingList = () => {
    const {gamingArray} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const fontcolor = isDark ? 'light-fontcolor' : 'dark-fontcolor'
          const savedVideoBackground = isDark
            ? 'saved-video-banner-dark-background'
            : 'saved-video-banner-light-background'
          const iconBackground = isDark
            ? 'icon-dark-background'
            : 'icon-light-background'
          return (
            <>
              <div
                className={`gaming-head-box ${fontcolor} ${savedVideoBackground}`}
              >
                <p className={`youtube-gaming-container ${iconBackground}`}>
                  <SiYoutubegaming className="faburn" />
                </p>
                <h1 className="gaming-banner-head">Gaming</h1>
              </div>
              <ul className="game-list-container">
                {gamingArray.map(eachItem => (
                  <GamingList key={eachItem.id} gameList={eachItem} />
                ))}
              </ul>
            </>
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
            <img
              className="failure-image"
              src={failureImage}
              alt="failure view"
            />
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

  renderGameBar = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constandApiStatus.success:
        return this.renderGamingList()
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
          return (
            <>
              <Header />
              <div className={`app-container ${themeBackground}`}>
                <SideBar />
                <div className={`home-container ${themeBackground}`}>
                  {this.renderGameBar()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(Gaming)
