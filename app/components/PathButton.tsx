'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function PathButton(info: {
  path: string;
  title: string
}) {
  const { data: session } = useSession();

  if (session) {
    return (
      <Link className="react-link" href={info.path}>
        <button className="navbar__button">{info.title}</button>
      </Link>
    );
  }
}
