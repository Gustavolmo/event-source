'use server';

import { Suspense } from 'react';
import HomePage from './HomePage';
import { LoginButton } from './components/Login';
import PathButton from './components/PathButton';
import Loading from './components/Loading';

export default async function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <nav className="navbar">
          <p>future logo</p>
          {/* logo in here - add div above and space-between */}
          <div>
            <PathButton
              path={'/account'}
              title={'My Account'}
              className={'action-button'}
            />
            <LoginButton />
          </div>
        </nav>
        <main className="main">
          <HomePage />
        </main>
      </Suspense>
      <footer className="footer">
        <p> &#x1F4BB;{' '}</p>
        <a className='home__about' href="https://github.com/Gustavolmo">About</a>
      </footer>
    </>
  );
}
