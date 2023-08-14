'use client';
import { createNewUserIfFirstLogin } from '@/app-library/DbControls';
import { User } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppDescription from './components/landPageComponents/AppDescription';

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userData: User = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
    dietaryRestrictions: '',
    accessibilityNeeds: '',
    additionalRemarks: '',
  };

  const handleLogin = async () => {
    const isNewUser = await createNewUserIfFirstLogin(userData);
    if (isNewUser) {
      router.push('/addInfo');
    }
  };
  
  useEffect(() => {
    if (status !== 'authenticated') return;

    handleLogin()
      .catch(console.error);
  }, [status]);

  return (
    <section className='main__public-page'>
      <AppDescription/>
    </section>
  );
}
