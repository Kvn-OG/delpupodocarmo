import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LegalPage from './pages/LegalPage.jsx'

const root = document.getElementById('root')

createRoot(root).render(
  <StrictMode>
    <LegalPage kind={root.dataset.page} />
  </StrictMode>,
)
