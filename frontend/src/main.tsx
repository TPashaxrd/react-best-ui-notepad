import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Start from './components/Start.tsx'
import NoPage from './components/NoPage.tsx'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/start' element={<Start/>}/>
      <Route path="*" element={<NoPage/>}/>
    </Routes>
  </HashRouter>
)