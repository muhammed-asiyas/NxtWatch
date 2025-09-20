import styled from 'styled-components'

export const LoginButton = styled.button`
  color: #ffffff;
  font-family: 'Roboto';
  background-color: #3b82f6;
  font-size: 14px;
  font-weight: bold;
  padding-top: 8px;
  padding-bottom: 8px;
  border: none;
  border-radius: 6px;
  margin-top: 4px;
  cursor: pointer;
`

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin-left: 15%;
  padding-top: 20px;
  background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')};
  @media screen and (max-width: 767px) {
    margin-left: 0%;
    align-items: center;
  }
`

export const PremiumBanner = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px;
  margin-left: 20px;
  margin-top: 20px;
  width: 97%;
  height: 260px;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  @media screen and (max-width: 767px) {
    height: 170px;
    padding: 0px
    width: 95%
    margin-top: 10px;
    margin-left: 0px;
  }
`
