import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <section className="footer__left">
        <a className="home__about" href="https://www.linkedin.com/in/gustavo-l-m-de-oliveira-037243108/">
          Linked In
        </a>
        <br />

        <a className="home__about" href="https://github.com/Gustavolmo">
          GitHub
        </a>
        <br />

        <a className="home__about" href="https://github.com/Gustavolmo">
          Repo
        </a>
        <br />
      </section>
      <section className="footer__right">
        <p className="home__about">Developed by lmo.gustavo@gmail.com</p>
      </section>
    </footer>
  );
}
