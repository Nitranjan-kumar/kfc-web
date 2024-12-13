import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Header } from './components/Header';
import { OrderBanner } from './components/OrderBanner';
import { Carousel } from './components/carousel/Carousel';
import { Categories } from './components/Categories';
import { Offers } from './components/Offers';
import { Footer } from './components/footer/Footer';
import { AuthForm } from './components/auth/AuthForm';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderHistory } from './components/orders/OrderHistory';
import { ProductGrid } from './components/products/ProductGrid';

function Home() {
  return (
    <>
      <OrderBanner />
      <main>
        <Carousel />
        <Categories />
        <ProductGrid />
        <Offers />
      </main>
    </>
  );
}

export function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/login" element={<AuthForm />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            } />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;