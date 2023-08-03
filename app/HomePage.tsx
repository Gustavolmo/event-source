'use client';
import { createNewUserIfFirstLogin } from '@/app-library/DbControls';
import { User } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userData: User = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
    dietaryRestrictions: 'n/a',
    accessibilityNeeds: 'n/a',
    additionalRemarks: 'n/a',
  };

  const handleLogin = async () => {
    const isNewUser = await createNewUserIfFirstLogin(userData);
    console.log(isNewUser);
    if (isNewUser) {
      router.push('/addInfo');
    }
  };
  
  useEffect(() => {
    if (status !== 'authenticated') return;

    handleLogin();
  }, [status]);

  return (
    <>
      <p>HOME PAGE + DESCRIPTION WITH IMAGES</p>
      {/* <AdditionalUserInfo visibility={popupVisibility}/> */}
    </>
  );
}
