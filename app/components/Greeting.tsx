'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function Greeting() {
  const { data: session } = useSession();
  return (
    <>
      <h1>Welcome {session?.user?.name}</h1>
    </>
  );
}
