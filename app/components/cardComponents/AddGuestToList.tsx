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
  };

  return (
    <form onSubmit={handleAddGuestToEvent}>
      <div>
        <TagsInput
          name="invited"
          value={newGuests}
          onChange={setNewGuests}
          placeHolder="guests email"
        />
        <button className='navbar__button' type="submit">Add Guests</button>
      </div>
    </form>
  );
}
