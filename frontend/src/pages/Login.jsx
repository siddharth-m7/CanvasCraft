// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState('');
  const { signInWithEmail, signInWithGoogle } = useAuthStore();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // Handle OAuth redirect tokens
  useEffect(() => {
    const access = params.get('access_token');
    const refresh = params.get('refresh_token');
    if (access && refresh) {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      navigate('/', { replace: true });
    }
  }, [params, navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLocalLoading(true);
    setError('');
    const { error } = await signInWithEmail(email, password);
    if (error) {
      setError(error.error || error.message || 'Login failed');
    } else {
      navigate('/', { replace: true });
    }
    setLocalLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLocalLoading(true);
    setError('');
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.error || error.message || 'Google login failed');
      setLocalLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-gray-500 mt-1">Please sign in to your account</p>

        {error ? (
          <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleEmailLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex justify-center items-center rounded bg-indigo-600 text-white py-2.5 hover:bg-indigo-700 disabled:opacity-60"
            disabled={localLoading}
          >
            {localLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full inline-flex justify-center items-center rounded border border-gray-300 bg-white py-2.5 hover:bg-gray-50 disabled:opacity-60"
            disabled={localLoading}
          >
            {localLoading ? 'Redirecting…' : 'Continue with Google'}
          </button>
        </div>

        <div className="mt-6 text-sm text-center text-gray-700">
          Don&apos;t have an account?{' '}
          <Link className="text-indigo-600 hover:underline" to="/signup">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
