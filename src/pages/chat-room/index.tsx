import useUsers from '@/hooks/useUsers';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

function ChatRoom() {
  const { users, loading } = useUsers();

  // useEffect(() => {
  //   let ws: WebSocket;
  //   //TODO: check if user is logged in
  //   if (true) {
  //     //TODO: connect to websocket
  //     ws = new WebSocket('ws://localhost:8080');
  //   }

  //   return () => {};
  // }, []);

  if (loading) {
    return (
      <div className='flex h-screen w-screen flex-col justify-center bg-slate-800'>
        Loading ...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Welcome to chat-room</title>
      </Head>
      <div className='flex h-screen w-screen flex-col justify-center bg-slate-800'>
        <div className='mx-auto w-full max-w-xs   divide-y rounded-lg border p-1 text-slate-50'>
          {users.map((user) => (
            <Link href={'/chat-room/' + encodeURIComponent(user.id)}>
              <div
                className='rounded-md px-4 py-2 text-center transition hover:bg-slate-700'
                key={user.id}
              >
                {user.email}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default ChatRoom;
