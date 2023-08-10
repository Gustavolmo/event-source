'use client';
import { useSession } from 'next-auth/react';
import React from 'react';
import UserImage from './UserImage';

export default function Greeting() {
  const { data: session } = useSession();
  return (
    <div className="greeting">
      <UserImage width={50} height={50} />
      <h2>{session?.user?.name}</h2>
    </div>
  );
}
