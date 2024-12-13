import React, { useState } from 'react';
import { MapPin, User, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCartStore } from '../store/cartStore';
import { KFCLogo } from './KFCLogo';
import { Cart } from './cart/Cart';

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const cartTotal = useCartStore((state) => state.getTotal());

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      navigate('/login');
    }
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 text-sm">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-red-600" />
          <span>Allow location access for local store menu and promos</span>
        </div>
        <button className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm">
          Set Location
        </button>
      </div>
      
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <KFCLogo />
          </Link>
          <div className="space-x-6">
            <Link to="/menu" className="font-medium hover:text-red-600 transition-colors">
              Menu
            </Link>
            <Link to="/deals" className="font-medium hover:text-red-600 transition-colors">
              Deals
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={handleAuthClick}
            className="flex items-center gap-2 hover:text-red-600 transition-colors"
          >
            <User size={20} />
            <span>{user ? 'Sign Out' : 'Sign In'}</span>
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2"
          >
            <span>₹{cartTotal}</span>
            <div className="relative">
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </nav>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}