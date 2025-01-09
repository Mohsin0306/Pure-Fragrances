import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SidebarProvider } from './context/SidebarContext';
import SellerDashboard from './pages/sellerDashboard';
import Header from './components/layout/Header';
import Banner from './components/seller-dashboard/Banner';
import SearchBar from './components/seller-dashboard/SearchBar';
import Products from './components/seller-dashboard/Products';
import Categories from './components/seller-dashboard/Categories';
import ProductDetail from './components/seller-dashboard/ProductDetail';
import CartPage from './components/seller-dashboard/CartPage';
import CategoryProducts from './components/seller-dashboard/CategoryProducts';
import Alerts from './components/seller-dashboard/Alerts';
import NotificationDetail from './components/seller-dashboard/NotificationDetail';
import Profile from './components/seller-dashboard/Profile';
import Settings from './components/seller-dashboard/Settings';
import Referrals from './components/seller-dashboard/Referrals';
import Chat from './components/seller-dashboard/chat/Chat';
import Orders from './components/seller-dashboard/Orders';
import Notifications from './components/seller-dashboard/Notifications';
import Wishlist from './components/seller-dashboard/Wishlist';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  // State for all major components
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Fetch cart data
  const fetchCartData = useCallback(async () => {
    if (cartItems.length === 0) {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=3');
        const data = await response.json();
        setCartItems(data.map(item => ({ ...item, quantity: 1 })));
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setCartLoading(false);
      }
    }
  }, [cartItems.length]);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    if (products.length === 0) {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setProductsLoading(false);
      }
    }
  }, [products.length]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    if (categories.length === 0) {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    }
  }, [categories.length]);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (notifications.length === 0) {
      try {
        // Simulated notifications data
        const mockNotifications = [
          { id: 1, title: 'New Order', message: 'You have a new order!', type: 'success' },
          { id: 2, title: 'Payment Received', message: 'Payment confirmed', type: 'info' },
          // Add more mock notifications as needed
        ];
        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setNotificationsLoading(false);
      }
    }
  }, [notifications.length]);

  // Props objects for components
  const cartProps = {
    cartItems,
    setCartItems,
    cartLoading,
    fetchCartData
  };

  const productProps = {
    products,
    setProducts,
    productsLoading,
    fetchProducts
  };

  const categoryProps = {
    categories,
    setCategories,
    categoriesLoading,
    fetchCategories
  };

  const notificationProps = {
    notifications,
    setNotifications,
    notificationsLoading,
    fetchNotifications
  };

  return (
    <ThemeProvider>
      <SidebarProvider>
        <Router>
          <div className="min-h-screen">
            <Header className="fixed top-0 w-full z-50" />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/*" element={<SellerDashboard />}>
                <Route index element={
                  <>
                    <Banner />
                    <SearchBar />
                    <Products {...productProps} />
                  </>
                } />
                <Route path="products" element={<Products {...productProps} />} />
                <Route path="products/:productId" element={<ProductDetail {...productProps} />} />
                <Route path="categories" element={<Categories {...categoryProps} />} />
                <Route path="categories/:categoryId" element={<CategoryProducts {...productProps} {...categoryProps} />} />
                <Route path="cart" element={<CartPage {...cartProps} />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
                <Route path="alerts">
                  <Route index element={<Alerts {...notificationProps} />} />
                  <Route path="chat/*" element={<Chat />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="notifications/:id" element={<NotificationDetail {...notificationProps} />} />
                  <Route path="wishlist" element={<Wishlist />} />
                </Route>
              </Route>
              <Route path="referral" element={<Referrals />} />
            </Routes>
          </div>
        </Router>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;