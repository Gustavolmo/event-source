'use server';
import Head from 'next/head'; // FIX ZOOM ON MOBILE?
import React, { Suspense } from 'react';
import AccountPage from '../components/accountComponents/AccountPage';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';

export default async function MyAccount() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
        </Head>
        <Navbar path={'/'} title={'Home'} className={'navbar__button'} />
        <main className="main">
          <AccountPage />
        </main>
      </Suspense>
    </>
  );
}
