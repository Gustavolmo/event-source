'use server';

import { Suspense } from 'react';
import HomePage from './HomePage';
import { LoginButton } from './components/Login';
import PathButton from './components/PathButton';
import Loading from './components/Loading';
import Navbar from './components/Navbar';

export default async function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar/>
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
