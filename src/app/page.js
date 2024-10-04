'use client'; // This directive allows using hooks like useRouter

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import cookie from 'cookie';
import { auth } from './firebase'; // Ensure you import your Firebase auth
import Details from "./components/Home/Details"
const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    
    if (!cookies.auth) {
      router.push('/Login');
    }
  }, [router]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      document.cookie = cookie.serialize('auth', '', { maxAge: -1, path: '/' });
      router.push('/Login'); // Redirect to login after logout
    }).catch((error) => {
      console.error('Error during logout:', error);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4 pt-5">Welcome to the NITP Intranet !</h1>
      <p className="text-lg text-gray-700 mb-8">Your gateway to resources and information.</p>
      <div className="flex space-x-4">
        {/* <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300" 
          onClick={() => alert('Explore more!')}
        >
         
        </button> */}
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <Details/>
    </div>
  );
};

export default Home;
