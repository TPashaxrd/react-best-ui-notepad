import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Start from './components/Start.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/start' element={<Start/>}/>
      {/* <Route path="*" element={<App/>}/> */}
    </Routes>
  </BrowserRouter>
)