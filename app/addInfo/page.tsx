'use client';
import React, { Suspense } from 'react';
import Greeting from '../components/accountComponents/Greeting';
import UpdatePreferencesForm from '../components/formComponents/UpdatePreferencesForm';
import PathButton from '../components/buttonComponents/PathButton';
import Loading from '../components/loadingComponents/Loading';
import { useSession } from 'next-auth/react';
import useDbQuery from '../customHooks/useDbQuery';

export default function UserPreferences() {
  const { data: session, status } = useSession();

  if (status !== 'authenticated') {
    return (
      <div className="Loading-ui">
        <Loading />
      </div>
    );
  }

  return (
    <section className="main">
      <Suspense fallback={<Loading />}>
        <header className="add-info__title">
          <Greeting />
          <h3 className="--centered-text --self-centered">
            Hi! Let&apos;s save your preferences for future reference
          </h3>
        </header>
        <section className="my-info-card">
          <UpdatePreferencesForm doesRedirect={false} />
          <PathButton
            path={'https://calendar.google.com/'}
            title={'Go Back'}
            className={'navbar__button absolute-button-bottom-left'}
          />
          <PathButton
            path={'/account'}
            title={'Create Event?'}
            className={'navbar__button absolute-button-bottom-left--second'}
          />
        </section>
      </Suspense>
    </section>
  );
}
