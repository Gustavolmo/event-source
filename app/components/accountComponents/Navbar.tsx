'use client';
import React from 'react';
import { LoginButton } from './Login';
import Image from 'next/image';
import logo from '../../assets/Logo1.png';
import { useRouter } from 'next/navigation';

type Props = {
  path: string;
  title: string;
  className: string;
};

export default function Navbar({ path, title, className }: Props) {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/account');
  };

  return (
    <nav className="navbar">
      <section>
        <Image
          className="logo"
          onClick={handleLogoClick}
          height={30}
          width={30}
          src={logo}
          alt="Logo"
        />
        <cite className="--red-highlight-text"> EventSauce</cite>
      </section>

      <div>
        <LoginButton />
      </div>
    </nav>
  );
}
