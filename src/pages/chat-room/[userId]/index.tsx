'use client';

import { useRouter } from 'next/router';

function DmChat() {
  const { query } = useRouter();

  const { userId } = query;

  return (
    <div className=' h-screen max-h-screen w-screen bg-slate-800 text-white'>
      {userId}
    </div>
  );
}

export default DmChat;
