import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path="*" element={<App/>}/>
    </Routes>
  </HashRouter>
)