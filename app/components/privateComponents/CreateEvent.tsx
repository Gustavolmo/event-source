'use client';
import React, { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

export default function CreateEvent() {
  const [emailList, setEmailList] = useState<string[]>([]);

  return (
    <>
      <form className="create-event-form">
        <label>I am offering:</label>
        <span>
          <input type="checkbox" name="" />
          An Event
        </span>
        <span>
          <input type="checkbox" name="" />
          Transportation
        </span>

        <input type="text" name="" placeholder="Event Title" />
        <input type="text" name="" placeholder="Venue" />
        <input type="text" name="" placeholder="Cost per person" />
        <input type="text" name="" placeholder="RSVP" />
        <input type="text" name="" placeholder="Virtual Attendance Link" />
        <input type="text" name="" placeholder="date" />
        <input type="text" name="" placeholder="time" />
        <input type="text" name="" placeholder="duration" />

        <textarea
          name=""
          cols={30}
          rows={10}
          placeholder="Description"
        ></textarea>

        <TagsInput
          value={emailList}
          onChange={setEmailList}
          name="guest-list"
          placeHolder="guest's email"
        />
        <pre>{JSON.stringify(emailList)}</pre>

        <input type="text" name="" placeholder="Transport mode" />
        <input type="text" name="" placeholder="Cost per person" />
        <input type="text" name="" placeholder="Pickup location" />
        <input type="text" name="" placeholder="Pickup time" />
        <input type="text" name="" placeholder="Return time" />
        <input type="text" name="" placeholder="Trip time" />
        <input type="text" name="" placeholder="Seats Available" />
        <textarea
          name=""
          cols={30}
          rows={10}
          placeholder="Descritpion"
        ></textarea>

        <button className='navbar__button'>Create Event!</button>
      </form>
    </>
  );
}
