import { Link } from 'react-router-dom'
import { useCart } from '../../context/useCart.jsx'

const Cart = () => {
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart()
  const shipping = cartItems.length === 0 ? 0 : cartTotal > 150 ? 0 : 9.99
  const total = cartTotal + shipping

  return (
    <div className="space-y-8 py-12">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Shopping cart</h1>
            <p className="mt-1 text-sm text-slate-500">{cartCount} item{cartCount === 1 ? '' : 's'} in your cart</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={clearCart}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Clear cart
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-slate-900"
            >
              Continue shopping
            </Link>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
            <p className="text-lg font-medium text-slate-700">Your cart is empty.</p>
            <p className="mt-3 text-sm text-slate-500">Add products to your cart to see them here.</p>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {cartItems.map((item) => (
              <article key={item.id} className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[120px_1fr] md:items-center">
                <img src={item.image} alt={item.title} className="h-28 w-full rounded-3xl object-contain md:h-28 md:w-28" />
                <div className="space-y-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-base font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500">${item.price.toFixed(2)} each</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-medium text-slate-500 hover:text-slate-900"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold text-slate-900">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
              <p className="mt-2 text-sm text-slate-500">Review your items before checking out.</p>
            </div>

            <div className="space-y-4 rounded-3xl bg-slate-50 p-6">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Shipping</span>
                <span className="font-semibold text-slate-900">${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-4 text-sm font-semibold text-slate-900">
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                type="button"
                className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default Cart
