import React from 'react'
import Layout from './layout/Layout'
import Login from './pages/login/Login'
import { RoutesPage } from './routes/RoutesPage'
import "./index.css"


const App: React.FC = () => {
  return (
    <>
      {/* <Layout/> */}
      <RoutesPage/>
      {/* <Login /> */}
    </>
  )
}

export default App
