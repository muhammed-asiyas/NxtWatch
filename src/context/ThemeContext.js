import React from 'react'

const ThemeContext = React.createContext({
  isDark: false,
  toggleTheme: () => {},
  activeSideBarId: 'INITIAL',
  updateActiveSideBar: () => {},
  savedVideoList: [],
  addSaveVideo: () => {},
  removeCartItem: () => {},
  updateSave: () => {},
  likedVideoList: [],
  addLikedVideo: () => {},
  deleteLikedVideo: () => {},
  updateLiked: () => {},
  dislikedVideoList: [],
  addDislikedVideo: () => {},
  deleteDislikedVideo: () => {},
  updateDisliked: () => {},
})

export default ThemeContext
