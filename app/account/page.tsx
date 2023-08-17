'use server';
import React, { Suspense } from 'react';
import AccountPage from '../components/accountComponents/AccountPage';
import Loading from '../components/loadingComponents/Loading';
import Navbar from '../components/accountComponents/Navbar';

export default async function MyAccount() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar path={'/'} title={'Home'} className={'navbar__button'} />
        <main className="main">
          <AccountPage />
        </main>
      </Suspense>
    </>
  );
}
