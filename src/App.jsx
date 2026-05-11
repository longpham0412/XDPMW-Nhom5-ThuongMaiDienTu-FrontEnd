import { useEffect, useState } from 'react'
import './App.css'

const API_URL =
  import.meta.env.VITE_API_URL || 'https://ecomn5-backend-production.up.railway.app'

const featuredProducts = [
  {
    id: 1,
    name: 'Ao thun basic',
    category: 'Thoi trang',
    price: '149.000d',
    stock: 'Con hang',
  },
  {
    id: 2,
    name: 'Tai nghe bluetooth',
    category: 'Dien tu',
    price: '399.000d',
    stock: 'Ban chay',
  },
  {
    id: 3,
    name: 'Balo di hoc',
    category: 'Phu kien',
    price: '259.000d',
    stock: 'Con hang',
  },
]

function App() {
  const [apiStatus, setApiStatus] = useState({
    loading: true,
    ok: false,
    message: 'Dang kiem tra backend...',
  })

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${API_URL}/api/health`, { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message || 'Backend tra ve loi')
        }

        const dbMessage = data.database?.connected
          ? 'Database da ket noi'
          : data.database?.message || 'Database chua cau hinh'

        setApiStatus({
          loading: false,
          ok: true,
          message: `Backend online. ${dbMessage}.`,
        })
      })
      .catch((error) => {
        if (error.name === 'AbortError') return

        setApiStatus({
          loading: false,
          ok: false,
          message: error.message || 'Khong ket noi duoc backend',
        })
      })

    return () => controller.abort()
  }, [])

  return (
    <main className="store-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Nhom 5 Ecommerce</p>
          <h1>Quan ly ban hang truc tuyen</h1>
        </div>
        <a className="api-link" href={`${API_URL}/api/health`} target="_blank">
          API Health
        </a>
      </header>

      <section className="status-panel">
        <div className={`status-dot ${apiStatus.ok ? 'online' : 'offline'}`} />
        <div>
          <h2>Ket noi Backend Railway</h2>
          <p>{apiStatus.message}</p>
          <code>{API_URL}</code>
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="metric">
          <span>San pham</span>
          <strong>120+</strong>
        </article>
        <article className="metric">
          <span>Don hang</span>
          <strong>48</strong>
        </article>
        <article className="metric">
          <span>Doanh thu</span>
          <strong>12.5M</strong>
        </article>
      </section>

      <section className="product-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Demo UI</p>
            <h2>San pham noi bat</h2>
          </div>
          <button type="button">Them san pham</button>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-thumb">{product.name.slice(0, 2).toUpperCase()}</div>
              <div>
                <p className="category">{product.category}</p>
                <h3>{product.name}</h3>
                <div className="product-meta">
                  <strong>{product.price}</strong>
                  <span>{product.stock}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
