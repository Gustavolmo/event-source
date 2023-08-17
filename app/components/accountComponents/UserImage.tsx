'use client';
import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function UserImage(dimension: {
  width: number;
  height: number;
}) {
  const { data: session } = useSession();

  if (session) {
    return (
      <Image
        className="user-image"
        alt={'user Image'}
        src={String(session?.user?.image)}
        width={dimension.width}
        height={dimension.height}
        priority={true}
      />
    );
  }
}
