import React from 'react';
import AddGuestToList from './cardComponents/AddGuestToList';
import InvitationList from './cardComponents/InvitationList';
import { EventData } from '@/app-types/types';

type Props = {
  handleListToggle: (seeList: boolean, setSeeList: Function) => void;
  seeList: boolean;
  setSeeList: Function;
  hasAddGuest: boolean;
  funcUpdateClick: Function;
  event: EventData;
  listChoice: string[];
  buttonTitle: string;
};

export default function ToggleList({
  handleListToggle,
  seeList,
  setSeeList,
  hasAddGuest,
  funcUpdateClick,
  event,
  listChoice,
  buttonTitle,
}: Props) {
  return (
    <section className="guest-list --gray-shading-line">
      <button
        onClick={() => handleListToggle(seeList, setSeeList)}
        className="toggle-button"
      >
        {' '}
        <div>
          {listChoice.length}
          <b>{buttonTitle}</b>{' '}
        </div>{' '}
        {seeList ? (
          <span> &#10687;.&#10687;</span>
        ) : (
          <span> &#10677;.&#10677;</span>
        )}
      </button>
      <div className={seeList ? 'guest-list-inner' : 'guest-list--hidden'}>
        {hasAddGuest && (
          <AddGuestToList
            eventId={event._id}
            funcUpdateClick={funcUpdateClick}
          />
        )}
        {listChoice.map((guest, index) => {
          return (
            <InvitationList
              guest={guest}
              details={true}
              key={`${index}_${event._id}`}
            />
          );
        })}
      </div>
    </section>
  );
}

{
  /* TEMPLATE

<ToggleList
handleListToggle={() => handleListToggle()}
seeList={}
setSeeList={}
hasAddGuest={}
funcUpdateClick={}
event={}
listChoice={}
buttonTitle={}
/>

*/
}
