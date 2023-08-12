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
      <div>
        <article className='restriction-alert-wrapper'>
          <b>{dbData[0].name}</b>
          {(dbData[0].dietaryRestrictions || dbData[0].accessibilityNeeds) && (
            <b onClick={hadnleExpandRestrictions} className="restriction-alert">
              Restrictions
            </b>
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
      </div>
    );
  }

  if (!dbData) {
    return (
      <>
        <b>{guest}</b>
        {/* <p> - guest has no account</p>; */}
      </>
    );
  }
}
