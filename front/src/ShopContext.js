import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopProvider = (props) => {
  const [allproducts, setAllproducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const navigate = useNavigate();

  const API_URL = "https://krego-market-back.vercel.app/api";

  /* -------------------- LocalStorage Cart -------------------- */

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) return;

    try {
      const parsedCart = JSON.parse(savedCart);
      if (Array.isArray(parsedCart)) {
        setCart(parsedCart);
      } else {
        localStorage.removeItem("cart");
      }
    } catch (err) {
      console.error("Cart parse error:", err);
      localStorage.removeItem("cart");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* -------------------- Helpers -------------------- */

  const getToken = () => localStorage.getItem("token");

  /* -------------------- Products -------------------- */

  const fetchAllProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/product/all`);
      if (res.data?.success) {
        setAllproducts(res.data.products || []);
      } else {
        toast.error("Can't get products");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error getting products");
    }
  }, [API_URL]);

  const getProductById = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/product/${id}`);
      if (res.data?.success) return res.data.product;
      toast.error("Product not found");
      return null;
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error fetching product");
      return null;
    }
  };

  /* -------------------- Cart -------------------- */

  const getCart = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) {
        setCart([]);
        setCartTotal(0);
        setCartCount(0);
        return;
      }

      const res = await axios.post(
        `${API_URL}/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success) {
        setCart(Array.isArray(res.data.cartItems) ? res.data.cartItems : []);
        setCartTotal(res.data.totalAmount ?? 0);
        setCartCount(res.data.itemCount ?? 0);
      } else {
        setCart([]);
        setCartTotal(0);
        setCartCount(0);
      }
    } catch (err) {
      console.error("Get cart error:", err);
      setCart([]);
      setCartTotal(0);
      setCartCount(0);
    }
  }, [API_URL]);

  const addToCart = async (itemId) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("You must be logged in");
        return;
      }

      const res = await axios.post(
        `${API_URL}/cart/add`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success) {
        await getCart();
        toast.success("Product added successfully");
      } else {
        toast.error(res.data?.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Add to cart error");
    }
  };

  const updateCart = async (itemId, quantity) => {
    try {
      const res = await axios.put(
        `${API_URL}/cart/update`,
        { itemId, quantity },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      if (res.data?.success) getCart();
    } catch (err) {
      console.error("Update cart error:", err);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await axios.delete(
        `${API_URL}/cart/remove/${itemId}`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      if (res.data?.success) {
        getCart();
        toast.success("Product removed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Remove failed");
    }
  };

  const clearCart = async () => {
    try {
      const res = await axios.delete(`${API_URL}/cart/clear`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.data?.success) {
        getCart();
        toast.success("Cart cleared");
      }
    } catch (err) {
      console.error(err);
      toast.error("Clear cart failed");
    }
  };

  /* -------------------- Search -------------------- */

  const searchProducts = useCallback(
    (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      const q = query.toLowerCase();

      const filtered = allproducts.filter(
        (product) =>
          (product.name &&
            product.name.toLowerCase().includes(q)) ||
          (product.description &&
            product.description.toLowerCase().includes(q)) ||
          (product.category &&
            product.category.toLowerCase().includes(q))
      );

      setSearchResults(filtered);
    },
    [allproducts]
  );

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearch(false);
  };

  /* -------------------- Effects -------------------- */

  useEffect(() => {
    fetchAllProducts();
    getCart();
  }, [fetchAllProducts, getCart]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        searchProducts(searchQuery.trim());
      } else {
        clearSearch();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, searchProducts]);

  /* -------------------- Context Value -------------------- */

  const value = {
    allproducts,
    setAllproducts,
    cart,
    cartTotal,
    cartCount,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    getCart,
    getProductById,
    API_URL,
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    showSearch,
    setShowSearch,
    searchProducts,
    clearSearch,
    token,
    setToken,
    user,
    setUser,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
