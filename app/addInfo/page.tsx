'use client';
import React, { Suspense } from 'react';
import UserImage from '../components/UserImage';
import Greeting from '../components/Greeting';
import UpdatePreferencesForm from '../components/formComponents/UpdatePreferencesForm';
import PathButton from '../components/PathButton';
import Loading from '../components/Loading';

export default function UserPreferences() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <UserImage width={50} height={50} />
        <div className="greeting">
          <Greeting />
        </div>
        <p>Let's save your preferences for future reference</p>
        <UpdatePreferencesForm doesRedirect={true} path={'/'} />
        <PathButton
          path={'/account'}
          title={'Prefer not to say'}
          className={'page-button'}
        />
      </Suspense>
    </>
  );
}
