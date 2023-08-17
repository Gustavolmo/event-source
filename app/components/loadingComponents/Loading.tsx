import React from 'react';

export default function Loading() {
  return (
    <section className='loading-suspense'>
      <div className="jumping-dots-loader">
        {' '}
        <span></span> <span></span> <span></span>{' '}
      </div>
      <div className="moving-gradient"></div>
    </section>
  );
}
