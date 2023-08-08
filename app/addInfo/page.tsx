'use client';
import React from 'react';
import UserImage from '../components/UserImage';
import Greeting from '../components/Greeting';
import UpdatePreferencesForm from '../components/formComponents/UpdatePreferencesForm';
import PathButton from '../components/PathButton';

export default function UserPreferences() {
  return (
    <>
      <UserImage width={50} height={50} />
      <div className='greeting'>
        <Greeting />
      </div>
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
