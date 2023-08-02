'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function PathButton(info: {
  path: string;
  title: string;
  className: string;
}) {
  const { data: session } = useSession();

  if (session) {
    return (
      <Link className="react-link" href={info.path}>
        <button className={info.className}>{info.title}</button>
      </Link>
    );
  }
}
