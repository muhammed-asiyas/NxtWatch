import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Trend from './components/Trend'
import SavedVideos from './components/SavedVideos'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'
import ThemeContext from './context/ThemeContext'
import VideoItem from './components/Home/HomeBar/VideoItem'

import './App.css'

const activeMenuConstants = {
  initial: 'INITIAL',
  home: 'HOME',
  trending: 'TRENDING',
  gaming: 'GAMING',
  savedVideos: 'SAVED_VIDEOS',
}

class App extends Component {
  state = {
    isDark: false,
    activeSideBarId: activeMenuConstants.home,
    savedVideoList: [],
    likedVideoList: [],
    dislikedVideoList: [],
  }

  onChangeTheme = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  onChangeActiveSideBarId = activeSideBarId => {
    this.setState({
      activeSideBarId,
    })
  }

  addSaveVideo = videoDetails => {
    this.setState(prev => ({
      savedVideoList: [...prev.savedVideoList, videoDetails],
    }))
  }

  removeCartItem = videoDetails => {
    const {savedVideoList} = this.state
    const updatedList = savedVideoList.filter(
      each => each.id !== videoDetails.id,
    )
    this.setState({savedVideoList: updatedList})
  }

  updateSave = videoDetails => {
    const {savedVideoList} = this.state
    const isSaved = savedVideoList.some(each => each.id === videoDetails.id)
    if (isSaved) {
      this.removeCartItem(videoDetails)
    } else {
      this.addSaveVideo(videoDetails)
    }
  }

  updateLiked = videoDetails => {
    const {likedVideoList} = this.state
    const isLiked = likedVideoList.some(each => each.id === videoDetails.id)
    if (isLiked) {
      this.deleteLikedVideo(videoDetails)
    } else {
      this.deleteDislikedVideo(videoDetails)
      this.addLikedVideo(videoDetails)
    }
  }

  addLikedVideo = videoDetails => {
    this.setState(prev => ({
      likedVideoList: [...prev.likedVideoList, videoDetails],
    }))
  }

  deleteLikedVideo = videoDetails => {
    const {likedVideoList} = this.state
    const updatedList = likedVideoList.filter(
      each => each.id !== videoDetails.id,
    )
    this.setState({likedVideoList: updatedList})
  }

  updateLiked = videoDetails => {
    const {likedVideoList} = this.state
    const isLiked = likedVideoList.some(each => each.id === videoDetails.id)
    if (isLiked) {
      this.deleteLikedVideo(videoDetails)
    } else {
      this.deleteDislikedVideo(videoDetails)
      this.addLikedVideo(videoDetails)
    }
  }

  addDislikedVideo = videoDetails => {
    this.setState(prev => ({
      dislikedVideoList: [...prev.dislikedVideoList, videoDetails],
    }))
  }

  deleteDislikedVideo = videoDetails => {
    const {dislikedVideoList} = this.state
    const updatedList = dislikedVideoList.filter(
      each => each.id !== videoDetails.id,
    )
    this.setState({dislikedVideoList: updatedList})
  }

  updateDisliked = videoDetails => {
    const {dislikedVideoList} = this.state
    const isDisliked = dislikedVideoList.some(
      each => each.id === videoDetails.id,
    )
    if (isDisliked) {
      this.deleteDislikedVideo(videoDetails)
    } else {
      this.deleteLikedVideo(videoDetails)
      this.addDislikedVideo(videoDetails)
    }
  }

  render() {
    const {
      isDark,
      activeSideBarId,
      savedVideoList,
      likedVideoList,
      dislikedVideoList,
    } = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDark,
          activeSideBarId,
          toggleTheme: this.onChangeTheme,
          updateActiveSideBar: this.onChangeActiveSideBarId,
          savedVideoList,
          addSaveVideo: this.addSaveVideo,
          removeCartItem: this.removeCartItem,
          updateSave: this.updateSave,
          likedVideoList,
          addLikedVideo: this.addLikedVideo,
          deleteLikedVideo: this.deleteLikedVideo,
          updateLiked: this.updateLiked,
          dislikedVideoList,
          addDislikedVideo: this.addDislikedVideo,
          deleteDislikedVideo: this.deleteDislikedVideo,
          updateDisliked: this.updateDisliked,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trend} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/videos/:id" component={VideoItem} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
