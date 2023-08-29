'use client';
import React, { useState } from 'react';
import UpdatePreferencesForm from '../formComponents/UpdatePreferencesForm';
import { signOut, useSession } from 'next-auth/react';
import { deleteUser } from '@/app-library/DbControls/DbControls';
import Greeting from './Greeting';
import DeleteButton from '../buttonComponents/DeleteButton';
import ConfirmDeletionDialogue from '../dialogueComponents/ConfirmDeletionDialogue';

export default function MyInfo() {
  const { data: session, status } = useSession();
  const [openDialogue, setOpenDialogue] = useState(false);

  const handleOpenDialogue = () => {
    setOpenDialogue(true);
  };

  const handleCloseDialogue = () => {
    setOpenDialogue(false);
  };

  const handleDeleteUser = () => {
    deleteUser(session?.user?.email);
    signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <ConfirmDeletionDialogue
        handleClose={handleCloseDialogue}
        handleDeleteAsset={handleDeleteUser}
        open={openDialogue}
      />
      <Greeting />
      <section className="my-info-card">
        <UpdatePreferencesForm doesRedirect={false} />
          <DeleteButton
            handleDelete={handleOpenDialogue}
            mainText="Delete Account"
            toRight={false}
          />
      </section>
    </>
  );
}
