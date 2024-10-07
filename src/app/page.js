'use client'; // This directive allows using hooks like useRouter

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from './firebase'; // Ensure you import your Firebase auth
import Details from "./components/Home/Details";

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // If user is null, redirect to login
      if (!user) {
        router.push('/Login');
      } else {
        // Optionally, check user email domain if needed
        if (!user.email.endsWith('@nitp.ac.in')) {
          auth.signOut();
          router.push('/Login');
        }
      }
      setLoading(false); // Set loading to false after the check
    });

    return () => unsubscribe(); // Clean up the listener
  }, [router]);

  // Show loading state while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className='w-11/12 text-center'>
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4 pt-5">Welcome to the NITP Intranet!</h1>
        <p className="text-lg text-gray-700 mb-8">Your gateway to resources and information.</p>
        <div className="flex space-x-4">
          {/* Add buttons or additional content here */}
        </div>
      </div>
      <Details />
    </div>
  );
};

export default Home;
