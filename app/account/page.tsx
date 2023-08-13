'use server';
import React, { Suspense } from 'react';
import { LoginButton } from '../components/Login';
import UserImage from '../components/UserImage';
import PathButton from '../components/PathButton';
import AccountPage from '../components/accountComponents/AccountPage';
import Greeting from '../components/Greeting';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';

export default async function MyAccount() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar/>
        <main className="main">
          <AccountPage />
        </main>
      </Suspense>
    </>
  );
}
