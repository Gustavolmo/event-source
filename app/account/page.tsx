'use server';
import React, { Suspense } from 'react';
import { LoginButton } from '../components/Login';
import UserImage from '../components/UserImage';
import PathButton from '../components/PathButton';
import AccountPage from '../components/accountComponents/AccountPage';
import Greeting from '../components/Greeting';
import Loading from '../components/Loading';

export default async function MyAccount() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <nav className="navbar">
          <p>future logo</p>
          {/* logo in here - add div above and space-between */}
          <div>
            <PathButton
              path={'/'}
              title={'Home'}
              className={'navbar__button'}
            />
            <LoginButton />
          </div>
        </nav>
        <main className="main">
          <AccountPage />
        </main>
      </Suspense>
    </>
  );
}
