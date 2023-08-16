'use server';
import React, { Suspense } from 'react';
import AccountPage from '../components/accountComponents/AccountPage';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import Head from 'next/head';

export default async function MyAccount() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <Suspense fallback={<Loading />}>
        <Navbar path={'/'} title={'Home'} className={'navbar__button'} />
        <main className="main">
          <AccountPage />
        </main>
      </Suspense>
    </>
  );
}
