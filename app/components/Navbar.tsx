'use client'
import React from 'react';
import PathButton from './PathButton';
import { LoginButton } from './Login';
import Image from 'next/image';
import logo from '../assets/Logo1.png'
import { useRouter } from 'next/navigation';

type Props = {
  path: string;
  title: string;
  className: string;
}

export default function Navbar({
  path,
  title,
  className
}: Props) {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <nav className="navbar --padding-left8px">
      <Image className='logo' onClick={handleLogoClick} height={30} width={30} src={logo} alt='Logo'/>
      <div>
        <PathButton
          path={path}
          title={title}
          className={className}
        />
        <LoginButton />
      </div>
    </nav>
  );
}
