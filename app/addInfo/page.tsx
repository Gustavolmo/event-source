'use client';
import React, { Suspense } from 'react';
import Greeting from '../components/Greeting';
import UpdatePreferencesForm from '../components/formComponents/UpdatePreferencesForm';
import PathButton from '../components/PathButton';
import Loading from '../components/Loading';

export default function UserPreferences() {
  return (
    <section className='main'>
      <Suspense fallback={<Loading />}>
        <header className="add-info__title">
          <Greeting />
          <p>Let's save your preferences for future reference</p>
        </header>
        <section className="event-card">
          <UpdatePreferencesForm doesRedirect={true} path={'/'} />
          <PathButton
            path={'/account'}
            title={'Prefer not to say'}
            className={'navbar__button absolute-button-bottom-left'}
          />
        </section>
      </Suspense>
    </section>
  );
}
