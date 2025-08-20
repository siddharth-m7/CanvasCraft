// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

const Signup = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUpWithEmail } = useAuthStore();

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSignup = async (e) => {
    e.preventDefault();
    setLocalLoading(true);
    setError('');
    const { error } = await signUpWithEmail(form.email, form.password, form.firstName, form.lastName);
    if (error) setError(error.error || error.message || 'Signup failed');
    else alert('Account created. Check your email to confirm (if enabled).');
    setLocalLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="text-gray-500 mt-1">Sign up to get started</p>

        {error ? (
          <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleSignup}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">First name</label>
              <input
                name="firstName"
                type="text"
                className="mt-1 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={form.firstName}
                onChange={onChange}
                placeholder="Jane"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last name</label>
              <input
                name="lastName"
                type="text"
                className="mt-1 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={form.lastName}
                onChange={onChange}
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              className="mt-1 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              value={form.email}
              onChange={onChange}
              placeholder="name@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              className="mt-1 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              value={form.password}
              onChange={onChange}
              placeholder="Create a strong password"
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex justify-center items-center rounded bg-indigo-600 text-white py-2.5 hover:bg-indigo-700 disabled:opacity-60"
            disabled={localLoading}
          >
            {localLoading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-700">
          Already have an account?{' '}
          <Link className="text-indigo-600 hover:underline" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
