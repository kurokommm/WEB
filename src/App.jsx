import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PortfolioHome from './PortfolioHome'

const ScrollDemoPage = lazy(() => import('./app/demo/page'))

function DemoFallback() {
  return <div className="min-h-screen bg-neutral-50" aria-hidden />
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<DemoFallback />}>
        <Routes>
          <Route path="/demo" element={<ScrollDemoPage />} />
          <Route path="*" element={<PortfolioHome />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
