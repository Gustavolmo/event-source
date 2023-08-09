'use server';

import { Suspense } from 'react';
import HomePage from './HomePage';
import { LoginButton } from './components/Login';
import PathButton from './components/PathButton';
import UserImage from './components/UserImage';
import Loading from './components/Loading';

export default async function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <nav className="navbar">
          <LoginButton />
          <PathButton
            path={'/account'}
            title={'My Account'}
            className={'navbar__button'}
          />
          <UserImage width={50} height={50} />
        </nav>
        <main className="main">
          <HomePage />
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
