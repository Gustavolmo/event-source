'use client';
import { createNewUserIfFirstLogin, getUserPreferences } from '@/app-library/DbControls';
import { User } from '@/app-types/types';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React from 'react';

export default function InvitationList({ guest }: { guest: User['email'] }) {
  const [dbData] = useDbQuery(getUserPreferences, guest);

  if (dbData) {
    return (
      <p>
        {dbData[0].name? dbData[0].name : guest} - DR: {dbData[0].dietaryRestrictions} | AN:{' '}
        {dbData[0].accessibilityNeeds}
      </p>
    );
  } 

  if (!dbData) {
    return <p>{guest} - no data available</p>
  }
}
