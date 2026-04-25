import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/useCart.jsx'
import MiniCart from '../MiniCart.jsx'

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const { cartCount } = useCart()
  const headerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setCartOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="border-b border-indigo-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold text-indigo-950">
          ShopEase
        </Link>

        <div className="flex items-center gap-4" ref={headerRef}>
          <nav className="hidden items-center gap-4 md:flex">
            <Link to="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-950">
              Home
            </Link>
            <Link to="/cart" className="text-sm font-medium text-indigo-600 hover:text-indigo-950">
              Cart
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setCartOpen((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-900 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Cart
            <span className="rounded-full bg-indigo-200 px-2 py-0.5 text-xs font-semibold text-indigo-950">{cartCount}</span>
          </button>

          <div className="relative">
            <MiniCart open={cartOpen} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
