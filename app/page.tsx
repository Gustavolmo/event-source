'use server';
import { useSession } from "next-auth/react";
import { Login } from "./components/Login";
import UserImage from "./components/UserImage";

export default async function Home() {

  return (
    <>
      <nav className="navbar">NAVBAR
        <Login/>
        <UserImage width={50} height={50}/>
      </nav>
      <main className="main">HOME PAGE</main>
      <footer className="footer">FOOTER</footer>
    </>
  );
}
