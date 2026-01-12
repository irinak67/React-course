import { useIsFetching } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { CartSidebar } from './components/CartSidebar'
import { ToastHost } from './components/ToastHost'
import { HomePage } from './pages/home.page'
import { AboutPage } from './pages/about.page'
import { ProductsList } from './pages/products-list.page'
import { ProductDetail } from './pages/product-detail.page'
import RegisterPage from './pages/register.page';
import styles from './App.module.css';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const isFetching = useIsFetching();

  return (
    <>
      <Navbar />
      <CartSidebar />
      <ToastHost />
      <div className={styles.container}>
        {isFetching > 0 && <LoadingSpinner />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
