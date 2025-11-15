
import React, { useState, FormEvent } from 'react';
import { login } from '../../../shared/api';
import { User } from '../../../shared/types';

import BrandLogo from '../../components/icons/BrandLogo';
import UserIcon from '../../components/icons/UserIcon';
import LockIcon from '../../components/icons/LockIcon';
import EyeIcon from '../../components/icons/EyeIcon';
import EyeOffIcon from '../../components/icons/EyeOffIcon';
import SpinnerIcon from '../../components/icons/SpinnerIcon';
import GoogleIcon from '../../components/icons/GoogleIcon';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
            <div className="mx-auto bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mb-6">
                <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back,</h1>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">{loggedInUser.username}!</h2>
            <p className="text-gray-600 mb-8">You are logged in as a <span className="font-medium text-gray-700">{loggedInUser.role}</span>.</p>
            <button
              onClick={() => setLoggedInUser(null)}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
            >
              Log Out
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-5xl flex rounded-2xl shadow-2xl overflow-hidden m-4 bg-white">
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <div className="flex items-center mb-6">
            <BrandLogo />
            <h1 className="ml-4 text-2xl font-bold text-gray-800">BrandName</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h2>
          <p className="text-gray-600 mb-8">Please enter your details to log in.</p>
          
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
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                placeholder="Username or Email"
                aria-label="Username or Email"
                required
              />
            </div>

            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
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
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 h-12"
            >
              {isLoading ? <SpinnerIcon /> : 'Log In'}
            </button>
             {error && (
              <p className="mt-4 text-center text-red-500 text-sm" role="alert">
                {error}
              </p>
            )}
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
          >
            <GoogleIcon />
            <span>Log in with Google</span>
          </button>
          
          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a>
          </p>
        </div>
        
        {/* Right Side: Image/Gradient */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-12 text-white text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10">
              {/* Decorative background pattern could go here */}
           </div>
           <div className="z-10">
              <h1 className="text-4xl font-bold mb-4">Secure & Seamless Access</h1>
              <p className="text-indigo-200">Unlock your world with a single click. We're committed to protecting your data and privacy.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
