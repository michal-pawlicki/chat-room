import React, { useEffect, useState } from 'react';

export const UsersContext = React.createContext<{
  users: { email: string; id: string }[];
  loading: boolean;
}>({ users: [], loading: false });

function UsersProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ws: WebSocket;
    //TODO: check if user is logged in
    if (true) {
      //TODO: connect to websocket
      ws = new WebSocket('ws://localhost:8080');
    }

    return () => {};
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users: [
          { email: 'kacper.hemperek@email.com', id: '1' },
          { email: 'michał.pawlicki@email.com', id: '2' },
        ],
        loading,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export default UsersProvider;
