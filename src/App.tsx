import { useIsFetching } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { HomePage } from './pages/home.page'
import { AboutPage } from './pages/about.page'
import { ProductsList } from './pages/products-list.page'
import { ProductDetail } from './pages/product-detail.page'
import styles from './App.module.css';

function App() {
  const isFetching = useIsFetching();

  return (
    <>
      <Header />
      <div className={styles.container}>
        {isFetching > 0 && (
          <div className={styles.loadingSpinner}>
            Updating data...
          </div>
        )}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
