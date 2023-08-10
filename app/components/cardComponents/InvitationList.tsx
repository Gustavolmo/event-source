'use client';
import {
  getUserPreferences,
} from '@/app-library/DbControls';
import { User } from '@/app-types/types';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React from 'react';
import LoadingUi from '../LoadingUi';

type Props = {
  guest: User['email'];
  details: boolean;
};

export default function InvitationList({ guest, details }: Props) {
  const { dbData, loading } = useDbQuery(getUserPreferences, guest);

  if (loading) {
    return <LoadingUi />;
  }

  if (dbData) {
    return (
      <p>
        {dbData[0].name}{' '}
        {details && (
          <span>
            - DR: {dbData[0].dietaryRestrictions} AN:{' '}
            {dbData[0].accessibilityNeeds}
          </span>
        )}
      </p>
    );
  }

  if (!dbData) {
    return <p>{guest} - no data available</p>;
  }
}
