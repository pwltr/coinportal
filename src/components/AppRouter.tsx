import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { styled } from '@mui/material/styles'
import styled from 'styled-components'

import Start from '~/components/Start'
import Main from '~/components/Main'

// TODO:
import '../App.css'
const Wrapper = styled('div')``

const AppRouter = () => (
  <BrowserRouter>
    <Wrapper className="App">
      <Routes>
        <Route path="/start" element={<Start />} />

        <Route path="/" element={<Main />}></Route>
      </Routes>
    </Wrapper>
  </BrowserRouter>
)

export default AppRouter
