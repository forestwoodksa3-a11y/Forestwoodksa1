
import React, { useState, FormEvent } from 'react';
import { login } from '../../../shared/api';
import { User } from '../../../shared/types';

import BrandLogo from '../../components/icons/BrandLogo';
import UserIcon from '../../components/icons/UserIcon';
import LockIcon from '../../components/icons/LockIcon';
import EyeIcon from '../../components/icons/EyeIcon';
import EyeOffIcon from '../../components/icons/EyeOffIcon';
import SpinnerIcon from '../../components/icons/SpinnerIcon';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const isFormValid = username.trim() !== '' && password.trim() !== '';

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setError(null);
    setLoggedInUser(null);

    try {
      const user = await login(username, password);
      setLoggedInUser(user);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loggedInUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {loggedInUser.username}!</h1>
            <p className="text-gray-600">You are logged in as an {loggedInUser.role}.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="mb-8">
        <BrandLogo />
      </div>
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>
        <form onSubmit={handleLogin} noValidate>
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <UserIcon />
            </span>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Username or Email"
              aria-label="Username or Email"
              required
            />
          </div>

          <div className="relative mb-6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockIcon />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
              aria-label="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-300"
          >
            {isLoading ? <SpinnerIcon /> : 'Log In'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-500 text-sm" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;