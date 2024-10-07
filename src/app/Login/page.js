'use client'; // Add this line to indicate a client component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if user is already signed in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.email.endsWith('@nitp.ac.in')) {
          // Store user data in local storage
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', user.displayName);
          localStorage.setItem('email', user.email);
          localStorage.setItem('profilePic', user.photoURL);
          router.push('/'); // Redirect after successful login
        } else {
          auth.signOut();
          setErrorMessage('Only NIT Patna Members have access to it.');
          setIsModalOpen(true);
        }
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, [router]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-100vh" style={{ backgroundImage: "url('/background1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-96 mx-auto flex flex-col items-center">
        <img src="https://www.nitp.ac.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.00e5159e.png&w=96&q=75" alt="NIT PATNA" height={70} className="mb-4" />
        <h1 className="text-2xl font-bold text-red-800 mb-6 text-center">Login to NIT Patna Network</h1>
        <button className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 w-full justify-center" onClick={handleLogin}>
          <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
          <span>Login with Google</span>
        </button>
        <p className="mt-5 text-center text-gray-600">Please use your official NITP email account to log in 🔑</p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-center text-red-600">❌ Error</h2>
            <p className="mt-2 text-center text-gray-800">{errorMessage}</p>
            <div className="mt-4 flex justify-center">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
