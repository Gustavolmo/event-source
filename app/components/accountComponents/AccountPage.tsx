'use client';
import React, { useState } from 'react';
import CreateEvent from './CreateEvent';
import ManageEvent from './ManageEvent';
import MyInvitation from './MyInvitation';
import MyInfo from './MyInfo';
import { useSession } from 'next-auth/react';
import LoadingUi from '../loadingComponents/LoadingUi';
import DashboardButton from '../buttonComponents/dashboardButton';

const profile = 'Profile';
const create = 'Create';
const sent = 'Sent';
const inbox = 'Inbox';

const definedSelectionOnMount = () => {
  return typeof window !== 'undefined'
    ? localStorage.getItem('lastSelection')
      ? localStorage.getItem('lastSelection')
      : create
    : create;
};

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [selection, setSelection] = useState<string | null>(
    definedSelectionOnMount()
  );

  const selectionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelection(e.currentTarget.name);
    localStorage.setItem('lastSelection', e.currentTarget.name);
  };

  const redirectToSent = () => {
    setSelection(sent);
  };

  if (status !== 'authenticated') {
    return (
      <div className="Loading-ui">
        <LoadingUi />
      </div>
    );
  }


    // const handleCreateGoogleEvent = () => {
    //   console.log(session.accessToken) // accessToken!
    // };


  return (
    <>

      <header className="account-buttons">

        <DashboardButton
          selectionHandler={selectionHandler}
          selection={selection}
          nameValue={profile}
        />

        <DashboardButton
          selectionHandler={selectionHandler}
          selection={selection}
          nameValue={create}
        />

        <DashboardButton
          selectionHandler={selectionHandler}
          selection={selection}
          nameValue={sent}
        />

        <DashboardButton
          selectionHandler={selectionHandler}
          selection={selection}
          nameValue={inbox}
        />
      </header>

      <section className="account-components">
        {selection === profile && <MyInfo />}
        {selection === create && (
          <CreateEvent redirectToSent={redirectToSent} />
        )}
        {selection === sent && <ManageEvent />}
        {selection === inbox && <MyInvitation />}
      </section>
    </>
  );
}
