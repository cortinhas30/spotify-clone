import Sidebar from '../components/Sidebar';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">

      <main>
        <Sidebar />
      </main>

      <div></div>
    </div>
  )
}
