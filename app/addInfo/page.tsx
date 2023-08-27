'use client';
import React, { Suspense } from 'react';
import Greeting from '../components/accountComponents/Greeting';
import UpdatePreferencesForm from '../components/formComponents/UpdatePreferencesForm';
import PathButton from '../components/buttonComponents/PathButton';
import Loading from '../components/loadingComponents/Loading';
import { useSession } from 'next-auth/react';

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
          <p className="--centered-text --self-centered">
            Let&apos;s save your preferences for future reference
          </p>
        </header>
        <section className="my-info-card">
          <UpdatePreferencesForm doesRedirect={true} path={'/'} />
          <PathButton
            path={'/account'}
            title={'This is fine'}
            className={'navbar__button absolute-button-bottom-left'}
          />
        </section>
      </Suspense>
    </section>
  );
}
