import { addUsersToEvent } from '@/app-library/DbControls';
import { EventData } from '@/app-types/types';
import { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

type Props = {
  eventId: EventData['_id'],
  funcUpdateClick: Function,
}

export default function AddGuestToList(
  {eventId, funcUpdateClick: funcUpdateClick}: Props
) {
  const [newGuests, setNewGuests] = useState<string[]>([]);

  const handleAddGuestToEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    funcUpdateClick()
    addUsersToEvent(newGuests, eventId);
    setNewGuests([])
  };

  return (
    <form onSubmit={handleAddGuestToEvent}>
      <div className='manage__add-guest'>
        <button className='navbar__button absolute-button-top-right' type="submit">Add Guests</button>
        <TagsInput
          name="invited"
          value={newGuests}
          onChange={setNewGuests}
          placeHolder="guests email"
        />
      </div>
    </form>
  );
}
