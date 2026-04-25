import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/index.jsx'
import Home from './components/Home/index.jsx'
import CartPage from './components/Cart/index.jsx'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="*"
            element={
              <div className="py-24 text-center">
                <p className="text-xl font-semibold text-slate-700">Page not found</p>
                <p className="mt-3 text-slate-500">Please use the navigation above to continue.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
