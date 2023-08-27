'use client';
import { getUserPreferences } from '@/app-library/DbControls';
import { EventData, User } from '@/app-types/types';
import useDbQuery from '@/app/customHooks/useDbQuery';
import React, { useState } from 'react';
import LoadingUi from '../loadingComponents/LoadingUi';
import { removeGuestFromList } from '@/app-library/InvitationControls';

type Props = {
  guest: User['email'];
  details: boolean;
  event: EventData;
  listName: string;
  funcUpdateClick: Function;
};

export default function InvitationList({
  guest,
  details,
  event,
  listName,
  funcUpdateClick,
}: Props) {
  const { dbData, loading } = useDbQuery(getUserPreferences, guest);
  const [expand, setExpand] = useState(false);
  // const [seeDelete, setSeeDelete] = useState(false);

  // const handleRemoveGuest: React.MouseEventHandler<HTMLElement> = () => {
  //   removeGuestFromList(guest, event._id, listName);
  //   funcUpdateClick();
  // };

  // const handleGuestClick = () => {
  //   setSeeDelete(!seeDelete);
  // };

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
          {!details && (
            <div>
              {/* ZZZ ... */}
              <b>{dbData[0].name}</b>
            </div>
          )}

          {details && (
            <div>
              <b>{dbData[0].name}</b>
              {/* {seeDelete && (
                <b
                  className="delete-guest  --pointer-hover"
                  onClick={handleRemoveGuest}
                >
                  X
                </b>
              )} */}
            </div>
          )}
          {details &&
            (dbData[0].dietaryRestrictions || dbData[0].accessibilityNeeds) && (
              <p
                onClick={hadnleExpandRestrictions}
                className="restriction-alert"
              >
                {dbData[0].dietaryRestrictions && <span>&#127860;</span>}
                {dbData[0].accessibilityNeeds && <span>&#127939;</span>}!
                Restrictions
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
      <article className="--with-margin-n-8px">
        <b>{guest}</b>
      </article>
    );
    // return details ? (
    //   <article className="restriction-alert-wrapper">
    //     <div onClick={handleGuestClick} className="--pointer-hover">
    //       <b>
    //         {guest}
    //       </b>
    //       {seeDelete && (
    //         <b
    //           className="delete-guest --pointer-hover"
    //           onClick={handleRemoveGuest}
    //         >
    //           X
    //         </b>
    //       )}
    //     </div>
    //   </article>
    // ) : (
    // );
  }
}
