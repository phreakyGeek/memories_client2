import React from 'react'
import { Container, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

const App = () => {
  const theme = createTheme()
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container maxWidth="lg">
          <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home/>}></Route>
            <Route path='/auth' exact element={<Auth/>}></Route>
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App