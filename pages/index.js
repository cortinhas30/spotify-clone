import { getSession } from 'next-auth/react';
import Center from '../components/Center';
import Sidebar from '../components/Sidebar';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div></div>
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);

  return{
    props: {
      session,
    },
  };
}