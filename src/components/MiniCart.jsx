import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart.jsx'

const MiniCart = ({ open }) => {
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()

  if (!open) {
    return null
  }

  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-[22rem] rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-base font-semibold text-slate-900">Mini cart</p>
          <p className="text-sm text-slate-500">{cartCount} item{cartCount === 1 ? '' : 's'}</p>
        </div>
        {cartItems.length > 0 ? (
          <button
            onClick={clearCart}
            className="text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            Clear
          </button>
        ) : null}
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-start gap-3">
                <img src={item.image} alt={item.title} className="h-14 w-14 rounded-2xl object-contain" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">Qty {item.quantity}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="font-medium text-slate-500 hover:text-slate-900"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 rounded-3xl bg-slate-50 p-4">
        <div className="flex items-center justify-between text-sm text-slate-700">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900">${cartTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        <Link
          to="/cart"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          View Cart
        </Link>
        <button
          type="button"
          disabled={cartItems.length === 0}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 disabled:pointer-events-none disabled:opacity-50"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default MiniCart
