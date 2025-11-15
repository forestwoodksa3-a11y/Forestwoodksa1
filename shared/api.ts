import { User } from './types';

/**
 * Mock login function.
 * Simulates a network request with a 1-second delay.
 * It will successfully "log in" any user.
 * To test the error state, use 'fail' as the password.
 * @param username - The username.
 * @param password - The password.
 * @returns A promise that resolves with user data or rejects with an error.
 */
export const login = (username: string, password?: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === 'fail') {
        reject(new Error('Invalid credentials'));
      } else {
        resolve({
          id: '1',
          username: username,
          role: username.toLowerCase() === 'admin' ? 'Admin' : 'Moderator',
        });
      }
    }, 1000);
  });
};
