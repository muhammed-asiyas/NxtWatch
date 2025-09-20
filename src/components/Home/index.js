import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import {
  PremiumBanner,
  HomeContainer,
} from '../styledComponents/styledComponents'
import Header from '../Header'
import SideBar from '../SideBar'
import HomeBar from './HomeBar'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const constandApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    videosArray: [],
    apiStatus: constandApiStatus.initial,
    searchInput: '',
    isCloseBanner: true,
  }

  componentDidMount() {
    this.getHomeBarApi()
  }

  getHomeBarApi = async () => {
    const {searchInput} = this.state
    this.setState({
      apiStatus: constandApiStatus.inProgress,
    })
    const videoApiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
      const updatedVideoArray = fetchedData.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
      }))
      this.setState({
        videosArray: updatedVideoArray,
        searchInput: '',
        apiStatus: constandApiStatus.success,
      })
    } else {
      this.setState({
        apiStatus: constandApiStatus.failure,
      })
    }
  }

  onSearchVideo = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickRetry = () => {
    this.getHomeBarApi()
  }

  deleteBannerContainer = () => {
    this.setState({
      isCloseBanner: false,
    })
  }

  renderEmptyListView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const headfontColor = isDark
          ? 'failure-head-dark-font'
          : 'failure-head-light-font'
        const subfontColor = isDark
          ? 'failure-sub-dark-font'
          : 'failure-sub-light-font'
        return (
          <div className="failure-container">
            <img
              className="failure-image"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <h1 className={`failure-head ${headfontColor}`}>
              No Search results found
            </h1>
            <p className={`failure-sub-head ${subfontColor}`}>
              Try different key words or remove search filter
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

  renderVideoList = () => {
    const {videosArray} = this.state
    const isEmptyList = videosArray.length === 0
    return isEmptyList ? (
      this.renderEmptyListView()
    ) : (
      <ul className="videos-list-container">
        {videosArray.map(eachItem => (
          <HomeBar key={eachItem.id} videos={eachItem} />
        ))}
      </ul>
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

  renderHomeBar = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constandApiStatus.success:
        return this.renderVideoList()
      case constandApiStatus.failure:
        return this.renderFailureView()
      case constandApiStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, isCloseBanner} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const themeBackground = isDark
            ? 'home-dark-background'
            : 'home-light-background'
          const searchInputColor = isDark ? 'color-light' : 'color-dark'
          return (
            <>
              <Header />
              <div className={`app-container ${themeBackground}`}>
                <SideBar />
                <HomeContainer data-testid="home" isDark={isDark}>
                  {isCloseBanner && (
                    <PremiumBanner data-testid="banner">
                      <div className="banner-details-container">
                        <img
                          className="banner-website-logo"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <p className="banner-head">
                          Buy Nxt Watch Premium Prepaid plans with UPI
                        </p>
                        <button className="get-it-now-button" type="button">
                          GET IT NOW
                        </button>
                      </div>
                      <div>
                        <button
                          data-testid="close"
                          className="close-banner"
                          type="button"
                          onClick={this.deleteBannerContainer}
                        >
                          <AiOutlineClose />
                        </button>
                      </div>
                    </PremiumBanner>
                  )}
                  <div className="search-div-container">
                    <input
                      className={`search-input-field ${themeBackground} ${searchInputColor}`}
                      type="search"
                      placeholder="Search"
                      value={searchInput}
                      onChange={this.onSearchVideo}
                    />
                    <button
                      className="search-button"
                      type="button"
                      onClick={this.getHomeBarApi}
                      data-testid="searchButton"
                    >
                      <BsSearch className="search" />
                    </button>
                  </div>
                  {this.renderHomeBar()}
                </HomeContainer>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(Home)
