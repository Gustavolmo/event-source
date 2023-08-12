'use client';
import { getUserPreferences } from '@/app-library/DbControls';
import { User } from '@/app-types/types';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React, { useState } from 'react';
import LoadingUi from '../LoadingUi';

type Props = {
  guest: User['email'];
  details: boolean;
};

export default function InvitationList({ guest, details }: Props) {
  const { dbData, loading } = useDbQuery(getUserPreferences, guest);
  const [expand, setExpand] = useState(false);

  const hadnleExpandRestrictions = () => {
    setExpand(!expand);
  };

  if (loading) {
    return <LoadingUi />;
  }

  if (dbData) {
    return (
      <>
        <article className="restriction-alert-wrapper">
          <b>{dbData[0].name}</b>

          {details &&
            (dbData[0].dietaryRestrictions || dbData[0].accessibilityNeeds) && (
              <p
                onClick={hadnleExpandRestrictions}
                className="restriction-alert"
              >
                ! Restrictions
              </p>
            )}
        </article>

        <article
          className={
            expand ? 'guest-restrictions--selected' : 'guest-restrictions'
          }
        >
          {details && (
            <>
              {dbData[0].dietaryRestrictions && (
                <p className="--text12px">
                  {' '}
                  &#127860; {dbData[0].dietaryRestrictions}
                </p>
              )}
              {dbData[0].accessibilityNeeds && (
                <p className="--text12px">
                  {' '}
                  &#127939; {dbData[0].accessibilityNeeds}
                </p>
              )}
            </>
          )}
        </article>
      </>
    );
  }

  if (!dbData) {
    return (
      <div className='--with-margin-n-8px'>
        <b>{guest}</b>
      </div>
    );
  }
}
