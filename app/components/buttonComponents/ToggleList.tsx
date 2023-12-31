import React from 'react';
import AddGuestToList from './AddGuestToList';
import InvitationList from '../cardComponents/InvitationList';
import { EventData } from '@/app-types/types';

type Props = {
  handleListToggle: (seeList: boolean, setSeeList: Function) => void;
  seeList: boolean;
  setSeeList: Function;
  hasAddGuest: boolean;
  hasDetails: boolean;
  funcUpdateClick: Function;
  event: EventData;
  listChoice: string[];
  listName: string;
  buttonTitle: string;
};

export default function ToggleList({
  handleListToggle,
  seeList,
  setSeeList,
  hasAddGuest,
  hasDetails,
  funcUpdateClick,
  event,
  listChoice,
  listName,
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
          <b className="--red-highlight-text">{listChoice.length}</b>
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
        <article className="list__names">
          {listChoice.map((guest, index) => {
            return (
              <InvitationList
                guest={guest}
                details={hasDetails}
                event={event}
                listName={listName}
                funcUpdateClick={funcUpdateClick}
                key={`${index}_${event._id}`}
              />
            );
          })}
        </article>
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
