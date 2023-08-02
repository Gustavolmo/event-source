'use server';
import React from 'react';
import { LoginButton } from '../components/Login';
import UserImage from '../components/UserImage';
import PathButton from '../components/PathButton';
import AccountPage from '../components/accountComponents/AccountPage';

export default async function MyAccount() {
  return (
    <>
      <nav className="navbar">
        <LoginButton />
        <PathButton path={'/'} title={'Home'} className={"navbar__button"}/>
        <UserImage width={50} height={50} />
      </nav>
      <main className="main">
        <AccountPage />
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
