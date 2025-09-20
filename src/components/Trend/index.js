import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaBurn} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import ThemeContext from '../../context/ThemeContext'
import TrendingBar from './TrendingBar'
import './index.css'

const constandApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trend extends Component {
  state = {
    trendingArray: [],
    apiStatus: constandApiStatus.initial,
  }

  componentDidMount() {
    this.getTrendingBarApi()
  }

  getTrendingBarApi = async () => {
    this.setState({
      apiStatus: constandApiStatus.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const trendingApiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(trendingApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedTrendingArray = fetchedData.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
      }))
      this.setState({
        trendingArray: updatedTrendingArray,
        apiStatus: constandApiStatus.success,
      })
    } else {
      this.setState({
        apiStatus: constandApiStatus.failure,
      })
    }
  }

  renderTrendBarList = () => {
    const {trendingArray} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const boxBackgroundColor = isDark
            ? 'trend-banner-dark-background'
            : 'trend-banner-light-background'
          const trendHeadfont = isDark ? 'trend-light-font' : 'trend-dark-font'
          const iconBackground = isDark
            ? 'icon-dark-background'
            : 'icon-light-background'
          return (
            <>
              <div className={`trending-head-box ${boxBackgroundColor}`}>
                <p className={`faburn-container ${iconBackground}`}>
                  <FaBurn className="faburn" />
                </p>
                <h1 className={`trending-head ${trendHeadfont}`}>Trending</h1>
              </div>
              <ul className="gaming-list-container">
                {trendingArray.map(eachItem => (
                  <TrendingBar key={eachItem.id} trendVideos={eachItem} />
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

  renderTrendBar = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constandApiStatus.success:
        return this.renderTrendBarList()
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
                  {this.renderTrendBar()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default withRouter(Trend)
