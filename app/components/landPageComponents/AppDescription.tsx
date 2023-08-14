import React from 'react';
import Image from 'next/image';
import create from '../../assets/Create.png';
import invitation from '../../assets/Invitation.png';
import manage from '../../assets/Manage.png';
import profile from '../../assets/Profile.png';

export default function AppDescription() {
  const height = '500';
  return (
    <>
      <header className="app-description">
        <h1>
          Welcome to <i className="--red-highlight-text">EventSauce</i>
        </h1>
        <p>We are in Beta, google calendar coming soon...</p>
        <h1>Features</h1>

          <li>Keep track of attendance</li>
          <li>Add and manage transportation</li>
          <li>Manage all guest lists in one place</li>
          <li>Let guests tell you their preferences</li>

      </header>
      <section className="app-description__section">
        <div className="promo-image">
          <p className="promo-title">Create custom events</p>
          <Image src={create} alt="create-form" height={height} />
        </div>

        <div className="promo-image">
          <p className="promo-title">Manage your guests</p>
          <Image src={manage} alt="manage-events" height={height} />
        </div>

        <div className="promo-image">
          <p className="promo-title">Answer to invitations</p>
          <Image src={invitation} alt="invitations" height={height} />
        </div>

        <div className="promo-image">
          <p className="promo-title">Save your preferences</p>
          <Image src={profile} alt="user-profile" height={height} />
        </div>

        <div className="--spacer-20px"></div>
      </section>
    </>
  );
}
