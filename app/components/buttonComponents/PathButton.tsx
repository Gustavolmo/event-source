'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

type Props = {
  path: string;
  title: string;
  className: string;
}

export default function PathButton({
  path,
  title,
  className
}: Props) {
  const { data: session } = useSession();

  if (session) {
    return (
      <Link className="react-link" href={path}>
        <button className={className}>{title}</button>
      </Link>
    );
  }
}
