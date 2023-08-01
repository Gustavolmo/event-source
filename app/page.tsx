'use server';

import HomePage from './HomePage';
import { LoginButton } from './components/Login';
import PathButton from './components/PathButton';
import UserImage from './components/UserImage';

export default async function Home() {
  return (
    <>
      <nav className="navbar">
        <LoginButton />
        <PathButton path={'/account'} title={'My Account'} />
        <UserImage width={50} height={50} />
      </nav>

      <main className="main">
        <HomePage />
      </main>
      
      <footer className="footer">
        <p>
          Developed by:{' '}
          <a href="https://github.com/Gustavolmo">Gustavo L.M. de Oliveira</a>
        </p>
      </footer>
    </>
  );
}
