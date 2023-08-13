import React from 'react';

export default function AppDescription() {
  return (
    <>
      <header className="app-description">
        <h1>Welcome to <i className='--red-highlight-text'>EventSauce</i></h1>
        <p>The source of truth for your event planning</p>
      </header>
      <section className='app-description__section'>
        <p>EVENT {'->'} CONTROL {'->'} CALENDAR & EMAIL</p>
      </section>
    </>
  );
}
