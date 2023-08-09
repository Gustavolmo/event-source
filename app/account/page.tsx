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
          <LoginButton />
          <PathButton path={'/'} title={'Home'} className={'navbar__button'} />
          <UserImage width={50} height={50} />
        </nav>
        <div className="greeting">
          <Greeting />
        </div>
        <main className="main">
          <AccountPage />
        </main>
      </Suspense>
      <footer className="footer">
        <p>
          Developed by:{' '}
          <a href="https://github.com/Gustavolmo">Gustavo L.M. de Oliveira</a>
        </p>
      </footer>
    </>
  );
}
