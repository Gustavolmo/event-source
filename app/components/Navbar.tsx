'use client'
import React from 'react';
import PathButton from './PathButton';
import { LoginButton } from './Login';
import Image from 'next/image';
import logo from '../assets/Logo1.png'
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <nav className="navbar --padding-left8px">
      <Image onClick={handleLogoClick} height={30} width={30} src={logo} alt='Logo'/>
      <div>
        <PathButton
          path={'/account'}
          title={'My Account'}
          className={'action-button'}
        />
        <LoginButton />
      </div>
    </nav>
  );
}
