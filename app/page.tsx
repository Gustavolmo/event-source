'use server';
import { Suspense } from 'react';
import HomePage from './HomePage';
import Loading from './components/loadingComponents/Loading';
import Navbar from './components/accountComponents/Navbar';
import Footer from './components/accountComponents/Footer';

export default async function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar
          path={'/account'}
          title={'Dashboard'}
          className={'action-button'}
        />
        <main className="main-landing-page">
          <HomePage />
        </main>
      </Suspense>
      {/* <Footer /> */}
    </>
  );
}
