import React, { useContext, useState, useEffect, useRef } from 'react';
import { ShopContext } from '../ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { token, setToken, setUser, API_URL } = useContext(ShopContext);

  const [mode, setMode] = useState('Login');
  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) firstInputRef.current.focus();
  }, [mode]);

  useEffect(() => {
    if (token) navigate('/');
  }, [token, navigate]);

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetFields = () => {
    setFields({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    resetFields();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = mode === 'Sign Up' ? 'Register' : 'Login';
      const payload = mode === 'Sign Up'
        ? { name: fields.name, email: fields.email, password: fields.password }
        : { email: fields.email, password: fields.password };

      if (mode === 'Sign Up' && fields.password !== fields.confirmPassword) {
        toast.error('Passwords do not match.');
        setLoading(false);
        return;
      }

      const { data } = await axios.post(`${API_URL}/user/${endpoint}`, payload);

      if (data?.success) {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
          }
          toast.success(`${mode} successful!`);
          navigate('/');
        } else {
          toast.success('Registration successful! Please login.');
          switchMode('Login');
        }
      } else {
        toast.error(data?.message || `${mode} failed.`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 sm:p-10 transition-all duration-300 hover:shadow-green-100/50"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-900 tracking-tight mb-2">
            {mode === 'Login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-500 text-sm">
            {mode === 'Login' ? 'Please enter your details to sign in' : 'Join our community today'}
          </p>
          <div className="flex justify-center mt-4">
            <div className="h-1 w-16 bg-green-500 rounded-full" />
          </div>
        </div>

        <div className="space-y-5">
          {mode === 'Sign Up' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">Full Name</label>
              <input
                ref={firstInputRef}
                name="name"
                type="text"
                placeholder="John Doe"
                value={fields.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white outline-none transition-all"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">Email Address</label>
            <input
              ref={mode === 'Login' ? firstInputRef : null}
              name="email"
              type="email"
              placeholder="name@company.com"
              value={fields.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={fields.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white outline-none transition-all"
            />
          </div>

          {mode === 'Sign Up' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={fields.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white outline-none transition-all"
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            {mode === 'Login' && (
              <button
                type="button"
                onClick={() => toast.info('Reset feature coming soon!')}
                className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                Forgot password?
              </button>
            )}
            <button
              type="button"
              onClick={() => switchMode(mode === 'Login' ? 'Sign Up' : 'Login')}
              className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors ml-auto"
            >
              {mode === 'Login' ? 'Create an account' : 'Already have an account?'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : mode}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;