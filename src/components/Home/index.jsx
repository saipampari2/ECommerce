import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../../context/useCart.jsx'

const SORT_OPTIONS = [
  { value: 'default', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'title-asc', label: 'Title: A–Z' },
  { value: 'title-desc', label: 'Title: Z–A' },
]

const Home = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [sortBy, setSortBy] = useState('default')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart, cartItems } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError('')

      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories'),
        ])

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()

        setProducts(productsData)
        setCategories(categoriesData)
      } catch {
        setError('Unable to fetch products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const toggleCategory = (category) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    )
  }

  const filteredProducts = useMemo(() => {
    let result = products

    if (search.trim()) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (selectedCategories.length) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    return result.slice().sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })
  }, [products, search, selectedCategories, sortBy])

  const getItemQuantity = (productId) => {
    const existing = cartItems.find((item) => item.id === productId)
    return existing ? existing.quantity : 0
  }

  return (
    <div className="space-y-12 py-12">
      <section className="rounded-3xl bg-white p-10 shadow-sm">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Modern marketplace</p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-indigo-950 sm:text-5xl">
              Explore a live product catalog with smart shopping tools.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-indigo-600">
              Browse curated inventory, search and filter by category, sort by price or name, and add items to your cart instantly.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setSelectedCategories([])}
                className="inline-flex items-center justify-center rounded-full bg-indigo-900 px-6 py-3 text-base font-semibold text-white hover:bg-indigo-700"
              >
                Reset filters
              </button>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-medium text-indigo-700">
                {cartItems.length} item{cartItems.length === 1 ? '' : 's'} in cart
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-indigo-50 via-slate-50 to-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Curated storefront</p>
            <p className="mt-3 text-indigo-700">
              Browse trending products from live API inventory with instant search, filter, and sort updates.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-6 rounded-3xl border border-indigo-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Search</p>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
              className="mt-4 w-full rounded-3xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-950 outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Categories</p>
            <div className="mt-4 space-y-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`w-full rounded-3xl border px-4 py-3 text-left text-sm font-medium transition ${
                    selectedCategories.includes(category)
                      ? 'border-indigo-900 bg-indigo-900 text-white'
                      : 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:border-indigo-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Sort by</p>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="mt-4 w-full rounded-3xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-950 outline-none focus:border-indigo-900 focus:ring-2 focus:ring-indigo-200"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="flex flex-col gap-3 rounded-3xl border border-indigo-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-indigo-950">Products</h2>
              <p className="mt-1 text-sm text-indigo-500">
                {loading
                  ? 'Loading products...'
                  : error
                  ? error
                  : `${filteredProducts.length} products matched`}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-indigo-500">
              <span>Search: {search || 'None'}</span>
              <span>Filters: {selectedCategories.length ? selectedCategories.join(', ') : 'All'}</span>
            </div>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-indigo-200 bg-white p-8 text-center text-indigo-700 shadow-sm">
              Loading products from Fake Store API...
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm">
              {error}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-8 text-center text-indigo-700 shadow-sm">
              No products match your search and filters.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <article key={product.id} className="overflow-hidden rounded-3xl border border-indigo-200 bg-white shadow-sm">
                  <div className="aspect-[4/3] bg-indigo-50 p-5">
                    <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-indigo-500">{product.category}</p>
                      <h3 className="text-base font-semibold text-indigo-950">{product.title}</h3>
                      <p className="text-sm text-indigo-600 line-clamp-2">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-lg font-semibold text-indigo-950">${product.price.toFixed(2)}</span>
                      <button
                        type="button"
                        onClick={() =>
                          addToCart({
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            image: product.image,
                          })
                        }
                        className="inline-flex items-center justify-center rounded-full bg-indigo-900 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                      >
                        Add to cart{getItemQuantity(product.id) ? ` (${getItemQuantity(product.id)})` : ''}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home

