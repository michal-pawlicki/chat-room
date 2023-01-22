import React, { useState } from 'react';

export const UsersContext = React.createContext<{
  users: { email: string; id: string }[];
  loading: boolean;
}>({ users: [], loading: false });

function UsersProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

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
