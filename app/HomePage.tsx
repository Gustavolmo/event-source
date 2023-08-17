'use client';
import { createNewUserIfFirstLogin } from '@/app-library/DbControls';
import { User } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppDescription from './components/landPageComponents/AppDescription';
import Loading from './components/loadingComponents/Loading';

export default function HomePage() {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);
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
    } else {
      router.push('/account');
    }
  };

  useEffect(() => {
    if (status !== 'authenticated') return;
    handleLogin().catch(console.error);
  }, [status]);

  useEffect(() => {
    if (session === null) setShowLoader(false);
  }, [session]);

  if (!showLoader)
    return (
      <section className="main__public-page">
        <AppDescription />
      </section>
    );

  return <Loading />;
}
