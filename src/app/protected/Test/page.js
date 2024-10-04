
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import cookie from 'cookie';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    
    if (!cookies.auth) {
      router.push('/Login');
    }
  }, [router]);

  return (
    <h1>Welcome to the Form!</h1>
  );
};

export default Home;
