'use client';
import { createNewUserIfFirstLogin } from '@/app-library/private';
import { User } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const { data: session } = useSession();
  const [popupVisibility, setPopupVisibility] = useState(false)

  const handleLogin = async () => {
    const userData: User = {
      name: session?.user?.name,
      email: session?.user?.email,
      image: session?.user?.image,
    }
    await createNewUserIfFirstLogin(userData);
  };

  // const handleAdditionalIfnoCheck = async () => {
  //   const userFromDb: User = await getUserByEmail(session?.user?.email)
  //   if (!userFromDb.hasInfo) {

  //   }
  // }

  useEffect(() => {
    handleLogin();
  }, [session]);
  

  return(
<>
<p>HOME PAGE + DESCRIPTION WITH IMAGES</p>
  {/* <AdditionalUserInfo visibility={popupVisibility}/> */}
</>
  ) 
}
