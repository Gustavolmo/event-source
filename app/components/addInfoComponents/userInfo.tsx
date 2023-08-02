'use client';
import { useSession } from 'next-auth/react';
import React from 'react';
import UpdatePreferencesForm from '../formComponents/UpdatePreferencesForm';
import PathButton from '../PathButton';

export default function userInfo() {
  const { data: session } = useSession();

  return (
    <>
      <h1>Hello {session?.user?.name}</h1>
      <p>Let's save your preferences for future reference</p>
      <UpdatePreferencesForm doesRedirect={true} path={'/'} />
      <PathButton
          path={'/account'}
          title={'Prefer not to say'}
          className={'page-button'}
        />
    </>
  );
}
